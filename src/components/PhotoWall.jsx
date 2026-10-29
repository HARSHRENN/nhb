import React, {useState, useEffect} from 'react';
import {Maximize2, ArrowDown} from 'lucide-react';
import {editorialScenes} from '../data/editorialScenes';
import {LightboxModal} from './LightboxModal';
const groups={All:null,People:['people','learning','teamwork','design','research','operator'],Engineering:['machining','workshop','hands-on','automation','robotics','metalwork'],Details:['quality','tools','craft','process']};
const itemFor=scene=>scene?{id:scene.id,type:'photo',title:scene.title,imageUrl:scene.image,caption:scene.description,category:'Engineering perspectives',date:''}:null;
export function PhotoWall({title='Explore the world of engineering.'}) {
 const [group,setGroup]=useState('All');const [limit,setLimit]=useState(8);const [selected,setSelected]=useState(null);
 const filtered=editorialScenes.filter(scene=>!groups[group]||groups[group].includes(scene.id));
 const current=filtered.findIndex(scene=>scene.id===selected);
 return <section className="brief-section wrap photo-wall-section"><div className="section-heading"><div><span className="eyebrow">PEOPLE. IDEAS. ENGINEERING.</span><h2>{title}</h2></div><p className="photo-section-note">Select a category or open a photo.</p></div><div className="filter-row" role="group" aria-label="Photo collection categories">{Object.keys(groups).map(label=><button key={label} className={group===label?'selected':''} aria-pressed={group===label} onClick={()=>{setGroup(label);setLimit(8);setSelected(null);}}>{label}</button>)}</div><p className="photo-wall-count" role="status" aria-live="polite">{filtered.length} perspectives to explore</p><div className="photo-wall">{filtered.slice(0,limit).map((scene,index)=><button key={scene.id} onClick={()=>setSelected(scene.id)} aria-label={`Enlarge ${scene.title}`} className={index%7===0?'photo-wall-wide':''}><img src={scene.image} alt={scene.alt} width="1200" height="800" loading="lazy" decoding="async"/><span><strong>{scene.title}</strong><Maximize2 size={19}/></span></button>)}</div>{limit<filtered.length&&<button className="pill photo-load-more" onClick={()=>setLimit(limit+8)}>Show more photos <ArrowDown size={17}/></button>}<LightboxModal isOpen={current>=0} item={itemFor(filtered[current])} onClose={()=>setSelected(null)} hasPrev={current>0} hasNext={current>=0&&current<filtered.length-1} onPrev={()=>setSelected(filtered[current-1].id)} onNext={()=>setSelected(filtered[current+1].id)}/></section>;
}
const heroScenes=['people','teamwork','quality','machining'].map(id=>editorialScenes.find(scene=>scene.id===id));
export function HeroImageGallery() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const update = () => {
      clearInterval(timer);
      if (!document.hidden && !motion.matches) {
        timer = setInterval(() => setIndex(current => (current + 1) % heroScenes.length), 2000);
      }
    };
    update();
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  return <div className="hero-image-gallery hero-auto-gallery" aria-label="Manufacturing and engineering imagery">
    {heroScenes.map((scene, imageIndex) => <img
      key={scene.id}
      className={index === imageIndex ? 'hero-auto-slide is-active' : 'hero-auto-slide'}
      src={scene.image}
      alt={scene.alt}
      aria-hidden={index !== imageIndex}
      width="1600"
      height="900"
      fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
      decoding="async"
    />)}
  </div>;
}
