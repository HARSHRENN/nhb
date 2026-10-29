import { PhotoMosaic } from '../components/PhotoExplorer';
import { EditorialImage } from '../components/EditorialImage';
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { GalleryPreview } from '../components/GalleryPreview';
import { LightboxModal } from '../components/LightboxModal';

const principles = [
  ['Kaizen as a way of working', 'Kaizen is part of everyday work, not a programme. We look closely at how work happens, make improvements and keep learning from the results.'],
  ['Autonomy through lean', 'People on the machine have the authority to change how their own job runs. Their experience and ideas help shape better ways of working.'],
  ['Mentorship from lean experts', 'Our people learn from lean experts with experience in world-class manufacturing firms, developing practical problem-solving skills through mentorship.'],
  ['Learning built into the job', 'Kaizen events, skill development and career growth planning make learning part of the job, with opportunities to put new skills into practice.']
];

export function LeanCulturePage() {
  const { content, gallery, navigateTo, loading, loadError } = useData();
  const [selected, setSelected] = useState(null);
  const stories = gallery.filter(item => item.problem && item.solution && item.result).slice(0, 3);

  return <div className="brief-page">
    <section className="brief-page-heading wrap">
      <span className="eyebrow">LEAN & LEARNING CULTURE</span>
      <h1>Lean culture. Lifelong learning.<br />Continuous improvement.</h1>
      <p>We are a lean culture, lifelong learners, and we improve continuously through the Kaizen philosophy.</p>
      <p>{content.leanIntro}</p>
    </section>

    <section className="brief-section wrap editorial-band"><EditorialImage src={content.plantPhoto || '/images/manufacturing-process.jpg'} alt={content.plantPhoto ? 'NHB plant' : 'Illustrative stock photograph of a manufacturing process line'} credit={content.plantPhoto ? 'NHB photography' : 'Illustrative stock photo · Homa Appliances / Unsplash'} /><div><span className="eyebrow">SMALL IMPROVEMENTS ADD UP</span><h2>Look closely.<br/>Make it better.</h2><p>Every workstation is a place to learn. Every person brings a perspective worth listening to.</p></div></section>
    <section className="brief-section wrap" aria-labelledby="lean-principles">
      <span className="eyebrow">HOW WE WORK</span>
      <h2 id="lean-principles">Improvement belongs to everyone.</h2>
      <div className="brief-grid two">
        {principles.map(([title, text]) => <article className="brief-card" key={title}>
          <h3>{title}</h3><p>{text}</p>
        </article>)}
      </div>
    </section>

    <PhotoMosaic title="Learning happens where the work happens." ids={['design','teamwork','operator','hands-on','research','workshop']} />
    <section className="brief-section wrap" aria-labelledby="kaizen-stories">
      <span className="eyebrow">KAIZEN IN PRACTICE</span>
      <h2 id="kaizen-stories">Before, after, and what we learned.</h2>
      <p>Photos and improvement stories from our people and plant.</p>
      {loading ? <p role="status">Loading improvement stories…</p> : loadError ?
        <p role="alert">Improvement stories are unavailable right now. Please try again later.</p> : stories.length ?
        <div className="job-list">{stories.map(item => <article className="brief-card kaizen-story" key={item.id}>
          <span className="eyebrow">{item.category} · {item.date}</span>
          <h3>{item.title}</h3>
          {(item.beforeImageUrl || item.afterImageUrl) ?
            <div className="before-after">{[['Before', item.beforeImageUrl], ['After', item.afterImageUrl]].map(([label, url]) => url &&
              <figure key={label}><button className="story-photo" onClick={() => setSelected(item)} aria-label={`Enlarge ${label.toLowerCase()} photo: ${item.title}`}>
                <img src={url} alt={`${label}: ${item.title}`} loading="lazy" decoding="async" />
              </button><figcaption>{label}</figcaption></figure>)}</div> :
            item.type === 'photo' && item.imageUrl && <button className="story-photo" onClick={() => setSelected(item)} aria-label={`Enlarge photo: ${item.title}`}>
              <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" />
            </button>}
          {item.caption && <p>{item.caption}</p>}
          <dl className="story-details">{[['Before', item.problem], ['What changed', item.solution], ['After', item.result]].map(([label, text]) =>
            <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
          <button className="text-link" onClick={() => setSelected(item)}>View story & media <ArrowUpRight size={16} /></button>
        </article>)}</div> :
        <div className="brief-empty"><h3>Improvement stories, coming soon.</h3><p>We’re preparing real Kaizen photos and before/after stories to share here.</p></div>}
    </section>

    <GalleryPreview title="A closer look at our culture." featuredOnly showEmpty />
    <section className="brief-section wrap"><button className="text-link" onClick={() => navigateTo('careers')}>Build Your Career with Us <ArrowUpRight size={17} /></button></section>
    <LightboxModal isOpen={!!selected} item={selected} onClose={() => setSelected(null)} />
  </div>;
}
