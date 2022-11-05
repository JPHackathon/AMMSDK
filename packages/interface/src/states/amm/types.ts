export interface GameData {
  signer: string;
  name: string;
  description: string;
  symbol: string;
  endpoint: string;
}

export interface PairData {
  address0: string;
  address1: string;
  amount0: number;
  amount1: number;
}
