import { ThemeIcon } from './ThemeIcon';
import React, { useId, useState, useRef, useEffect } from 'react';
import { Users, TrendingUp, History, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { AnimatedStat } from './SiteMotion';

const stories = [
  {icon:'people',eyebrow:'THE PEOPLE BEHIND THE PRECISION',title:'Built by people. Better through learning.',text:'Meet the culture behind our work: shared ideas, practical mentorship and the opportunity to keep growing.',page:'careers',action:'Explore life at NHB'},
  {icon:'growth',eyebrow:'ENGINEERING WITH PURPOSE',title:'Experience that moves work forward.',text:'Explore our product range and talk to our team about the requirements of your next application.',page:'products',action:'Explore our capabilities'},
  {icon:'heritage',eyebrow:'A HERITAGE OF IMPROVEMENT',title:'Decades of experience. A learning mindset.',text:'Discover our company story and the continuous improvement philosophy that shapes how we work.',page:'about',action:'Discover our story'},
];
export function CompanyHighlights() {
  const {content,navigateTo}=useData();
  const [selected,setSelected]=useState(0);
  const id=useId();
  const grid=useRef(null);
  const frame=useRef(null);
  useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
  const illuminate=event=>{
    const card=event.currentTarget, rect=card.getBoundingClientRect();
    card.style.setProperty('--glass-x',`${Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100))}%`);
    card.style.setProperty('--glass-y',`${Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100))}%`);
  };
  const followSwipe=()=>{
    cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(()=>{
      const list=grid.current;
      if(!list || list.scrollWidth<=list.clientWidth+1)return;
      const cards=[...list.children];
      const nearest=cards.reduce((best,card,index)=>Math.abs(card.offsetLeft-list.offsetLeft-list.scrollLeft)<Math.abs(cards[best].offsetLeft-list.offsetLeft-list.scrollLeft)?index:best,0);
      setSelected(nearest);
      cards.forEach(card=>{
        const rect=card.getBoundingClientRect(), bounds=list.getBoundingClientRect();
        card.style.setProperty('--glass-x',`${Math.max(0,Math.min(100,(bounds.left+bounds.width/2-rect.left)/rect.width*100))}%`);
        card.style.setProperty('--glass-y','45%');
      });
    });
  };
  const active=selected<content.companyStats.length?selected:0;
  const story=stories[active]||stories[0];
  return <section className="impact-section wrap" aria-labelledby={`${id}-title`}>
    <div className="impact-heading"><div><span className="eyebrow">NHB AT A GLANCE</span><h2 id={`${id}-title`}>The scale of our story.</h2></div><p><span className="impact-desktop-hint">Select a number. Discover what’s behind it.</span><span className="impact-mobile-hint">Swipe the cards. Tap a number to explore.</span></p></div>
    <div ref={grid} onScroll={followSwipe} className="impact-grid" role="tablist" aria-label="Company highlights">
      {content.companyStats.map((stat,index)=>{
        const Icon=(stories[index]||stories[0]).icon;
        return <button key={`${stat.label}-${index}`} className="impact-card" onPointerMove={illuminate} onPointerDown={illuminate} role="tab" aria-selected={active===index} aria-controls={`${id}-panel`} id={`${id}-tab-${index}`} tabIndex={active===index?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>{
          let next;
          if(event.key==='ArrowRight')next=(index+1)%content.companyStats.length;
          else if(event.key==='ArrowLeft')next=(index-1+content.companyStats.length)%content.companyStats.length;
          else if(event.key==='Home')next=0;
          else if(event.key==='End')next=content.companyStats.length-1;
          else return;
          event.preventDefault();setSelected(next);document.getElementById(`${id}-tab-${next}`)?.focus();
        }}>
          <span className="impact-card-top"><span className="impact-icon"><ThemeIcon name={Icon} size={46}/></span><ArrowUpRight className="impact-arrow" size={22}/></span>
          <span className="impact-number"><AnimatedStat value={stat.value} label={stat.label}/></span>
          <span className="impact-label">{stat.label}</span>
          <span className="impact-card-bottom">Explore the story <span aria-hidden="true">↗</span></span>
        </button>;
      })}
    </div>
    {content.companyStats.length>0&&<div className="impact-story" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
      <div key={active} className="impact-story-copy"><span className="eyebrow">{story.eyebrow}</span><h3>{story.title}</h3><p>{story.text}</p></div>
      <button className="pill impact-action" onClick={()=>navigateTo(story.page)}>{story.action}<ArrowUpRight size={17}/></button>
    </div>}
  </section>;
}
