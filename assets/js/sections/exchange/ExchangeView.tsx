import axios from "axios";
import React, { useEffect, useState } from "react";

type ExchangeRate = {
  currency: string;
  code: string;
  mid: number;
};

type ExchangeRatesTable = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
};

type NBPResponse = ExchangeRatesTable[];

const ExchangeView = () => {
  const [exchangeData, setExchangeData] = useState<ExchangeRatesTable | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://telemedi-zadanie.localhost/api/nbp") // Załóżmy, że jest to endpoint w Twojej aplikacji Symfony
      .then((response) => {
        setExchangeData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(JSON.stringify(exchangeData));

  return (
    <div>
      <h2>Exchange Rates</h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Code</th>
            <th>Mid</th>
          </tr>
        </thead>
        <tbody>
          {exchangeData.rates.map((rate, index) => (
            <tr key={`${index}-${rate.code}`}>
              <td>{rate.currency}</td>
              <td>{rate.code}</td>
              <td>{rate.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeView;
