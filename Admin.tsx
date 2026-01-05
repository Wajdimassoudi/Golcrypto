
import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock protection
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6 text-center">
          <h1 className="text-2xl font-bold">Admin Panel Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white focus:outline-none"
          />
          <button className="w-full bg-indigo-600 py-4 rounded-xl font-bold">Enter Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <p className="text-slate-500 uppercase text-xs font-bold">Site Revenue (10%)</p>
          <p className="text-3xl font-bold text-green-400">452.12 USDT</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <p className="text-slate-500 uppercase text-xs font-bold">Pending Payouts</p>
          <p className="text-3xl font-bold text-orange-400">12.50 USDT</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <p className="text-slate-500 uppercase text-xs font-bold">New Users (24h)</p>
          <p className="text-3xl font-bold text-blue-400">+124</p>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
        <h2 className="text-xl font-bold mb-6">Manage Advertisements</h2>
        <div className="space-y-4">
          <button className="bg-indigo-600 px-6 py-2 rounded-lg font-bold">Add New Ad</button>
          <div className="grid grid-cols-1 gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex justify-between items-center bg-slate-900 p-4 rounded-xl">
                 <div>
                   <p className="font-bold">Ad Campaign #{i}</p>
                   <p className="text-xs text-slate-500">Target: All Users | Budget: 100 USDT</p>
                 </div>
                 <div className="space-x-2">
                   <button className="text-blue-400 text-sm">Edit</button>
                   <button className="text-red-400 text-sm">Delete</button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
        <h2 className="text-xl font-bold mb-6">FaucetPay API Settings</h2>
        <div className="grid grid-cols-1 gap-4 max-w-lg">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">Merchant API Key</label>
            <input type="password" value="************************" readOnly className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-500" />
          </div>
          <button className="bg-slate-700 py-3 rounded-xl font-bold text-sm">Update API Config</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
