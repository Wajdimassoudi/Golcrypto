
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { generateLiveAds } from '../services/ai';
import { MobileBanner320x100 } from '../components/AdBanners';

interface Props {
  user: User | null;
}

const Home: React.FC<Props> = ({ user }) => {
  const [liveAds, setLiveAds] = useState<any[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      try {
        const ads = await generateLiveAds();
        setLiveAds(ads);
      } catch (e) {
        console.error("Failed to fetch AI ads", e);
      } finally {
        setLoadingAds(false);
      }
    }
    fetchAds();
    const interval = setInterval(fetchAds, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-24 relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 rounded-[3rem] border border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-none tracking-tighter">
          EARN <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">USDT</span> <br /> 
          ON AUTOPILOT
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
          The world's most advanced AI-powered crypto faucet. Connect your FaucetPay account and start earning instantly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!user ? (
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl shadow-indigo-500/20 hover:scale-105">
              Get Started Now
            </Link>
          ) : (
            <Link to="/dashboard" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl shadow-indigo-500/20 hover:scale-105">
              Open Dashboard
            </Link>
          )}
          <a href="#feed" className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all border border-slate-700">
            Live Feed
          </a>
        </div>
      </section>

      {/* Primary Ad Banner */}
      <MobileBanner320x100 />

      {/* Live Ad Feed Section */}
      <section id="feed" className="bg-slate-800/50 p-10 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Global AI Ad Feed</h2>
            <p className="text-slate-500 text-sm">Real-time campaigns generated and verified by Gemini AI</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Live Updates</span>
          </div>
        </div>

        {loadingAds ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAds.map((ad, i) => (
              <div key={i} className="group bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all hover:translate-y-[-4px]">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono text-indigo-400 font-bold">Campaign #{Math.floor(Math.random() * 9999)}</span>
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[10px] font-black">AI VERIFIED</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">{ad.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2">{ad.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                   <span className="text-indigo-400 font-bold font-mono text-sm">+{ad.reward || '0.0005'} USDT</span>
                   <Link to="/ptc" className="text-xs bg-slate-800 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors font-bold">View Ad</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "⚡", title: "Instant Payouts", desc: "No manual verification for withdrawals under 5 USDT. Get your crypto immediately." },
          { icon: "🤖", title: "AI Moderation", desc: "Our system uses Google AI to filter out scam ads and prioritize high-paying offers." },
          { icon: "💎", title: "Premium Tiers", desc: "Active users unlock higher faucet rewards and exclusive PTC campaigns automatically." },
        ].map((f, i) => (
          <div key={i} className="p-8 bg-slate-800 border border-slate-700 rounded-3xl hover:bg-slate-700/50 transition-all">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
