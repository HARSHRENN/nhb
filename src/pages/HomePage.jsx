import { editorialScenes, nhbImages } from '../data/editorialScenes';
import { ThemeIcon } from '../components/ThemeIcon';
import { PhotoWall, HeroImageGallery } from '../components/PhotoWall';
import { PhotoExplorer } from '../components/PhotoExplorer';
import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, Play, Leaf, Users, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';
import { CompanyHighlights } from '../components/CompanyHighlights';
import { EditorialImage } from '../components/EditorialImage';
import { LearningLoop } from '../components/LearningLoop';
import { VideoModal } from '../components/VideoModal';
import { playableVideoUrl, videoThumbnail } from '../lib/media';
import { siteVideos } from '../data/siteVideos';
export const HomePage = () => {
  const {
    navigateTo,
    content
  } = useData();
  const [selectedFilm, setSelectedFilm] = useState(null);
  const shortFilm = playableVideoUrl(content.corporateVideoUrl) ? {
    videoUrl: content.corporateVideoUrl,
    title: content.corporateVideoTitle,
    thumbnailUrl: content.corporateVideoThumbnail || videoThumbnail(content.corporateVideoUrl) || siteVideos[0].thumbnailUrl
  } : siteVideos[0];
  const fullFilm = siteVideos[1];
  return <div className="glass-home">
    <section className="home-hero wrap">
      <div className="hero-copy"><span className="eyebrow"><span className="status-dot" /> ENGINEERED IN INDIA. TRUSTED WORLDWIDE.</span>
        <h1 className="brief-hero-title">{content.heroTitle}</h1>
        <p>{content.heroDescription}</p>
        <div className="hero-actions"><button className="pill primary" onClick={() => navigateTo('products')}>Explore Products <ArrowUpRight size={17} /></button><button className="text-link" onClick={() => navigateTo('careers')}>Build Your Career with Us <ArrowRight size={16} /></button></div>
        <div className="hero-cert"><ShieldCheck size={16} /> IATF 16949 <span>·</span> Amalsad, Gujarat</div>
      </div>
      <div className="hero-editorial">
        <HeroImageGallery />
      </div>
    </section>
    <CompanyHighlights />
    <section className="corporate-film wrap brief-section"><div><span className="eyebrow">OUR PEOPLE. OUR PLANT.</span><h2>NHB Corporate Video</h2><p>{content.corporateVideoDescription}</p><button className="text-link" onClick={() => setSelectedFilm(fullFilm)}>Watch the full film · 5:45 <ArrowUpRight size={17} /></button></div><button className="film-thumbnail" onClick={() => setSelectedFilm(shortFilm)} aria-label={`Play ${shortFilm.title}`}><img src={shortFilm.thumbnailUrl} alt="" loading="lazy" /><span className="film-play"><Play size={24} aria-hidden="true" /></span><span>{shortFilm === siteVideos[0] ? 'Watch the short film · 1:14' : 'Watch our corporate film'}</span></button></section>
    <section className="brief-section wrap home-why"><span className="eyebrow">WHY NHB</span><h2>Precision, backed by a culture of improvement.</h2><div className="why-grid">{[['Global customers', `Serving ${content.clients} and global engineering customers.`, 'global'], ['Lean philosophy', 'Continuous improvement is part of our everyday work.', 'kaizen'], ['Lifelong learning', 'Mentorship and skill development, built into the job.', 'learning'], ['Certified quality', content.certifications.map(cert => cert.code).join(', '), 'quality']].map(([title, text, Icon]) => <div className="brief-card why-motion-card" key={title}><span className="why-icon"><ThemeIcon name={Icon} size={52}/></span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <PhotoExplorer />
    <LearningLoop />
    <PhotoWall title="More perspectives. More possibilities." />
    <section className="brief-section wrap image-story-grid">
      <article className="image-story"><EditorialImage src={editorialScenes.find(scene=>scene.id==='craft').image} alt={editorialScenes.find(scene=>scene.id==='craft').alt}/><div><span className="eyebrow">PEOPLE MAKE THE DIFFERENCE</span><h2>Craft grows through learning.</h2><p>Bring your curiosity. Learn from the people around you. Find your place in a culture of improvement.</p><button className="text-link" onClick={()=>navigateTo('careers')}>Build Your Career with Us <ArrowUpRight size={17}/></button></div></article>
      <article className="image-story"><EditorialImage src={nhbImages.secondLapping.image} alt={nhbImages.secondLapping.alt}/><div><span className="eyebrow">THOUGHTFUL PROCESSES</span><h2>Every detail is an opportunity.</h2><p>Our approach brings together process discipline, engineering and the willingness to keep improving.</p><button className="text-link" onClick={()=>navigateTo('quality')}>Explore our approach to quality <ArrowUpRight size={17}/></button></div></article>
    </section>
    <VideoModal isOpen={!!selectedFilm} onClose={() => setSelectedFilm(null)} videoUrl={selectedFilm?.videoUrl} title={selectedFilm?.title} poster={selectedFilm?.thumbnailUrl} />
  </div>;
};
