import React from 'react';
import { ThemeIcon } from './ThemeIcon';
import { useData } from '../context/DataContext';

export function CertificationBadges() {
  const { content } = useData();
  return <ul className="certification-badges" aria-label="Certifications">
    {content.certifications.map((cert, index) => <li key={index}>
      <div className="certification-badge">
        {cert.logoUrl ? <img src={cert.logoUrl} alt={`${cert.code} certification logo`} loading="lazy" decoding="async" /> : <ThemeIcon name="quality" size={38} />}
        <div><strong>{cert.code}</strong><span>{cert.title}</span></div>
      </div>
      {cert.url && <a className="text-link" href={cert.url} target="_blank" rel="noreferrer">View certificate ↗</a>}
    </li>)}
  </ul>;
}
