import React, { FC } from "react";
import { ExchangeRate } from "../../types/common";
import { Link } from "react-router-dom";

interface Props {
  rate: ExchangeRate;
  date: string
}

const ExchangeRateCard: FC<Props> = (porps) => {
  const { rate ,date} = porps;

  console.log(date , 
            new Date().toISOString().split('T')[0])

  return (
  <div className='card'>
    <div className='card-body'>
      <h5 className='card-title text-center'>
        {rate.code} - {rate.currency}
      </h5>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Today</th>
            { date === 
            new Date().toISOString().split('T')[0] ? null :
              <th className="text-center">Picked date</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NBP</td>
            { date === 
            new Date().toISOString().split('T')[0] ? null :<td className="text-center">{rate.todayMid?.toFixed(4) ?? '---'}</td>}
            <td className="text-center">{rate.mid.toFixed(4)}</td>
          </tr>
          <tr>
            <td>Buy</td>
            { date === 
            new Date().toISOString().split('T')[0] ? null :<td className="text-center">{rate.todayBuy?.toFixed(4) ?? '--'}</td>}
            <td className="text-center">{rate.buyRate?.toFixed(4) ?? '--'}</td>
          </tr>
          <tr>
            <td>Sell</td>
            { date === 
            new Date().toISOString().split('T')[0] ? null : <td className="text-center">{rate.todaySell?.toFixed(4) ?? "--"}</td>}
            <td className="text-center">{rate.sellRate?.toFixed(4) ?? "--"}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex w-100 justify-content-center">
        <Link to={`/rate-history?code=${rate.code}`} className="
          d-flex
          justify-content-center
          align-items-center
          w-100
          
        ">
          <button className="btn btn-primary bg-success-custom">Show history</button>
        </Link>
      </div>
      
    </div>
  </div>

  );
};

export default ExchangeRateCard;
