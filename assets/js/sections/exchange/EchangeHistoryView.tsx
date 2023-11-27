import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { ExchangeRatesTable, HistoryRate, HistoryRatesTable } from '../../types/common';
import axios from 'axios';

const EchangeHistoryView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code')

  const history = useHistory();
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const initialStartDate = queryParams.get('startDate') || weekAgo;
  const initialEndDate = queryParams.get('endDate') || new Date().toISOString().split('T')[0];
  const [error, setError] = useState(null);


  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [exchangeData, setExchangeData] = useState<HistoryRatesTable | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [maxStart, setMaxStart] = useState(today);
  const [maxEnd, setMaxEnd] = useState(today);
  const [minStart, setMinStart] = useState("2023-01-01")
  const [minEnd, setMinEnd] = useState("2023-01-01")


  const handleStartDateChange = (newDate:string) => {
    setStartDate(newDate);
    setMaxEnd(today); 
    setMinEnd(newDate); 
    updateQueryParams(newDate, endDate);
  };

  const handleEndDateChange = (newDate:string) => {
    setEndDate(newDate);
    setMaxStart(newDate); 
    setMinStart("2023-01-01");
    updateQueryParams(startDate, newDate);
  };

  const updateQueryParams = (newStartDate:string, newEndDate:string) => {
    const newQueryParams = new URLSearchParams();
    newQueryParams.set('code', code)
    newQueryParams.set('startDate', newStartDate);
    newQueryParams.set('endDate', newEndDate);
    history.push({ search: newQueryParams.toString() });
  };

  useEffect(() => {
  axios
    .get(`http://telemedi-zadanie.localhost/api/history?startDate=${startDate}&endDate=${endDate}&code=${code}`)
    .then((response) => {
      setExchangeData(response.data);
      setLoading(false);
      setError(null)

    })
    .catch((error) => {
      setError(error.response.data.error)
      setLoading(false);
    });

    

    setMaxEnd(today)
    setMinEnd(startDate)
    setMaxStart(endDate)
    setMinStart("2023-01-01")

}, [startDate, endDate]);



  if (loading) {
    return <div>Loading...</div>;
  }


  const genHeight = (rates: HistoryRate[]) => {
    // scale it like max height is 120px and max value is 120px lowes value is 20px rest is % of max value
    const max = Math.max(...rates.map(rate => rate.mid))
    const min = Math.min(...rates.map(rate => rate.mid))
    const maxH = 150
    const minH = 20
    const range = max !== min ? max - min : 1
    const step = (maxH - minH) / range
    return rates.map(rate => {
      const height = (rate.mid - min) * step + minH
      return {
        ...rate,
        height
      }
    })

  }


  return (
    <div className='container my-4'>
      <div className="text-center mb-4">
        <h2>{error ? code : exchangeData.currency} - Exchange Rates History</h2>
         <input 
          type="date" 
          value={startDate} 
          onChange={(e) => handleStartDateChange(e.target.value)} 
          min={minStart}
          max={maxStart}
          className='mr-2' 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => handleEndDateChange(e.target.value)} 
          min={minEnd}
          max={maxEnd} 
        />
      </div>
    
      <div className='bg-white w-100 m-2 pt-4 pb-2 px-2 d-flex justify-content-between align-items-end'>
        {
           !error && genHeight(exchangeData.rates).map((rate) =>(
                <div className='d-flex flex-column align-items-center justify-content-between' key={rate.effectiveDate}>
                  <div
                    style={{
                      height: `${rate.height.toFixed(0)}px`,
                    }}
                    className='chart-block'
                  >
                    <div className='chart-value'>
                      {rate.mid}
                    </div>
                  </div>
                  
                  <span className='text-center'>{rate.effectiveDate}</span>
                </div>
            ))
        }
    { error && <div className="alert alert-danger">{error}</div> }
      </div>
  </div>
  )
}

export default EchangeHistoryView