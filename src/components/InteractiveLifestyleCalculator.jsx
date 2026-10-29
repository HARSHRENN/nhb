import React, { useState } from 'react';
import { Home, Clock, Heart, Train, Wallet, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export const InteractiveLifestyleCalculator = () => {
  const [selectedCity, setSelectedCity] = useState('mumbai');

  const cityData = {
    mumbai: {
      name: 'Mumbai',
      avgCommute: '90 - 110 Mins / day',
      rent2BHK: '₹55,000 - ₹85,000',
      airQuality: 'Moderate to Severe (AQI 180+)',
      stressLevel: 'High rush hours & local train crowds'
    },
    pune: {
      name: 'Pune',
      avgCommute: '60 - 80 Mins / day',
      rent2BHK: '₹28,000 - ₹45,000',
      airQuality: 'Moderate (AQI 140+)',
      stressLevel: 'Heavy traffic bottlenecks & high living costs'
    },
    bengaluru: {
      name: 'Bengaluru',
      avgCommute: '90 - 120 Mins / day',
      rent2BHK: '₹40,000 - ₹65,000',
      airQuality: 'Moderate (AQI 120+)',
      stressLevel: 'Peak ring road congestion & high school fees'
    }
  };

  const current = cityData[selectedCity];

  return (
    <div className="bg-gradient-to-br from-[#0a192f] via-[#0f2b5c] to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Quality-of-Life Comparison</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Life in the Bilimora–Navsari–Valsad Belt vs Metros
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            See how much time, money, and peace of mind you gain by working at NHB.
          </p>
        </div>

        {/* City selector pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Compare with:</span>
          {Object.keys(cityData).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCity(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === key
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cityData[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Selected Metro City Card */}
        <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-7 border border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <span className="text-xs font-bold uppercase text-slate-400">Typical Life in {current.name}</span>
            <span className="text-[11px] font-semibold text-red-400 bg-red-950/40 px-2.5 py-0.5 rounded-full border border-red-900/50">
              High Friction
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                Daily Commute:
              </span>
              <span className="font-bold text-red-300">{current.avgCommute}</span>
            </div>

            <div className="flex items-start justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-red-400" />
                Typical 2BHK Rent:
              </span>
              <span className="font-bold text-red-300">{current.rent2BHK} / mo</span>
            </div>

            <div className="flex items-start justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                Air Quality & Lifestyle:
              </span>
              <span className="font-medium text-slate-300 text-right">{current.airQuality}</span>
            </div>
          </div>
        </div>

        {/* NHB Navsari Belt Advantage Card */}
        <div className="bg-gradient-to-br from-blue-950/80 to-slate-900 rounded-3xl p-6 sm:p-7 border border-blue-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
            <span className="text-xs font-bold uppercase text-amber-400">Life at NHB (Amalsad / Navsari Belt)</span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              Maximum Balance
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between py-2 border-b border-blue-900/40">
              <span className="text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Daily Commute:
              </span>
              <span className="font-bold text-emerald-400">10 - 15 Mins (Zero traffic stress)</span>
            </div>

            <div className="flex items-start justify-between py-2 border-b border-blue-900/40">
              <span className="text-slate-300 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                Typical 2BHK Rent:
              </span>
              <span className="font-bold text-emerald-400">₹8,000 - ₹14,000 (3x lower)</span>
            </div>

            <div className="flex items-start justify-between py-2 border-b border-blue-900/40">
              <span className="text-slate-300 flex items-center gap-2">
                <Train className="w-4 h-4 text-emerald-400" />
                High-Speed Corridor:
              </span>
              <span className="font-bold text-white text-right">Bullet Train Station within 20 mins</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-900/40 border border-blue-700/40 text-xs text-amber-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Gain ~25+ hours every month back for your health, children, and hobbies.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

