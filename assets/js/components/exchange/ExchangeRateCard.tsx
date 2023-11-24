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
                {/* <td>{todayRate.mid ?? '---'}</td> */}
                <td>{rate.mid.toFixed(4)}</td>
              </tr>
              <tr>
                <td>Buy</td>
                <td>
                  {/* {todayRate.buyRate ? todayRate.buyRate.toFixed(4) : '--'} */}
                </td>
                <td>{rate.buyRate ? rate.buyRate.toFixed(4) : '--'}</td>
              </tr>
              <tr>
                <td>Sell</td>
                <td>
                  {/* {todayRate.sellRate ? todayRate.sellRate.toFixed(4) : "--"} */}
                </td>
                <td>{rate.sellRate ? rate.sellRate.toFixed(4) : "--"}</td>
              </tr>
            </tbody>
          </table>
          {/* <p className='card-text'>NBP Rate: {rate.mid}</p>
          <p className='card-text'>Buy Rate: {rate.buyRate ?? "N/A"}</p>
          <p className='card-text'>Sell Rate: {rate.sellRate ?? "N/A"}</p> */}
          {/* <div className="d-flex justify-content-around">
            <a href='#' className='btn btn-success w-50 m-r-3'>
            Buy
            </a>
            <a href='#' className='btn btn-danger w-50 m-l-3'>
              Sell
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
