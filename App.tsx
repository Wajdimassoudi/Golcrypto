
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PTC from './pages/PTC';
import Faucet from './pages/Faucet';
import Offers from './pages/Offers';
import Referrals from './pages/Referrals';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Home from './pages/Home';
import { User } from './types';
import { getUser } from './services/storage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gaf_user');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/ptc" 
              element={user ? <PTC user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/faucet" 
              element={user ? <Faucet user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/offers" 
              element={user ? <Offers user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/referrals" 
              element={user ? <Referrals user={user} /> : <Navigate to="/login" />} 
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 py-6 border-t border-slate-700 text-center text-slate-400">
          <p>© 2024 GlobalAdsFaucet - Powering Your USDT Earnings</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
