
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { saveUser } from '../services/storage';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Faucet: React.FC<Props> = ({ user, setUser }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [success, setSuccess] = useState(false);

  const CLAIM_COOLDOWN = 60 * 60 * 1000; // 1 hour
  const REWARD = 0.001; // 0.001 USDT

  useEffect(() => {
    const updateTimer = () => {
      if (user.lastFaucetClaim) {
        const nextClaim = user.lastFaucetClaim + CLAIM_COOLDOWN;
        const now = Date.now();
        const diff = nextClaim - now;
        if (diff > 0) {
          setTimeLeft(Math.floor(diff / 1000));
        } else {
          setTimeLeft(0);
        }
      } else {
        setTimeLeft(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user.lastFaucetClaim]);

  const handleClaim = () => {
    setClaiming(true);
    // Simulate FaucetPay API interaction
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        balance: user.balance + REWARD,
        lastFaucetClaim: Date.now()
      };
      setUser(updatedUser);
      saveUser(updatedUser);
      setClaiming(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-12 py-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Hourly USDT Faucet</h1>
        <p className="text-slate-400 text-lg">Click the button below to claim your free crypto rewards every hour.</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-8">
          <div className="inline-block p-6 rounded-3xl bg-slate-900 border border-slate-700">
            <span className="text-5xl">🚰</span>
          </div>

          <div className="space-y-2">
            <p className="text-slate-500 uppercase font-bold text-xs tracking-widest">Available Reward</p>
            <p className="text-4xl font-mono text-indigo-400 font-bold">{REWARD} USDT</p>
          </div>

          {timeLeft === 0 || timeLeft === null ? (
            <button 
              onClick={handleClaim}
              disabled={claiming}
              className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl text-xl font-bold shadow-lg shadow-indigo-600/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {claiming ? 'Sending to Wallet...' : 'Claim Now!'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="text-5xl font-mono text-slate-500 font-bold">{formatTime(timeLeft)}</div>
              <p className="text-slate-500 text-sm">Please wait for the timer to reset to claim again.</p>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-1000" 
                  style={{ width: `${((CLAIM_COOLDOWN/1000 - timeLeft) / (CLAIM_COOLDOWN/1000)) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-600/20 text-green-400 p-4 rounded-xl border border-green-600 animate-bounce">
              🎉 Success! Your balance has been updated.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-2">Instant Payments</h4>
          <p className="text-xs text-slate-400">All claims are instantly added to your dashboard balance.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-2">Referral Bonus</h4>
          <p className="text-xs text-slate-400">Get 20% extra when your friends claim from this faucet.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-2">No Limit</h4>
          <p className="text-xs text-slate-400">Claim 24 times a day, every single day, for free.</p>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
