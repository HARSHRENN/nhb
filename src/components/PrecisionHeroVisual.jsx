import React, { useState } from 'react';
import { ShieldCheck, Cpu, CheckCircle2, Crosshair, ArrowRight, Activity, Gauge } from 'lucide-react';

export const PrecisionHeroVisual = ({ onOpenQuote }) => {
  const [activeAlloy, setActiveAlloy] = useState('chrome');

  const alloys = {
    chrome: {
      name: 'Chrome Steel AISI 52100',
      grade: 'Grade 3 (< 0.08 µm)',
      roughness: 'Ra 0.008 µm',
      hardness: '64 HRC',
      ballClass: 'chrome-ball',
      colorTag: 'text-sky-400',
      badge: 'SKF & Schaeffler Benchmark'
    },
    ceramic: {
      name: 'Silicon Nitride (Si3N4)',
      grade: 'Grade 3 (< 0.08 µm)',
      roughness: 'Ra 0.005 µm',
      hardness: '78 HRC (1550 HV)',
      ballClass: 'ceramic-ball',
      colorTag: 'text-amber-400',
      badge: 'High-Speed EV & Aerospace'
    },
    stainless: {
      name: 'Stainless Steel 440C',
      grade: 'Grade 10 (< 0.25 µm)',
      roughness: 'Ra 0.012 µm',
      hardness: '60 HRC',
      ballClass: 'stainless-ball',
      colorTag: 'text-emerald-400',
      badge: 'Sterile & Medical Flow Valves'
    }
  };

  const current = alloys[activeAlloy];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity" />

      {/* Main Container */}
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Top HUD Status Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">TALYROND METROLOGY SCAN</span>
          </div>
          <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            PASSED 0.0 PPM
          </span>
        </div>

        {/* 3D Ball Showcase Canvas with Technical Crosshairs */}
        <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-radial from-slate-800/40 via-slate-900 to-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden">
          {/* Circular Target Grids */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-56 h-56 rounded-full border border-dashed border-sky-400 animate-spin [animation-duration:40s]" />
            <div className="absolute w-44 h-44 rounded-full border border-sky-500" />
            <div className="absolute w-full h-[1px] bg-sky-400/40" />
            <div className="absolute h-full w-[1px] bg-sky-400/40" />
          </div>

          {/* The High-Precision Realistic Ball */}
          <div
            className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full ${current.ballClass} transition-all duration-700 transform hover:scale-105 cursor-pointer relative z-10 flex items-center justify-center group`}
          >
            {/* Subtle specular reflection animation */}
            <div className="absolute top-6 left-8 w-12 h-6 bg-white/40 rounded-full blur-[2px] transform -rotate-45 pointer-events-none" />
          </div>

          {/* Floating Telemetry Callouts */}
          <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300">
            <span className="text-slate-500 block text-[9px] uppercase">Form Sphericity</span>
            <span className="text-emerald-400 font-bold">{current.grade.split(' ')[0]} {current.grade.split(' ')[1]}</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300 text-right">
            <span className="text-slate-500 block text-[9px] uppercase">Surface Roughness</span>
            <span className="text-amber-400 font-bold">{current.roughness}</span>
          </div>

          <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300">
            <span className="text-slate-500 block text-[9px] uppercase">Core Hardness</span>
            <span className="text-white font-bold">{current.hardness}</span>
          </div>
        </div>

        {/* Interactive Material Selector Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">SELECT PRECISION ALLOY:</span>
            <span className={`font-semibold ${current.colorTag}`}>{current.badge}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'chrome', label: '100Cr6 Chrome' },
              { id: 'ceramic', label: 'Si3N4 Ceramic' },
              { id: 'stainless', label: '440C Stainless' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAlloy(tab.id)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeAlloy === tab.id
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrology Spec Strip */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">100% Automated Eddy-Current Crack Screened</span>
          </div>
          <button
            onClick={onOpenQuote}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            <span>RFQ Spec</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

