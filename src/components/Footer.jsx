import React from 'react';
import { useData } from '../context/DataContext';
export function Footer() {
  const {
    navigateTo,
    content,
    pages
  } = useData();
  return <footer className="simple-footer"><div className="wrap"><div className="footer-grid"><div><strong className="footer-brand">NHB.</strong><p>Precision in every ball.<br />Improvement in every day.</p></div><div><h2>Explore</h2>{[['home', 'Home'], ['about', 'About us'], ['products', 'Products & capabilities'], ['quality', 'Quality & certifications'], ['gallery', 'Gallery'], ...pages.map(p => [p.slug, p.title])].map(([page, label]) => <a key={page} href={page === 'home' ? '/' : `/${page}`} onClick={e => {
            e.preventDefault();
            navigateTo(page);
          }}>{label}</a>)}</div><div><h2>People & culture</h2><button onClick={() => navigateTo('lean-culture')}>Lean & learning</button><button onClick={() => navigateTo('careers')}>Careers</button><a className="footer-careers-email" href={`mailto:${content.careersEmail}`}>{content.careersEmail}</a></div><div><h2>Let’s connect</h2>{content.contactEmail && <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>}<p>{content.address}</p>{content.phone && <a href={`tel:${content.phone.replace(/[^+\d]/g, '')}`}>{content.phone}</a>}<button onClick={() => navigateTo('contact')}>Contact us ↗</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NHB Ball. All rights reserved.</span><div><button onClick={() => navigateTo('quality')}>Certifications</button><button onClick={() => navigateTo('admin')}>Admin</button></div></div></div></footer>;
}
