<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;

class NBPController extends AbstractController
{
    private $client;
    /**
     * Configuration for currency exchange rates.
     * 'buyOffset' and 'sellOffset' adjust the mid-market rates for buy and sell operations.
     * A 'null' buyOffset indicates the currency is not purchased, same for sellOffset 
     */
    private $currencyConfig = [
    'EUR' => ['buyOffset' => -0.05, 'sellOffset' => 0.07],
    'USD' => ['buyOffset' => -0.05, 'sellOffset' => 0.07],
    'CZK' => ['buyOffset' => null, 'sellOffset' => 0.15],
    'IDR' => ['buyOffset' => null, 'sellOffset' => 0.15],
    'BRL' => ['buyOffset' => null, 'sellOffset' => 0.15],
    ];

    public function __construct(HttpClientInterface $client){
        $this->client = $client;
    }

    public function index(): array{
         return $this->render(
            'exchange_rates/app-root.html.twig'
        );
    }

public function getTable(Request $request): Response {
    // Retrieves the date from the query parameter, or uses today's date if not provided.
    $date  = $request->query->get('date');
    $today = (new \DateTime())->format('Y-m-d');

    // If date is not correct type
    if($date && !is_string($date)){
        return $this->json(['error' => 'Invalid date'], 404);
    }

    // if date is in wrong format
    if($date && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)){
        return $this->json(['error' => 'Invalid date format'], 404);
    }

    // Constructs the URL for the NBP API, appending the provided date if available.
    $url = 'http://api.nbp.pl/api/exchangerates/tables/a/';
    $url .= $date ? $date . '/' : '';

    // Sends a GET request to the NBP API.
    $response = $this->client->request('GET', $url);

    // Checks if the response is successful; if not, returns an error.
    if ($response->getStatusCode() !== 200) {
        return $this->json(['error' => 'No data found for the provided date'], 404);
    }

    // Converts the response to a PHP array.
    $content = $response->toArray();

    // Variables to store the response and content for today's rates.
    $todayResponse = null;
    $todayContent = null;

    // Fetches data for the current day if the provided date is different from today.
    if ($date !== $today) {
        $todayResponse = $this->client->request('GET', 'http://api.nbp.pl/api/exchangerates/tables/a/' . $today);

        // Checks if today's data is available and decodes it.
        if ($todayResponse->getStatusCode() === 200) {
            $todayContent = json_decode($todayResponse->getContent(), true);
        } else {
            // Handles the scenario where today's data might not be available.
            $todayResponse = null;
            $todayContent = $todayResponse;
        }
    }

    // Prepares today's rates for comparison with the provided date's rates.
    $todayRates = [];
    if ($todayContent) {
        foreach ($todayContent[0]['rates'] as $rate) {
            if (array_key_exists($rate['code'], $this->currencyConfig)) {
                $config = $this->currencyConfig[$rate['code']];
                $todayRates[$rate['code']] = [
                    'mid' => $rate['mid'],
                    'buy' => $config['buyOffset'] !== null ? $rate['mid'] + $config['buyOffset'] : null,
                    'sell' => $rate['mid'] + $config['sellOffset'],
                ];
            }
        }
    }
    
    // Adjusts rates according to the configuration and adds today's rates.
    foreach ($content as $key => $table) {
        $filteredRates = [];
        foreach ($table['rates'] as $rate) {
            if (array_key_exists($rate['code'], $this->currencyConfig)) {
                $config = $this->currencyConfig[$rate['code']];
                $buyRate = $config['buyOffset'] !== null ? $rate['mid'] + $config['buyOffset'] : null;
                $sellRate = $rate['mid'] + $config['sellOffset'];
                $todayMid = $todayRates[$rate['code']]['mid'] ?? null;
                $todayBuy = $todayRates[$rate['code']]['buy'] ?? null;
                $todaySell = $todayRates[$rate['code']]['sell'] ?? null;

                $filteredRates[] = [
                    'currency' => $rate['currency'],
                    'code' => $rate['code'],
                    'mid' => $rate['mid'],
                    'buyRate' => $buyRate,
                    'sellRate' => $sellRate,
                    'todayMid' => $todayMid,
                    'todaySell' => $todaySell,
                    'todayBuy' => $todayBuy,
                ];
            }
        }
        $content[$key]['rates'] = $filteredRates;
    }

    // Returns the final JSON response.
    return $this->json($content[0]);
}  


    public function getHistory(Request $request): Response {
        // Retrieves the start and end dates, and the currency code from the query parameters.
        $startDate = $request->query->get('startDate');
        $endDate = $request->query->get('endDate');
        $code = $request->query->get('code');

        // Returns an error if the currency code is not provided.
        if(!$code){
            return $this->json(['error' => 'Currency code not provided'], 404);
        }

        if(!$startDate){
            return $this->json(['error' => 'startDate not provided'], 404);
        }

        if(!$endDate){
            return $this->json(['error' => 'endDate not provided'], 404);
        }

        // Check code validation if we have it in currencyConfig
        if(!array_key_exists($code, $this->currencyConfig)){
            return $this->json(['error' => 'Invalid currency code'], 404);
        }
        
         // If date is not correct type
        if($startDate && !is_string($startDate)){
            return $this->json(['error' => 'Invalid start date'], 404);
        }

        if($endDate && !is_string($endDate)){
            return $this->json(['error' => 'Invalid end date'], 404);
        }

        // if date is in wrong format
        if($startDate && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $startDate)){
            return $this->json(['error' => 'Invalid start date format'], 404);
        }

         if($endDate && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $startDate)){
            return $this->json(['error' => 'Invalid end date format'], 404);
        }

        // Checks if the provided start date is later than the end date and returns an error if so.
        if($startDate 
            && $endDate 
            && (new \DateTime($startDate)) > (new \DateTime($endDate)) 
        ){
            return $this->json(['error' => 'Invalid date range'], 404);
        }

        // Constructs the URL for the NBP API request.
        $url = 'http://api.nbp.pl/api/exchangerates/rates/a/' . $code . '/';
        $url .= $startDate && $endDate ? $startDate . '/' . $endDate . '/' : '';

        // Sends a GET request to the NBP API.
        $response = $this->client->request('GET', $url);

        // Checks if the response is successful; if not, returns an error.
        if ($response->getStatusCode() !== 200) {
            return $this->json(['error' => 'No data available'], 404);
        }

        // Converts the response to a PHP array.
        $content = $response->toArray(); 

        // Returns the data in JSON format.
        return $this->json($content);
    }  
 
}
