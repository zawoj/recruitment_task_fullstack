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
        $tableType = 'a'; // Typ tabeli, np. 'a', 'b', 'c', itd.
        $startDate = $request->query->get('date');
        $endDate = $request->query->get('endDate');
        $today = (new \DateTime())->format('Y-m-d');

        $url = 'http://api.nbp.pl/api/exchangerates/tables/a/';
        $url .= $startDate && $endDate ? $startDate . '/' . $endDate . '/' : '';

        $response = $this->client->request('GET', $url);
        $content = $response->toArray();

        $todayResponse = null;
        $todayContent = null;

        if ($startDate !== $today || $endDate !== $today) {
            // Pobierz dane dla dnia dzisiejszego
            $todayResponse = $this->client->request('GET', 'http://api.nbp.pl/api/exchangerates/tables/a/');
            $todayContent = $todayResponse->toArray();
        }

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

        return $this->json($content);
    }   




}
