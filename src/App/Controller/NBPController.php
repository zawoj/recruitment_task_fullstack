<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class NBPController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function index(): array
    {
         return $this->render(
            'exchange_rates/app-root.html.twig'
        );
    }

     public function getTable(): Response
        {
        $response = $this->client->request(
            'GET',
            'http://api.nbp.pl/api/exchangerates/tables/a/'
        );

        $content = $response->toArray();

        // Utworzenie i zwrócenie odpowiedzi JSON
        $responseContent = json_encode($content);
        return new Response(
            $responseContent,
            Response::HTTP_OK,
            ['Content-type' => 'application/json']
        );
    }
}
