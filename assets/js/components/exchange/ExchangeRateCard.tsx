import React, { FC } from "react";
import { ExchangeRate } from "../../types/common";

interface Props {
  rate: ExchangeRate;
}

const ExchangeRateCard: FC<Props> = (porps) => {
  const { rate } = porps;
  return (
    <div className='col-md-4 mb-2'>
      <div className='card' >
        <div className='card-body'>
          <h5 className='card-title text-center'>
            {rate.code} - {rate.currency}
          </h5>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Today</th>
                <th>From Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NBP</td>
                <td>{rate.todayMid ?? '---'}</td>
                <td>{rate.mid.toFixed(4)}</td>
              </tr>
              <tr>
                <td>Buy</td>
                <td>{rate.todayBuy ? rate.todayBuy.toFixed(4) : '--'}</td>
                <td>{rate.buyRate ? rate.buyRate.toFixed(4) : '--'}</td>
              </tr>
              <tr>
                <td>Sell</td>
                <td>{rate.todaySell ? rate.todaySell.toFixed(4) : "--"}</td>
                <td>{rate.sellRate ? rate.sellRate.toFixed(4) : "--"}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
