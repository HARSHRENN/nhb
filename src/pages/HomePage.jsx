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
import { videoEmbedUrl, videoThumbnail } from '../lib/media';
export const HomePage = () => {
  const {
    navigateTo,
    content
  } = useData();
  const [filmOpen, setFilmOpen] = useState(false);
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
    <section className="corporate-film wrap brief-section"><div><span className="eyebrow">OUR PEOPLE. OUR PLANT.</span><h2>NHB Corporate Video</h2><p>{content.corporateVideoDescription}</p></div>{videoEmbedUrl(content.corporateVideoUrl) ? <button className="film-thumbnail" onClick={() => setFilmOpen(true)} aria-label={`Play ${content.corporateVideoTitle}`}><img src={content.corporateVideoThumbnail || videoThumbnail(content.corporateVideoUrl) || undefined} alt="" loading="lazy" /><span className="film-play"><Play size={24} aria-hidden="true" /></span><span>Watch our corporate film</span></button> : <div className="film-placeholder film-with-image"><img src="/images/manufacturing-process.jpg" alt="Illustrative stock photo of a manufacturing production line" loading="lazy" width="1400" height="934" /><span className="film-play film-play-unavailable"><Play size={24} aria-hidden="true" /></span><span>NHB Corporate Video</span><small>Our corporate film will be shared here soon.</small></div>}</section>
    <section className="brief-section wrap home-why"><span className="eyebrow">WHY NHB</span><h2>Precision, backed by a culture of improvement.</h2><div className="why-grid">{[['Global customers', `Serving ${content.clients} and global engineering customers.`, 'global'], ['Lean philosophy', 'Continuous improvement is part of our everyday work.', 'kaizen'], ['Lifelong learning', 'Mentorship and skill development, built into the job.', 'learning'], ['Certified quality', content.certifications.map(cert => cert.code).join(', '), 'quality']].map(([title, text, Icon]) => <div className="brief-card why-motion-card" key={title}><span className="why-icon"><ThemeIcon name={Icon} size={52}/></span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <PhotoExplorer />
    <LearningLoop />
    <PhotoWall title="More perspectives. More possibilities." />
    <section className="brief-section wrap image-story-grid">
      <article className="image-story"><EditorialImage src="/images/india-collaboration.jpg" alt="AI-generated illustration of Indian engineers collaborating with international colleagues" credit="AI-generated illustration"/><div><span className="eyebrow">PEOPLE MAKE THE DIFFERENCE</span><h2>Craft grows through learning.</h2><p>Bring your curiosity. Learn from the people around you. Find your place in a culture of improvement.</p><button className="text-link" onClick={()=>navigateTo('careers')}>Build Your Career with Us <ArrowUpRight size={17}/></button></div></article>
      <article className="image-story"><EditorialImage src="/images/manufacturing-process.jpg" alt="Illustrative stock photograph of an automated manufacturing line" credit="Stock photo · Homa Appliances / Unsplash"/><div><span className="eyebrow">THOUGHTFUL PROCESSES</span><h2>Every detail is an opportunity.</h2><p>Our approach brings together process discipline, engineering and the willingness to keep improving.</p><button className="text-link" onClick={()=>navigateTo('quality')}>Explore our approach to quality <ArrowUpRight size={17}/></button></div></article>
    </section>
    <VideoModal isOpen={filmOpen} onClose={() => setFilmOpen(false)} videoUrl={content.corporateVideoUrl} title={content.corporateVideoTitle} />
  </div>;
};
