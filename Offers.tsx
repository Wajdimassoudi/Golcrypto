
import React from 'react';
import { User } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const PROVIDERS = [
  { name: 'AdGem', type: 'Surveys & Tasks', rewardRange: '0.1 - 5.0 USDT', color: 'bg-red-600' },
  { name: 'CPAGrip', type: 'Mobile Apps', rewardRange: '0.05 - 2.0 USDT', color: 'bg-blue-600' },
  { name: 'TheoremReach', type: 'High Value Surveys', rewardRange: '0.2 - 10.0 USDT', color: 'bg-purple-600' },
  { name: 'TimeWall', type: 'Daily Tasks', rewardRange: '0.01 - 1.0 USDT', color: 'bg-green-600' },
];

const Offers: React.FC<Props> = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Offerwalls</h1>
        <p className="text-slate-400">Complete high-paying tasks to earn massive USDT rewards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROVIDERS.map((provider) => (
          <div key={provider.name} className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden hover:border-indigo-500 transition-all flex flex-col">
            <div className={`${provider.color} h-32 p-8 flex items-center justify-between`}>
              <h2 className="text-3xl font-black text-white italic tracking-tighter">{provider.name}</h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">Verified</span>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-indigo-400 font-bold mb-1">{provider.type}</p>
                <p className="text-slate-300 text-lg mb-4">Earnings: <span className="text-white font-mono">{provider.rewardRange}</span></p>
                <ul className="text-slate-500 text-sm space-y-2 mb-8">
                  <li>• Simple verification</li>
                  <li>• Daily updated tasks</li>
                  <li>• Instant rewards after approval</li>
                </ul>
              </div>
              <button className="w-full bg-slate-700 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold transition-all">
                Open Offerwall
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900/20 p-8 rounded-3xl border border-indigo-500/30 text-center">
        <h3 className="text-xl font-bold mb-2">Need Help?</h3>
        <p className="text-slate-400">Offerwall payments can take up to 24 hours to be credited by the providers. Please be patient.</p>
      </div>
    </div>
  );
};

export default Offers;
