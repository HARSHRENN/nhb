import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FileCheck2, Briefcase, Phone, MessageSquare, X, ChevronUp } from 'lucide-react';
import { QuoteRequestModal } from './QuoteRequestModal';

export const FloatingActionBar = () => {
  const { navigateTo } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <aside aria-label="Quick action bar" className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        {/* Expanded Quick Options */}
        {isOpen && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-slate-200/80 mb-2 flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200 text-xs font-semibold text-slate-800 min-w-[220px]">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="p-2.5 rounded-xl hover:bg-amber-50 text-slate-900 flex items-center gap-2.5 transition-colors text-left font-bold"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <span>Attach Drawings & Get RFQ</span>
                <span className="block text-[10px] text-slate-500 font-normal">24h technical turnaround</span>
              </div>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo('careers');
              }}
              className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-900 flex items-center gap-2.5 transition-colors text-left font-bold"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span>Explore Careers & Dojo</span>
                <span className="block text-[10px] text-slate-500 font-normal">We're hiring technicians & QA</span>
              </div>
            </button>

            <a
              href="mailto:careers@nhbball.in"
              className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 transition-colors text-left font-medium"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span>Direct HR Email</span>
                <span className="block text-[10px] text-slate-500 font-normal">careers@nhbball.in</span>
              </div>
            </a>
          </div>
        )}

        {/* Main Floating Trigger Pill */}
        <div className="flex items-center gap-2 shadow-2xl rounded-full p-1 bg-[#0a192f] border border-slate-700">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md group"
          >
            <FileCheck2 className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Request a Quote (Attach Drawing)</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle quick actions"
            className="p-2 text-slate-300 hover:text-white rounded-full transition-colors"
          >
            {isOpen ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

