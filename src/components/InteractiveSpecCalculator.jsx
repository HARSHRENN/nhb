import React, { useState } from 'react';
import { Cpu, ShieldCheck, ArrowRight, Gauge, Sparkles, CheckCircle2, FileCheck2, Info } from 'lucide-react';

export const InteractiveSpecCalculator = ({ onConfigureQuote }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('chrome');
  const [selectedGrade, setSelectedGrade] = useState('G3');
  const [diameter, setDiameter] = useState('8.0');

  const materials = {
    chrome: {
      name: 'Chrome Steel (AISI 52100 / 100Cr6)',
      short: 'Chrome 52100',
      density: '7.83 g/cm³',
      hardness: '60 - 66 HRC',
      tempLimit: '150°C (Up to 300°C stabilized)',
      bestFor: 'Automotive bearings, EV transmission, machine tool spindles',
      description: 'The global standard for high-fatigue rolling resistance and uniform martensitic microstructure.'
    },
    ceramic: {
      name: 'Silicon Nitride Ceramic (Si3N4)',
      short: 'Ceramic Si3N4',
      density: '3.20 g/cm³ (60% lighter than steel)',
      hardness: '75 - 80 HRC (1500+ HV)',
      tempLimit: '1000°C',
      bestFor: 'EV high-speed traction motors, aerospace turbines, non-conductive bearings',
      description: 'Electrically non-conductive (prevents micro-arcing in EV motors), virtually immune to centrifugal expansion.'
    },
    stainless: {
      name: 'Martensitic Stainless Steel (AISI 440C)',
      short: 'Stainless 440C',
      density: '7.75 g/cm³',
      hardness: '58 - 62 HRC',
      tempLimit: '250°C',
      bestFor: 'Marine flow valves, medical precision instruments, food processing',
      description: 'Extreme corrosion and oxidation resistance combined with high mechanical tensile durability.'
    },
    carbon: {
      name: 'Case-Hardened Carbon Steel (AISI 1010/1018)',
      short: 'Carbon Steel',
      density: '7.85 g/cm³',
      hardness: '55 - 60 HRC (Case)',
      tempLimit: '120°C',
      bestFor: 'Automotive casters, steering columns, industrial conveyor rollers',
      description: 'High surface toughness with shock-absorbing ductile core for resilient mechanical assemblies.'
    }
  };

  const grades = {
    G3: {
      label: 'Grade 3',
      sphericity: '< 0.08 µm',
      roughness: 'Ra < 0.010 µm',
      diameterTolerance: '± 0.08 µm',
      applicationClass: 'Aerospace Turbines & High-Speed EV Spindles',
      recommendedFor: 'Sub-micron OEM bearings for SKF and Schaeffler top tiers'
    },
    G5: {
      label: 'Grade 5',
      sphericity: '< 0.13 µm',
      roughness: 'Ra < 0.014 µm',
      diameterTolerance: '± 0.13 µm',
      applicationClass: 'Precision Electric Motor Bearings',
      recommendedFor: 'Automotive wheel hubs and precision robotics'
    },
    G10: {
      label: 'Grade 10',
      sphericity: '< 0.25 µm',
      roughness: 'Ra < 0.020 µm',
      diameterTolerance: '± 0.25 µm',
      applicationClass: 'General Industrial & Automotive Bearings',
      recommendedFor: 'Electric tools, gearboxes, and motorcycle assemblies'
    },
    G20: {
      label: 'Grade 20 / 28',
      sphericity: '< 0.50 µm',
      roughness: 'Ra < 0.032 µm',
      diameterTolerance: '± 0.50 µm',
      applicationClass: 'Commercial Bearings & Linear Ball Bushings',
      recommendedFor: 'Heavy machinery, steering mechanisms, and ball transfers'
    }
  };

  const currentMat = materials[selectedMaterial];
  const currentGrd = grades[selectedGrade];

  const handleQuoteClick = () => {
    if (onConfigureQuote) {
      onConfigureQuote({
        material: currentMat.name,
        precisionGrade: `${currentGrd.label} (${currentGrd.sphericity} sphericity)`,
        ballDiameter: `${diameter} mm`,
        application: currentGrd.applicationClass
      });
    }
  };

  return (
    <div className="bg-slate-900/90 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-mono font-bold mb-2 border border-slate-700">
            <Gauge className="w-3.5 h-3.5" />
            <span>Interactive Engineering Spec Configurator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Configure Your Precision Ball Specifications
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Test materials, precision grade tolerances, and diameter parameters in real time.
          </p>
        </div>

        <button
          onClick={handleQuoteClick}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 shrink-0"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Request Technical RFQ for this Spec</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Material selector chips */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              1. Select Ball Material Alloy
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(materials).map((key) => {
                const mat = materials[key];
                const active = selectedMaterial === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMaterial(key)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-xs leading-tight font-bold">{mat.short}</span>
                    <span className={`block text-[10px] mt-1 font-mono ${active ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                      {mat.density.split(' ')[0]} g/cm³
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 italic pt-1">{currentMat.description}</p>
          </div>

          {/* Precision Grade Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                2. Select Precision Grade (ISO 3290-1 / DIN 5401)
              </label>
              <span className="text-[11px] text-amber-400 font-mono font-semibold">Sub-Micron Tolerances</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(grades).map((key) => {
                const grd = grades[key];
                const active = selectedGrade === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedGrade(key)}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-sm font-extrabold">{grd.label}</span>
                    <span className="block text-[10px] opacity-80 mt-0.5 font-mono">{grd.sphericity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Diameter Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                3. Diameter (mm / inches)
              </label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                Ø {diameter} mm ({(parseFloat(diameter || 0) / 25.4).toFixed(3)} in)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 font-mono">
              {['1.0', '3.175 (1/8")', '5.0', '8.0', '12.7 (1/2")', '19.05 (3/4")', '25.4 (1")', '50.8 (2")'].map((d) => {
                const numeric = d.split(' ')[0];
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiameter(numeric)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      diameter === numeric
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Calculated Specification Card */}
        <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between shadow-2xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400">METROLOGY OUTPUT</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                100% EDDY CURRENT CLEAR
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono block">Configured Specification:</span>
              <h4 className="text-lg font-bold text-white mt-0.5 leading-snug">
                {currentMat.short} · {currentGrd.label} · Ø {diameter} mm
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1 font-mono">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Max Sphericity Dev</span>
                <span className="text-sm font-black text-amber-400">{currentGrd.sphericity}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Surface Roughness</span>
                <span className="text-sm font-black text-amber-400">{currentGrd.roughness}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Hardness Rating</span>
                <span className="text-sm font-black text-white">{currentMat.hardness}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Max Temperature</span>
                <span className="text-sm font-black text-white">{currentMat.tempLimit.split(' ')[0]}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Prime Applications:</span>
              <p className="text-slate-300 text-xs leading-relaxed">{currentGrd.applicationClass}</p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={handleQuoteClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-black hover:from-amber-400 hover:to-amber-300 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
            >
              <span>Get Instant Quotation with Drawings</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <span className="text-[10px] text-slate-500 text-center block font-mono">
              Direct technical review by Amalsad engineering team · 24h turnaround
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
