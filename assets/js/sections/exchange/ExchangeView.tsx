import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExchangeRatesTable } from "../../types/common";
import ExchangeRateCard from "../../components/exchange/ExchangeRateCard";
import { useHistory, useLocation } from 'react-router-dom';


const ExchangeView = () => {
  const location = useLocation();
  const history = useHistory();
  const today = new Date().toISOString().split('T')[0];
  const queryParams = new URLSearchParams(location.search);
  const initialStartDate = queryParams.get('startDate') || new Date().toISOString().split('T')[0];
  const initialEndDate = queryParams.get('endDate') || new Date().toISOString().split('T')[0];


  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [exchangeData, setExchangeData] = useState<ExchangeRatesTable | null>(
    null
  );
  const [todayExchangeData, setTodayExchangeData] = useState<ExchangeRatesTable | null>(
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
    newQueryParams.set('startDate', newStartDate);
    newQueryParams.set('endDate', newEndDate);
    history.push({ search: newQueryParams.toString() });
  };

  useEffect(() => {
  axios
    .get(`http://telemedi-zadanie.localhost/api/nbp?startDate=${startDate}&endDate=${endDate}`)
    .then((response) => {
      setExchangeData(response.data[0]);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
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


  return (
    <div className='container'>
      <h2>Exchange Rates</h2>
    <div>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => handleStartDateChange(e.target.value)} 
          min={minStart}
          max={maxStart} 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => handleEndDateChange(e.target.value)} 
          min={minEnd}
          max={maxEnd} 
        />
      </div>
      <div className='row'>
        {exchangeData.rates.map((rate, index) => (
          <ExchangeRateCard 
            key={`${index}-${rate.code}`} 
            rate={rate} 
          />
        ))}
      </div>
    </div>
  );
};

export default ExchangeView;
