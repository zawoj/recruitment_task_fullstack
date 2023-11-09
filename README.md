Fullstack Developer - Tasks
==========

**NOTE 1:** Jeśli w przesłanej instrukcji nie zaznaczono inaczej, wystarczy zrealizować zadanie nr 1.

**NOTE 2:** Instrukcje do poszczególnych zadań znajdują się w dalszej części Readme (sekcja "Treść zadań").

Wytyczne ogólne
------------

  1. W repozytorium znajdują się zadania do wykonania w folderze `./tasks/` głównego katalogu repozytorium. 
  1. Każdy plik w w/w folderze jest oznaczony numerem zadania, oraz zawiera treść zadania.      
  1. Uruchomienie kodu w zadaniu jest możliwe przez uruchomienie pliku z zadaniem z konsoli. Przykład:
  
            $ php tasks/task1_exchangeRates.php
       
  1. *Alternatywnie, dla celów wygody*, można uruchomić zadanie z przeglądarki, uruchamiając plik index.php - w parametrze `taskNr` umieszczając numer zadania: `http://localhost/tasks_php/index.php?taskNr=1`
            
  1. **Aby udostępnić wynik zadania, należy zrobić Fork z repozytorium oraz opublikować Pull Request** do brancha master w udostępnionym repozytorium, i potwierdzić mailowo zakończenie zadania.
     
     **Instrukcja:** [Jak forkować repozytorium w Bitbucket i tworzyć Pull Request](https://support.atlassian.com/bitbucket-cloud/docs/fork-a-repository/)

  1. Poza implementacją **zależy nam też na informacjach zwrotnych**, które posłużą nam w poprawie jakości zadań. Dlatego dla każdego implementowanego zadania, prosimy o umieszczenie w komentarzu w pliku z zadaniem (np. `tasks/taskXYZ.php`) następujących informacji:
  
        1. estymacji godzinowej (przed rozpoczęciem implementacji)
        1. faktycznie poświęconego czasu (po zakończeniu implementacji)      
        1. przemyśleń / komentarzy / feedbacku do zadania

Wytyczne dot. implementacji
------------
  * Głównym celem implementacji powinno być pokazanie się z dobrej strony jako programista, czyli **nie ma jednego dobrego podejścia! :)**
  * Aby rozpocząć pracę, należy zacząć od zainstalowania [pobrania i zainstalowania composera](https://getcomposer.org/) 
  * Następnie należy wykonać komendę instalującą autoloader i dociągającą dostępne paczki:
  
        $ composer install
        
  * W ramach implementacji **dopuszczalne jest**:
        
    1. modyfikowanie plików z folderu `tasks/*` w zakresie zmiany danych wejściowych,
    1. tworzenie nowych plików i katalogów (zawartość wedle uznania)
  * W ramach implementacji **nie należy** używać paczek z composera (poza już dostępnymi), ani modyfikować plików:
  
              index.php
              bootstrap.php
              Api/ResponseInterface.php
  
  * Development należy prowadzić pod kątem kompatybilności z **PHP w wersji 7.2** (na tej wersji będzie prowadzona weryfikacja).
  * Ocenie podlegać będzie całość podejścia do zadania.
  * **Niedokończone zadanie też warto podesłać**, np. z komentarzem, co by można było dodać - rozumiemy, że czasem nie starcza czasu na wszystko co się chce zrobić! :) 

Pozostałe informacje
------------

  * Repozytoria są dostępne publicznie, po ukończeniu zadań zostaną zmienione na prywatne.
  * Po realizacji zadań będziemy wdzięczni za feedback dotyczący zarówno treści i jasności zadań, oraz formy ich udostępnienia
    
-------


Treść zadań
------------


### Task #1: Exchange rates calculator
 

Task file: `tasks\task1_exchangeRates.php`

See: `Api\ExchangeRates\CalculatorController::calculateCurrentExchangeRateAction()`

##### Description

The invoked controller's method should calculate the exchange rate for the current date (i.e. "Today")
between **ANY two currencies** from TABLE A, from data provided by NBP API: http://api.nbp.pl/ (API docs provided under this link). 

The `amount` parameter (_which is optional in input_), if given, should be used to calculate the resulting amount of money after the exchange the `amount` of `fromCurrency` using a calculated exchange rate.  

Resulting response should contain information about currencies calculated (`fromCurrency` and `toCurrency`), the resulting exchange rate and (if given in input) the resulting amount after calculation.  

```
Example 1: 
If for a given day exchange rates are as follows:
    USD -> PLN = 3.71
    GBP -> PLN  = 4.89
then resulting rate USD -> GBP should be: 0.75869

Example 2: 
If the input contains the given amount = 50, and exchange rates are:
    USD -> PLN = 3.71
    GBP -> PLN  = 4.89
then the response should also contain the resulting amount of money in GBP,
after exchanging amount = 50 USD:
    resulting_amount = 50 * 0.75869 = 37.93450 
```

**Note:**

1. Response format is up to you.

1. Resulting rates should have exactly 5 decimal places (no more, no less)

1. Assume any input passed to this method (like `$_`GET`)

1. Extra challenge (optional): assume heavy load (many requests per second)

**This is it - GOOD LUCK!**


------------
### Task #2: Exchange rates historical statistics 

Task file: `tasks\task2_rateStats.php`

See: `Api\ExchangeRates\CalculatorController::getRateStatsAction()`

##### Description

The invoked controller's method should calculate **statistics of exchange rates to PLN** (described below) calculated between any of the given dates (limited to 2018-01-01 and 2020-08-31)
for **ANY currency** from TABLE A from data provided by NBP API: http://api.nbp.pl/ (API docs provided under this link).

Resulting response should contain information about following statistics for exchange rates to PLN:
- highest exchange rate in period + date when it ocurred
- lowest exchange rate in period + date when it ocurred
- average exchange rate in period

**Note:**

1. Response format is up to you

1. Resulting rates should have exactly 5 decimal places (no more, no less)

1. Assume any input (like `$_GET`)

1. Extra challenge (optional): assume heavy load (many requests per second)

**This is it - GOOD LUCK!**
