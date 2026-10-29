import React from 'react';
import { ArrowUpRight, Lightbulb, Wrench, ScanLine, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
const stages = [
  { title: 'Notice', text: 'Look closely at the work.', icon: Lightbulb },
  { title: 'Improve', text: 'Put an idea into practice.', icon: Wrench },
  { title: 'Learn', text: 'Understand what changed.', icon: ScanLine },
  { title: 'Repeat', text: 'Make the next step better.', icon: TrendingUp },
];
export function LearningLoop() {
  const { navigateTo } = useData();
  return <section className="brief-section wrap learning-loop">
    <div className="section-heading"><div><span className="eyebrow">THE KAIZEN MINDSET</span><h2>Progress is a daily practice.</h2></div><button className="text-link" onClick={() => navigateTo('lean-culture')}>Discover our culture <ArrowUpRight size={17} /></button></div>
    <div className="learning-track"><svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path className="track-base" d="M0 30 H1000"/><path className="track-flow" d="M0 30 H1000"/></svg>
      {stages.map(({ title, text, icon: Icon }, index) => <article className="learning-stage" key={title}><span className="stage-icon"><Icon size={22} strokeWidth={1.5} /></span><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
    </div>
  </section>;
}
