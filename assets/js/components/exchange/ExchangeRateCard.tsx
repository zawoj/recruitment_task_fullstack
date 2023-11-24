import React, { FC } from "react";
import { ExchangeRate } from "../../types/common";

interface Props {
  rate: ExchangeRate;
}

const ExchangeRateCard: FC<Props> = (porps) => {
  const { rate } = porps;
  return (
    <div className='col-md-4 mb-4'>
      <div className='card' style={{ width: "18rem" }}>
        <div className='card-body'>
          <h5 className='card-title'>
            {rate.code} - {rate.currency}
          </h5>
          <p className='card-text'>NBP Rate: {rate.mid}</p>
          <p className='card-text'>Buy Rate: {rate.buyRate ?? "N/A"}</p>
          <p className='card-text'>Sell Rate: {rate.sellRate ?? "N/A"}</p>
          <a href='#' className='btn btn-success'>
            Buy
          </a>
          <a href='#' className='btn btn-danger'>
            Sell
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
