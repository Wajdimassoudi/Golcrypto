
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User } from '../types';

interface Props {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ user, onLogout }) => {
  const activeClass = "text-indigo-400 border-b-2 border-indigo-400";
  const linkClass = "hover:text-indigo-400 px-3 py-2 transition-colors";

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold text-indigo-500 flex items-center gap-2">
          <span className="bg-indigo-600 text-white p-1 rounded">GA</span>
          GlobalAdsFaucet
        </Link>

        <div className="hidden md:flex space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Home</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Dashboard</NavLink>
              <NavLink to="/ptc" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>PTC</NavLink>
              <NavLink to="/faucet" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Faucet</NavLink>
              <NavLink to="/offers" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Offers</NavLink>
              <NavLink to="/referrals" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Referrals</NavLink>
            </>
          )}
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-slate-700 px-3 py-1 rounded-full text-indigo-300 font-mono">
                {user.balance.toFixed(6)} USDT
              </span>
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Earning
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
