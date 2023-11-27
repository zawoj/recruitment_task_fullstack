<?php

namespace Integration\NBP;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class NBPTest extends WebTestCase
{

  // test for /api/nbp
    public function testGetTableWithoutDate(): void{
        $client = static::createClient();
        $client->request('GET', '/api/nbp');
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('table', $responseData);
        $this->assertArrayHasKey('no', $responseData);
        $this->assertArrayHasKey('effectiveDate', $responseData);
        $this->assertArrayHasKey('rates', $responseData);
       
    }

    public function testGetTableWithValidDate(): void{
        $client = static::createClient();
        $client->request('GET', '/api/nbp?date=2023-11-27');
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('table', $responseData);
        $this->assertArrayHasKey('no', $responseData);
        $this->assertArrayHasKey('effectiveDate', $responseData);
        $this->assertArrayHasKey('rates', $responseData);

    }

    public function testGetTableWithUnexpectedParameter(): void{
        $client = static::createClient();
        $client->request('GET', '/api/nbp?unexpectedParam=value');
        $this->assertResponseIsSuccessful();
       
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('table', $responseData);
        $this->assertArrayHasKey('no', $responseData);
        $this->assertArrayHasKey('effectiveDate', $responseData);
        $this->assertArrayHasKey('rates', $responseData);

    }

    public function testGetTableWithInvalidDate(): void{
        $client = static::createClient();
        $client->request('GET', '/api/nbp?date=kot w butach');
        $this->assertResponseStatusCodeSame(404);
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('Invalid date format', $responseData['error']);
    }



    // test for /api/history

    public function testGetHistoryWithValidData(): void{
      $client = static::createClient();
      $client->request('GET', '/api/history?startDate=2023-11-01&endDate=2023-11-27&code=EUR');
      $this->assertResponseIsSuccessful();
      $response = $client->getResponse();
      $this->assertJson($response->getContent());

      $responseData = json_decode($response->getContent(), true);
      $this->assertArrayHasKey('table', $responseData);
      $this->assertArrayHasKey('code', $responseData);
      $this->assertArrayHasKey('currency', $responseData);
      $this->assertArrayHasKey('rates', $responseData);
      // Additional assertions can be added to check the structure of 'rates'
    }

    public function testGetHistoryWithoutCode(): void{
        $client = static::createClient();
        $client->request('GET', '/api/history?startDate=2023-11-01&endDate=2023-11-27');
        $this->assertResponseStatusCodeSame(404);
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('Currency code not provided', $responseData['error']);
    }

    public function testGetHistoryWithoutStartDateOrEndDate(): void{
        $client = static::createClient();
        $client->request('GET', '/api/history?code=EUR');
        $this->assertResponseStatusCodeSame(404);
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('startDate not provided', $responseData['error']);
    }


      public function testGetHistoryWithInvalidCode(): void{
        $client = static::createClient();
        $client->request('GET', '/api/history?startDate=2023-11-01&endDate=2023-11-27&code=INVALID');
        $this->assertResponseStatusCodeSame(404);
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('Invalid currency code', $responseData['error']);
      }

      public function testGetHistoryWithInvalidDates(): void{
        $client = static::createClient();
        $client->request('GET', '/api/history?startDate=invalid-date&endDate=2023-11-27&code=EUR');
        $this->assertResponseStatusCodeSame(404);
        
        $response = $client->getResponse();
        $this->assertJson($response->getContent());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('Invalid start date format', $responseData['error']);
      }

      public function testGetHistoryWithStartDateLaterThanEndDate(): void{
          $client = static::createClient();
          $client->request('GET', '/api/history?startDate=2023-11-27&endDate=2023-11-01&code=EUR');
          $this->assertResponseStatusCodeSame(404);
          
          $response = $client->getResponse();
          $this->assertJson($response->getContent());

          $responseData = json_decode($response->getContent(), true);
          $this->assertEquals('Invalid date range', $responseData['error']);
      }


}