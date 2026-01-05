
export interface User {
  id: string;
  email: string;
  balance: number; // in USDT
  referrals: number;
  lastFaucetClaim?: number;
  referredBy?: string;
  apiKey?: string; // FaucetPay Merchant API Key
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  reward: number; // in USDT
  timer: number; // in seconds
  url: string;
  category: 'PTC' | 'Banner' | 'Offer';
}

export interface Offer {
  id: string;
  provider: string;
  title: string;
  reward: number;
  type: string;
}
