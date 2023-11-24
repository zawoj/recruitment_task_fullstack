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
  const initialDate = queryParams.get('date') || new Date().toISOString().split('T')[0];



  const [date, setDate] = useState(initialDate);
  const [exchangeData, setExchangeData] = useState<ExchangeRatesTable | null>(
    null
  );
  const [loading, setLoading] = useState(true);



  const handleStartDateChange = (newDate:string) => {
    setDate(newDate);
    updateQueryParams(newDate);
  };

  const handleEndDateChange = (newDate:string) => {
    setDate(newDate);
    updateQueryParams( newDate);
  };

  const updateQueryParams = (date:string, ) => {
    const newQueryParams = new URLSearchParams();
    newQueryParams.set('date', date);
    history.push({ search: newQueryParams.toString() });
  };

  useEffect(() => {
  axios
    .get(`http://telemedi-zadanie.localhost/api/nbp?date=${date}`)
    .then((response) => {
      setExchangeData(response.data[0]);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });

    

  

}, [date]);


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className='container'>
      <h2>Exchange Rates</h2>
    <div>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => handleEndDateChange(e.target.value)} 
          min="2019-01-01"
          max={today} 
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
