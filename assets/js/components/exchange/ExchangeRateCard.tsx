import React, { FC } from "react";
import { ExchangeRate } from "../../types/common";
import { Link } from "react-router-dom";

interface Props {
  rate: ExchangeRate;
}

const ExchangeRateCard: FC<Props> = (porps) => {
  const { rate } = porps;
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
            <th className="text-center">Picked date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NBP</td>
            <td className="text-center">{rate.todayMid?.toFixed(4) ?? '---'}</td>
            <td className="text-center">{rate.mid.toFixed(4)}</td>
          </tr>
          <tr>
            <td>Buy</td>
            <td className="text-center">{rate.todayBuy?.toFixed(4) ?? '--'}</td>
            <td className="text-center">{rate.buyRate?.toFixed(4) ?? '--'}</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td className="text-center">{rate.todaySell?.toFixed(4) ?? "--"}</td>
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
