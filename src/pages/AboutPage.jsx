import { nhbImages } from '../data/editorialScenes';
import { CompanyHighlights } from '../components/CompanyHighlights';
import { PhotoMosaic } from '../components/PhotoExplorer';
import { EditorialImage } from '../components/EditorialImage';
import React from 'react';
import { useData } from '../context/DataContext';
import { CertificationBadges } from '../components/CertificationBadges';
import { GalleryPreview } from '../components/GalleryPreview';
export function AboutPage() {
  const {
    content,
    navigateTo
  } = useData();
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">ABOUT NHB</span><h1>{content.aboutTitle}</h1><div className="prose-copy">{content.aboutBody.split('\n\n').map((text, i) => <p key={i}>{text}</p>)}</div></section><CompanyHighlights /><section className="brief-section wrap"><EditorialImage src={content.plantPhoto || nhbImages.plantAerial.image} alt={content.plantPhoto ? 'NHB Amalsad plant' : nhbImages.plantAerial.alt} /></section><section className="brief-section wrap"><span className="eyebrow">GLOBAL CUSTOMERS</span><h2>Serving global engineering customers.</h2><p className="prose-copy">Our customer base includes {content.clients}.</p><CertificationBadges /></section><section className="brief-section wrap"><h2>A culture of continuous improvement.</h2><p className="prose-copy">{content.leanIntro}</p><button className="text-link" onClick={() => navigateTo('lean-culture')}>Explore lean & learning →</button></section><section className="brief-section wrap"><span className="eyebrow">AMALSAD PLANT</span><h2>Our home in Gujarat.</h2><address className="about-address">{content.address}</address><button className="text-link" onClick={()=>navigateTo('contact')}>Contact details & location map →</button></section><PhotoMosaic title="An engineering perspective." ids={['people','process','workshop','teamwork']} /><GalleryPreview title="Meet the people behind our work." /></div>;
}
