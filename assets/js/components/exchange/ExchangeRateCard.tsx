import React, { FC } from "react";
import { ExchangeRate } from "../../types/common";

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
            <th className="text-center">From Range</th>
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
    </div>
  </div>

  );
};

export default ExchangeRateCard;
