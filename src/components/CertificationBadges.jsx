import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export function CertificationBadges() {
  const { content } = useData();
  return <ul className="certification-badges" aria-label="Certifications">
    {content.certifications.map((cert, index) => <li key={index}>
      <div className="certification-badge">
        {cert.logoUrl ? <img src={cert.logoUrl} alt={`${cert.code} certification logo`} loading="lazy" decoding="async" /> : <ShieldCheck size={22} strokeWidth={1.5} aria-hidden="true" />}
        <div><strong>{cert.code}</strong><span>{cert.title}</span></div>
      </div>
      {cert.url && <a className="text-link" href={cert.url} target="_blank" rel="noreferrer">View certificate ↗</a>}
    </li>)}
  </ul>;
}
