export interface ConversionRate {
  currencyCode: string;
  rate: number;
  thumbnail: string;
}

export interface BlockchainNetwork {
  name: string;
  thumbnail: string;
  conversionRates: Record<string, ConversionRate>;
}

export interface Currency {
  code: string;
  country: string;
  thumbnail: string;
}

export interface Wallet {
  name: string;
  thumbnail: string;
}

