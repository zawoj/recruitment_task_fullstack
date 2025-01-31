import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExchangeRatesTable } from "../../types/common";
import ExchangeRateCard from "../../components/exchange/ExchangeRateCard";
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from "../../components/common/Spinner";
import ErrorAlert from "../../components/common/Error";


const ExchangeView = () => {
  const location = useLocation();
  const history = useHistory();
  const today = new Date().toISOString().split('T')[0];
  const queryParams = new URLSearchParams(location.search);
  const initialDate = queryParams.get('date') || new Date().toISOString().split('T')[0];



  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState(null);
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
        setExchangeData(response.data);
        setLoading(false);
        setError(null)
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error)
        setExchangeData(null)
      });
  }, [date]);


if (loading) {
    return (
      <Spinner />
    );
  }


  return (
    <div className='container my-4'>
      <div className="text-center mb-4">
        <h2>Exchange Rates</h2>
        <input 
          className="form-control my-2" 
          type="date" 
          value={date} 
          onChange={(e) => handleEndDateChange(e.target.value)} 
          min="2023-01-01"
          max={today}
          data-testid="date-input"
        />
      </div>
    
    <div className='row'>
      {exchangeData !== null && exchangeData.rates.map((rate, index) => (
        <div className="col-md-4 mb-4" key={`${index}-${rate.code}`}>
          <ExchangeRateCard rate={rate} date={exchangeData.effectiveDate}/>
        </div>
      ))}
    </div>
    { error && <ErrorAlert error={error}/> }
  </div>
  );
};

export default ExchangeView;
