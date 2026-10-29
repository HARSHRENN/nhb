import React, { useId, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { editorialScenes } from '../data/editorialScenes';
import { useData } from '../context/DataContext';
import { LightboxModal } from './LightboxModal';

const lightboxItem = scene => ({id:scene.id,type:'photo',title:scene.title,imageUrl:scene.image,caption:scene.description,category:'Illustrative engineering photography',date:''});

export function PhotoExplorer({ title='A closer look at what matters.', ids=['people','machining','quality','learning'] }) {
  const {navigateTo}=useData();
  const scenes=ids.map(id=>editorialScenes.find(scene=>scene.id===id)).filter(Boolean);
  const [index,setIndex]=useState(0);
  const [enlarged,setEnlarged]=useState(false);
  const uid=useId();const current=scenes[index]||scenes[0];
  const change=next=>setIndex((next+scenes.length)%scenes.length);
  return <section className="brief-section wrap photo-explorer">
    <div className="section-heading"><div><span className="eyebrow">EXPLORE THE DETAILS</span><h2>{title}</h2></div><span className="photo-section-note">Select a story. Take a closer look.</span></div>
    <div className="photo-story-tabs" role="tablist" aria-label="Engineering stories">{scenes.map((scene,i)=><button key={scene.id} id={`${uid}-tab-${i}`} role="tab" aria-selected={index===i} aria-controls={`${uid}-panel`} tabIndex={index===i?0:-1} onClick={()=>change(i)} onKeyDown={event=>{let next;if(event.key==='ArrowRight')next=(i+1)%scenes.length;else if(event.key==='ArrowLeft')next=(i-1+scenes.length)%scenes.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=scenes.length-1;else return;event.preventDefault();change(next);document.getElementById(`${uid}-tab-${next}`)?.focus();}}>{scene.short}</button>)}</div>
    <div className="photo-feature" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${index}`}>
      <button className="photo-feature-image" onClick={()=>setEnlarged(true)} aria-label={`Enlarge ${current.title}`}><img key={current.image} src={current.image} alt={current.alt} width="1400" height="934" loading="lazy"/><span className="photo-enlarge"><Maximize2 size={18}/></span></button>
      <div className="photo-feature-copy"><span className="photo-index">0{index+1} / 0{scenes.length}</span><h3>{current.title}</h3><p>{current.description}</p><button className="text-link" onClick={()=>navigateTo(current.page)}>{current.action} <ArrowUpRight size={17}/></button><div className="photo-navigation"><button onClick={()=>change(index-1)} aria-label="Previous story"><ChevronLeft size={20}/></button><button onClick={()=>change(index+1)} aria-label="Next story"><ChevronRight size={20}/></button></div></div>
    </div>
    <div className="photo-thumbnail-grid">{scenes.map((scene,i)=><button key={scene.id} className={index===i?'is-selected':''} onClick={()=>change(i)} aria-label={`Show ${scene.title}`} aria-pressed={index===i}><img src={scene.image} alt="" width="400" height="270" loading="lazy"/><span>{scene.short}<ArrowUpRight size={15}/></span></button>)}</div>
    <p className="illustration-note">Engineering imagery shown for illustration.</p>
    <LightboxModal isOpen={enlarged} item={lightboxItem(current)} onClose={()=>setEnlarged(false)} hasPrev={index>0} hasNext={index<scenes.length-1} onPrev={()=>change(index-1)} onNext={()=>change(index+1)}/>
  </section>;
}

export function PhotoMosaic({ids=['machining','quality','learning'],title='The work, up close.'}) {
  const scenes=ids.map(id=>editorialScenes.find(scene=>scene.id===id)).filter(Boolean);
  const [selected,setSelected]=useState(-1);
  return <section className="brief-section wrap"><span className="eyebrow">AN ENGINEERING PERSPECTIVE</span><h2>{title}</h2><div className="photo-mosaic">{scenes.map((scene,i)=><button key={scene.id} onClick={()=>setSelected(i)} aria-label={`Enlarge ${scene.title}`}><img src={scene.image} alt={scene.alt} width="800" height="600" loading="lazy"/><span>{scene.title}<Maximize2 size={17}/></span></button>)}</div><p className="illustration-note">Illustrative engineering photography. Select any image to enlarge.</p><LightboxModal isOpen={selected>=0} item={selected>=0?lightboxItem(scenes[selected]):null} onClose={()=>setSelected(-1)} hasPrev={selected>0} hasNext={selected>=0&&selected<scenes.length-1} onPrev={()=>setSelected(selected-1)} onNext={()=>setSelected(selected+1)}/></section>;
}
