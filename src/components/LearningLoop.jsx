import { ThemeIcon } from './ThemeIcon';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
const stages = [
  { title: 'Notice', text: 'Make the work visible.', icon: 'kanban' },
  { title: 'Improve', text: 'Try a small Kaizen improvement.', icon: 'kaizen' },
  { title: 'Learn', text: 'Understand what changed.', icon: 'learning' },
  { title: 'Repeat', text: 'Make the next step better.', icon: 'growth' },
];
export function LearningLoop() {
  const { navigateTo } = useData();
  return <section className="brief-section wrap learning-loop">
    <div className="section-heading"><div><span className="eyebrow">THE KAIZEN MINDSET</span><h2>Progress is a daily practice.</h2></div><button className="text-link" onClick={() => navigateTo('lean-culture')}>Discover our culture <ArrowUpRight size={17} /></button></div>
    <div className="learning-track"><svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path className="track-base" d="M0 30 H1000"/><path className="track-flow" d="M0 30 H1000"/></svg>
      {stages.map(({ title, text, icon: Icon }, index) => <article className="learning-stage" key={title}><span className="stage-icon"><ThemeIcon name={Icon} size={46} /></span><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
    </div>
  </section>;
}
