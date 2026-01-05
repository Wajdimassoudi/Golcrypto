
import React, { useState } from 'react';
import { User } from '../types';
import { saveUser } from '../services/storage';

interface Props {
  onLogin: (u: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        balance: 0.005,
        referrals: 0,
      };
      saveUser(newUser);
      onLogin(newUser);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 mb-20 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="bg-slate-800 p-12 rounded-[3rem] border border-slate-700 shadow-2xl relative z-10 overflow-hidden">
        <div className="text-center mb-10">
          <div className="inline-block bg-indigo-600/20 p-4 rounded-3xl mb-6">
            <span className="text-4xl">🔐</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Connect Account</h2>
          <p className="text-slate-400 font-medium">Use your FaucetPay registered email to login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg font-medium"
              placeholder="e.g. name@faucetpay.io"
            />
          </div>

          <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/20 flex items-start gap-4">
            <div className="text-2xl mt-1">💡</div>
            <p className="text-xs text-indigo-300 leading-relaxed font-medium">
              We use OAuth simulation for FaucetPay to ensure your funds are always directed to the correct wallet. Instant withdrawals are guaranteed for verified emails.
            </p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-6 rounded-2xl transition-all shadow-xl shadow-indigo-600/30 disabled:opacity-50 text-xl active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing with FaucetPay...
              </span>
            ) : 'Access My Wallet'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-slate-500 text-sm font-medium mb-4">New to FaucetPay ecosystem?</p>
          <a href="https://faucetpay.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
            Create a FaucetPay Wallet
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
