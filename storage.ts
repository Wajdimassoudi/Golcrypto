
import { User } from '../types';

const USER_KEY = 'gaf_user';
const ADS_KEY = 'gaf_ads_viewed';

export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getAdViewHistory = (): string[] => {
  const data = localStorage.getItem(ADS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAdView = (adId: string) => {
  const history = getAdViewHistory();
  if (!history.includes(adId)) {
    localStorage.setItem(ADS_KEY, JSON.stringify([...history, adId]));
  }
};
