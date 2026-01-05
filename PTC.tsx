
import React, { useState, useEffect } from 'react';
import { User, Ad } from '../types';
import { saveUser, saveAdView, getAdViewHistory } from '../services/storage';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const MOCK_ADS: Ad[] = [
  { id: 'ad1', title: 'Crypto Invest 2024', description: 'Double your crypto with this safe platform!', reward: 0.001, timer: 15, url: 'https://example.com', category: 'PTC' },
  { id: 'ad2', title: 'Free BTC Faucet', description: 'Click now to get free Bitcoin every minute.', reward: 0.0005, timer: 10, url: 'https://example.com', category: 'PTC' },
  { id: 'ad3', title: 'USDT Miner Pro', description: 'Start mining USDT from your browser today.', reward: 0.0008, timer: 12, url: 'https://example.com', category: 'PTC' },
  { id: 'ad4', title: 'Best Offerwall Site', description: 'The highest paying surveys in the world.', reward: 0.0012, timer: 20, url: 'https://example.com', category: 'PTC' },
  { id: 'ad5', title: 'Trade Like a Pro', description: 'Signals for all crypto pairs available now.', reward: 0.0005, timer: 10, url: 'https://example.com', category: 'PTC' },
  { id: 'ad6', title: 'Doge Coin Casino', description: 'Bet your Doge and win massive jackpots.', reward: 0.0004, timer: 8, url: 'https://example.com', category: 'PTC' },
];

const PTC: React.FC<Props> = ({ user, setUser }) => {
  const [viewingAd, setViewingAd] = useState<Ad | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    setViewedIds(getAdViewHistory());
  }, []);

  useEffect(() => {
    let interval: any;
    if (viewingAd && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (viewingAd && timeLeft === 0) {
      // Logic for when timer hits zero
    }
    return () => clearInterval(interval);
  }, [viewingAd, timeLeft]);

  const startAd = (ad: Ad) => {
    setViewingAd(ad);
    setTimeLeft(ad.timer);
    window.open(ad.url, '_blank');
  };

  const verifyClaim = () => {
    if (!viewingAd) return;
    setVerifying(true);
    // Simulate server/webhook validation
    setTimeout(() => {
      const updatedUser = { ...user, balance: user.balance + viewingAd.reward };
      setUser(updatedUser);
      saveUser(updatedUser);
      saveAdView(viewingAd.id);
      setViewedIds(prev => [...prev, viewingAd.id]);
      setViewingAd(null);
      setVerifying(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">PTC Advertisements</h1>
          <p className="text-slate-400">Earn USDT for every website you visit.</p>
        </div>
      </div>

      {viewingAd ? (
        <div className="bg-slate-800 p-12 rounded-3xl border-2 border-indigo-500 text-center space-y-6">
          <h2 className="text-2xl font-bold">Viewing: {viewingAd.title}</h2>
          <div className="text-6xl font-mono text-indigo-400">{timeLeft}s</div>
          <p className="text-slate-400">Please keep the ad window open until the timer ends.</p>
          
          {timeLeft === 0 && (
            <button 
              onClick={verifyClaim}
              disabled={verifying}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg animate-bounce disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Claim Reward!'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ADS.map((ad) => {
            const isViewed = viewedIds.includes(ad.id);
            return (
              <div key={ad.id} className={`bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between transition-all ${isViewed ? 'opacity-50 grayscale pointer-events-none' : 'hover:border-indigo-500 hover:shadow-xl'}`}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-700 text-indigo-300 px-2 py-1 rounded text-xs font-bold">{ad.timer}s Timer</span>
                    <span className="text-indigo-400 font-mono font-bold">{ad.reward.toFixed(4)} USDT</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                  <p className="text-sm text-slate-400 mb-6">{ad.description}</p>
                </div>
                <button 
                  onClick={() => startAd(ad)}
                  className="w-full bg-slate-700 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {isViewed ? 'Already Viewed' : 'Watch Now'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!viewingAd && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-dashed border-slate-700 text-center text-slate-500">
          Check back in 24 hours for fresh advertisements.
        </div>
      )}
    </div>
  );
};

export default PTC;
