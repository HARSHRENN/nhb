import { PhotoExplorer } from '../components/PhotoExplorer';
import React from 'react';
import { CertificationBadges } from '../components/CertificationBadges';
import { useData } from '../context/DataContext';
export function QualityPage() {
  const {
    content,
    navigateTo
  } = useData();
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">QUALITY & CERTIFICATIONS</span><h1>Quality, in every detail.</h1><p>{content.qualityIntro}</p></section><section className="brief-section wrap"><CertificationBadges /></section><PhotoExplorer title="A closer look at careful work." ids={['quality','tools','machining','workshop']} /><section className="brief-section wrap"><h2>Tell us what your application needs.</h2><p className="prose-copy">Our team can help you review product requirements, inspection expectations and the supporting documentation for your project.</p><button className="text-link" onClick={() => navigateTo('contact')}>Contact our team →</button></section></div>;
}
