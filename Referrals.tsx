
import React from 'react';
import { User } from '../types';

interface Props {
  user: User;
}

const Referrals: React.FC<Props> = ({ user }) => {
  const refLink = `${window.location.origin}/#/login?ref=${user.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
    alert('Referral link copied!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Affiliate Program</h1>
        <p className="text-slate-400">Help us grow and get paid for it.</p>
      </div>

      <div className="bg-slate-800 p-10 rounded-[2.5rem] border border-slate-700">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-indigo-400 uppercase tracking-tight">Earn 20% Lifetime</h2>
            <p className="text-slate-400">You will receive 20% commission on every claim, PTC click, and offer completed by your referrals forever.</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="text" 
              readOnly 
              value={refLink}
              className="flex-grow bg-transparent text-indigo-300 font-mono text-sm focus:outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              Copy Link
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Your Referrals</p>
              <p className="text-3xl font-bold">{user.referrals}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Total Earnings</p>
              <p className="text-3xl font-bold text-indigo-400">0.00 USDT</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Commission Rate</p>
              <p className="text-3xl font-bold">20%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold mb-6">Top Affiliates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 text-sm uppercase">
                <th className="pb-4">Rank</th>
                <th className="pb-4">User ID</th>
                <th className="pb-4">Referrals</th>
                <th className="pb-4">Earnings (USDT)</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { rank: 1, id: 'user_99x', count: 1450, earned: '450.50' },
                { rank: 2, id: 'crypto_king', count: 890, earned: '210.20' },
                { rank: 3, id: 'faucet_lord', count: 650, earned: '145.00' },
              ].map((aff) => (
                <tr key={aff.rank} className="border-b border-slate-700/50">
                  <td className="py-4 font-bold">{aff.rank}</td>
                  <td className="py-4">{aff.id}</td>
                  <td className="py-4 font-mono">{aff.count}</td>
                  <td className="py-4 font-mono text-indigo-400">{aff.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
