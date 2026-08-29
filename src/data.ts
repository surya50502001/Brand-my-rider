import { Helmet, Auction } from './types';

export const HELMETS: Helmet[] = [
  {
    id: 'agv_k6',
    brand: 'AGV',
    model: 'K6 S',
    price: 499,
    color: '#1a1a1a',
    accentColor: '#e53e3e', // Red accent
    visorColor: '#000000', // Dark smoke
    shape: 'track',
    type: 'Full Face Sport',
    certification: 'ECE 22.06 / DOT',
    weight: '1220g',
    sizes: ['XS', 'S', 'MS', 'ML', 'L', 'XL', 'XXL']
  },
  {
    id: 'axor_apex',
    brand: 'AXOR',
    model: 'Apex Hunter',
    price: 150,
    color: '#2a4365', // Dark blue
    accentColor: '#38b2ac', // Teal
    visorColor: '#4a5568', // Light smoke
    shape: 'aggressive',
    type: 'Full Face Touring',
    certification: 'DOT / ISI / ECE',
    weight: '1600g',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'mt_thunder4',
    brand: 'MT',
    model: 'Thunder 4',
    price: 180,
    color: '#ffffff', // White
    accentColor: '#000000', // Black graphics
    visorColor: '#e2e8f0', // Clear
    shape: 'touring',
    type: 'Full Face All-Rounder',
    certification: 'ECE 22.06',
    weight: '1500g',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'hjc_rpha11',
    brand: 'HJC',
    model: 'RPHA 11 Pro',
    price: 450,
    color: '#4a5568', // Matte Grey
    accentColor: '#ecc94b', // Gold
    visorColor: '#ecc94b', // Gold iridium visor
    shape: 'track',
    type: 'Full Face Track',
    certification: 'ECE / DOT',
    weight: '1300g',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'smk_typhoon',
    brand: 'SMK',
    model: 'Typhoon',
    price: 120,
    color: '#000000', // Black
    accentColor: '#9f7aea', // Purple graphics
    visorColor: '#000000', // Dark smoke
    shape: 'aggressive',
    type: 'Full Face Street',
    certification: 'ECE / ISI',
    weight: '1600g',
    sizes: ['S', 'M', 'L']
  }
];

export const DEMO_AUCTION: Auction = {
  helmetId: 'axor_apex',
  currentBid: 42000,
  endTime: new Date(Date.now() + 1000 * 60 * 60 * 4 + 1000 * 60 * 21 + 1000 * 38).toISOString() // 4:21:38 from now
};
