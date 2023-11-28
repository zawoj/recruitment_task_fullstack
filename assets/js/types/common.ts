export type ExchangeRate = {
  currency: string;
  code: string;
  mid: number;
  buyRate?: number;
  sellRate?: number;
  todayMid?: number;
  todaySell?: number;
  todayBuy?: number;
};

export type ExchangeRatesTable = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
};

export type HistoryRatesTable = {
  table: string;
  code: string;
  currency: string;
  rates: HistoryRate[];
};


export type HistoryRate = {
  no: string;
  effectiveDate: string;
  mid: number;
  height?: number;
};
