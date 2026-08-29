export type HelmetShape = 'aggressive' | 'touring' | 'retro' | 'track';

export interface Helmet {
  id: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  accentColor: string;
  visorColor: string;
  shape: HelmetShape;
  type: string;
  certification: string;
  weight: string;
  sizes: string[];
}

export interface Auction {
  helmetId: string;
  currentBid: number;
  endTime: string;
}
