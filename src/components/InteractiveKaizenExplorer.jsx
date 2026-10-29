import React, { useState } from 'react';
import { initialKaizenStories } from '../data/initialData';
import { Sliders, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export const InteractiveKaizenExplorer = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [viewMode, setViewMode] = useState('solution'); // 'problem' | 'solution'

  const activeStory = initialKaizenStories[activeStoryIdx];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Kaizen Demonstration</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            "Show, Don’t Tell": Real Before & After Case Studies
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real improvements engineered by Amalsad machine operators to eliminate variation.
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {initialKaizenStories.map((story, i) => (
            <button
              key={story.title}
              type="button"
              onClick={() => {
                setActiveStoryIdx(i);
                setViewMode('solution');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeStoryIdx === i
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Kaizen #{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Left: Problem vs Solution State Toggle */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Cell: <strong className="text-white">{activeStory.machine}</strong>
            </span>
            <span className="text-xs text-amber-400 font-medium">
              Lead: <strong className="text-white">{activeStory.lead}</strong>
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {activeStory.title}
          </h4>

          {/* Before / After View Toggle Switch */}
          <div className="p-1.5 bg-slate-800/90 rounded-2xl flex items-center max-w-sm border border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('problem')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                viewMode === 'problem'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>1. The Initial Problem</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('solution')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                viewMode === 'solution'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. The Kaizen Solution</span>
            </button>
          </div>

          {/* Interactive Card View */}
          {viewMode === 'problem' ? (
            <div className="p-6 rounded-2xl bg-red-950/30 border border-red-900/50 space-y-3 animate-fade-in">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                The Initial Shopfloor Bottleneck
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeStory.problem}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-red-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Operator noticed chronic micro-stops and flagged at morning dojo.</span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 space-y-3 animate-fade-in">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                The Frontline Innovation
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeStory.solution}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Designed & fabricated directly by the cell operator with zero bureaucracy.</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Concrete Measured Result Indicator */}
        <div className="lg:col-span-5 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700 pb-3">
            <span className="font-mono uppercase font-bold text-amber-400">AUDITED IMPACT</span>
            <span className="font-bold text-emerald-400">Verified by Plant Leadership</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 uppercase font-semibold">Measurable Outcome:</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 leading-tight">
              {activeStory.result}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Lean Principle Applied</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standardized Work (SOP) + Poka-Yoke error-proofing. Once verified, this countermeasure was replicated across all 18 parallel cells in the Amalsad plant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

