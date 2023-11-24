export type ExchangeRate = {
  currency: string;
  code: string;
  mid: number;
  buyRate?: number;
  sellRate?: number;
};

export type ExchangeRatesTable = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
};
