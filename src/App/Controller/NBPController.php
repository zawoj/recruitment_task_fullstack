<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

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

  public function getTable(): Response {
       $response = $this->client->request(
        'GET',
        'http://api.nbp.pl/api/exchangerates/tables/a/'
        );

        $content = $response->toArray();

        $supportedCurrencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];

        foreach ($content as $key => $table) {
        $filteredRates = [];
        foreach ($table['rates'] as $rate) {
            if (array_key_exists($rate['code'], $this->currencyConfig)) {
                $config = $this->currencyConfig[$rate['code']];

                $buyRate = $config['buyOffset'] !== null ? $rate['mid'] + $config['buyOffset'] : null;
                $sellRate = $rate['mid'] + $config['sellOffset'];

                $filteredRates[] = [
                    'currency' => $rate['currency'],
                    'code' => $rate['code'],
                    'mid' => $rate['mid'],
                    'buyRate' => $buyRate,
                    'sellRate' => $sellRate
                ];
            }
        }
        $content[$key]['rates'] = $filteredRates;
    }

    return $this->json($content);
    }   




}
