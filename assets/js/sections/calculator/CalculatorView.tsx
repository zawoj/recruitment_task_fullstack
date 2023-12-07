import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExchangeRatesTable } from '../../types/common';
import Spinner from '../../components/common/Spinner';

const CalculatorView = () => {
  const [startValue, setStartValue] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [optionOne, setOptionOne] = useState<string| null>(null)
  const [optionTwo, setOptionTwo] = useState<string | null>(null)
  const [restulError, setResultError] = useState<string | null>(null)


  const [options, setOptions] = useState<{
          value: {
            buy: number,
            sell:number
          };
          code: string;
        }[] | null>(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = () => {
    axios
      .get(`http://telemedi-zadanie.localhost/api/nbp`)
      .then((response: {
        data: ExchangeRatesTable
      }) => {
        const rates: { value: {
          buy: number,
          sell:number
        }; code: string; }[] = []
        response.data.rates.forEach((rate) => {
          rates.push({
            value: {
              buy: rate.buyRate,
              sell: rate.sellRate
            },
            code: rate.code,
          });
        });

        if(rates && rates.length < 2){
          setError('Za mało walut')
        } else{
          setOptions(rates);
        }
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    calculateResults()
  }, [optionOne, optionTwo, startValue])


  if(error){
    return <div>There is a problem: {error}</div>
  }

  const calculateResults = () =>{
    setResultError(null)
    if(!optionOne || !optionTwo || !startValue){
      return
    }
    if(optionOne === optionTwo) {
      setResultError("Dziękujemy za dofinasowanie !")
      return
    }

    const optionOneValue = options?.find((option) => option.code === optionOne)?.value
    const optionTwoValue = options?.find((option) => option.code === optionTwo)?.value


    if(!optionOneValue.buy || !optionTwoValue.sell ){
      console.log(optionOneValue, optionTwoValue)
      setResultError("Wymiana nie jest możliwa dla wybranych opcji.")
      return
    }
    
  
    console.log(optionOneValue.buy, optionTwoValue.sell)
    const result = (optionOneValue.buy / optionTwoValue.sell) * Number(startValue)
    setResult(Number(result.toFixed(4)))
  }

  return (
    <div>
      <h1>Welcome to calculator</h1>
      {
        loading ? 
        (<Spinner/>) 
        : 
        (<div className='calc'>
          <input 
          type="text" 
          value={startValue} 
          onChange={(e) => {
            setStartValue(e.target.value)
          }} 
          />
          <div className='input-with-label'>
            <span>
              From
            </span>
            <select 
              value={optionOne} 
              onChange={(e) => {
                setOptionOne(e.target.value)
              }}
              defaultValue={null}
              >
              <option
                value={null}
              >Choose currency</option>
              {options.map((opt, index) => (
                <option key={index} value={opt.code}>
                  {opt.code}
                </option>
              ))}
            </select>
          </div>
          <div className='input-with-label'>
            {/* Cena  */}
            <span>To</span>
            <select 
              value={optionTwo} 
              onChange={(e) => {
                setOptionTwo(e.target.value)
              }}
              defaultValue={null}
              >
              <option value={null}>Choose currency</option>
              {options.map((opt, index) => (
                <option key={index} value={opt.code}>
                  {opt.code}
                </option>
              ))}
            </select>
          </div>
      <div>
        {
          restulError ? (
            <div>
              {restulError}
            </div>
          ) 
          :
          (<div> Result: {result}</div>)
        }
      </div>
      </div>)
      }
      
    </div>
  );
};

export default CalculatorView;
