import { PhotoMosaic } from '../components/PhotoExplorer';
import { EditorialImage } from '../components/EditorialImage';
import React, { useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import { GalleryPreview } from '../components/GalleryPreview';
import { ApplicationModal } from '../components/ApplicationModal';
import { trackEvent } from '../lib/analytics';
export function CareersPage() {
  const {
    content,
    jobs,
    loading,
    loadError
  } = useData();
  const [department, setDepartment] = useState('all');
  const [selected, setSelected] = useState(null);
  const email = content.careersEmail;
  const mailto = title => `mailto:${email}?subject=${encodeURIComponent(`Application for ${title}`)}`;
  const active = jobs.filter(j => j.status === 'active');
  const filtered = active.filter(j => department === 'all' || j.department === department);
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">CAREERS AT NHB</span><h1>{content.careersTitle}</h1><p>{content.careersIntro}</p><div className="hero-actions"><button className="pill primary" onClick={() => document.getElementById('openings')?.scrollIntoView({
          behavior: 'smooth'
        })}>View current openings <ArrowUpRight size={16} /></button><a className="text-link" href={mailto('General Application / Talent Pool')} onClick={() => trackEvent('career_email_click')}>{email}</a></div></section>
 <section className="brief-section wrap editorial-band"><EditorialImage src={content.peoplePhoto || '/images/india-collaboration.jpg'} alt={content.peoplePhoto ? 'People at NHB' : 'AI-generated illustration of Indian engineers collaborating with international colleagues'} credit={content.peoplePhoto ? 'NHB photography' : 'AI-generated illustration'} /><div><span className="eyebrow">MAKE YOUR NEXT STEP COUNT</span><h2>A place to put your ideas to work.</h2><p>Learn by doing, share what you know and keep building your skills.</p></div></section>
 <section className="brief-section wrap"><span className="eyebrow">WHY WORK WITH US</span><h2>Room to learn. Space to grow.</h2><div className="brief-grid three">{content.evpTiles.map((tile, index) => <article className="brief-card" key={index}><span className="step-number">0{index + 1}</span><h3>{tile.title}</h3><p>{tile.description}</p></article>)}</div></section>
 <section className="brief-section wrap"><span className="eyebrow">A LIFE BEYOND WORK</span><h2>Life in the Bilimora–Navsari–Valsad belt.</h2><div className="brief-grid three">{[['Lower cost of living', 'The Bilimora–Navsari–Valsad belt offers a smaller-city setting, with a lower cost of living than major metros.'], ['A region on the rise', 'The Mumbai–Ahmedabad bullet train corridor is part of a region on the rise, connecting local communities with the wider economy.'], ['More time with family', 'Short commutes and access to good schools help make room for family life. Living near the plant means more of your day can be spent at home.']].map(([title, text]) => <article className="brief-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <PhotoMosaic title="People, ideas and practical learning." ids={['design','research','operator','teamwork','learning','people']} />
 <GalleryPreview title="Kaizen in action." kaizenOnly showEmpty />
 <section id="openings" className="brief-section wrap"><span className="eyebrow">YOUR NEXT STEP</span><h2>Current Openings</h2><div className="filter-row" role="group" aria-label="Department filter">{['all', ...new Set(active.map(j => j.department))].map(dept => <button className={department === dept ? 'selected' : ''} aria-pressed={department === dept} key={dept} onClick={() => setDepartment(dept)}>{dept === 'all' ? 'All departments' : dept}</button>)}</div>
 {loading ? <p role="status">Loading openings…</p> : loadError ? <p role="alert">Openings are unavailable right now. Please contact <a href={`mailto:${email}`}>{email}</a>.</p> : !filtered.length ? <div className="brief-empty"><h3>{active.length ? 'No openings in this department.' : 'No current openings.'}</h3><p>We’d still like to hear from you. Send a general application for future opportunities.</p><a className="text-link" href={mailto('General Application / Talent Pool')}>Join our talent pool <Mail size={16} /></a></div> : <div className="job-list">{filtered.map(job => <article className="brief-card" key={job.id}><span className="eyebrow">{job.department}</span><h3>{job.title}</h3><dl className="job-meta"><div><dt>Location</dt><dd>{job.location}</dd></div><div><dt>Experience required</dt><dd>{job.experience}</dd></div><div><dt>Employment</dt><dd>{job.type}</dd></div></dl><p>{job.shortDesc}</p>{job.responsibilities?.length > 0 && <details><summary>Role details</summary><ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul></details>}<div className="hero-actions"><a className="pill primary" href={mailto(job.title)} onClick={() => trackEvent('career_email_click')}>Apply via email <Mail size={16} /></a><button className="text-link" onClick={() => setSelected(job)}>Apply online <ArrowUpRight size={16} /></button></div></article>)}</div>}
 </section><section className="brief-section wrap career-contact"><span className="eyebrow">APPLY VIA EMAIL</span><h2>Let’s talk about your future.</h2><a href={`mailto:${email}`} className="career-email">{email}</a><p>No role listed for you? <a className="text-link" href={mailto('General Application / Talent Pool')}>General application / Join our talent pool.</a></p></section><ApplicationModal isOpen={!!selected} onClose={() => setSelected(null)} job={selected} /></div>;
}
