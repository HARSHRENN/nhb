import { ThemeIcon } from './ThemeIcon';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { QuoteRequestModal } from './QuoteRequestModal';
import { LiquidNavbar } from '@/components/ui/liquid-glass-navbar';

const links = [
  { id: 'home', label: 'Home', icon: <ThemeIcon name="home" size={26} />, fx: 'glow' },
  { id: 'about', label: 'About us', icon: <ThemeIcon name="global" size={26} />, fx: 'spin' },
  { id: 'products', label: 'Products', icon: <ThemeIcon name="manufacturing" size={26} />, fx: 'pop' },
  { id: 'quality', label: 'Quality', icon: <ThemeIcon name="quality" size={26} />, fx: 'glow' },
  { id: 'lean-culture', label: 'Our culture', icon: <ThemeIcon name="kaizen" size={26} />, fx: 'wave' },
  { id: 'gallery', label: 'Gallery', icon: <ThemeIcon name="gallery" size={26} />, fx: 'pop' },
  { id: 'careers', label: 'Careers', icon: <ThemeIcon name="people" size={26} />, fx: 'wave' },
  { id: 'contact', label: 'Contact', icon: <ThemeIcon name="contact" size={26} />, fx: 'pop' },
];
const navItems = links.map(({ id, ...item }) => ({ ...item, href: id === 'home' ? '/' : `/${id}` }));

export const Header = () => {
  const { activePage, navigateTo } = useData();
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1051px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1051px)');
    const update = () => setDesktop(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const menuButton = useRef(null);
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const closeOnResize = () => { if (window.innerWidth > 1050) setMenuOpen(false); };
    const closeOnOutside = event => { if (!headerRef.current?.contains(event.target)) setMenuOpen(false); };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnResize);
    return () => { document.removeEventListener('pointerdown', closeOnOutside); document.removeEventListener('keydown', closeOnEscape); window.removeEventListener('resize', closeOnResize); };
  }, [menuOpen]);
  useEffect(() => { setMenuOpen(false); }, [activePage]);
  const go = page => { navigateTo(page); setMenuOpen(false); };
  return <>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <header ref={headerRef} className="liquid-header">
      <div className="liquid-nav wrap">
        <button className="brand" onClick={() => go('home')} aria-label="NHB home"><img className="navbar-brand-logo" src="/images/logo.png" alt="NHB" width="50" height="48" /></button>
        <div className="desktop-nav">
          {desktop && <LiquidNavbar
            items={navItems}
            active={links.findIndex(item => item.id === activePage)}
            onChange={index => go(links[index].id)}
            tone="light"
            compact={false}
            sound={false}
            className="nhb-liquid-nav"
          />}
        </div>
        <button className="pill primary nav-quote" onClick={() => setQuoteOpen(true)}>Let’s talk <ArrowUpRight size={15} /></button>
        <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map(({ id, label }) => <a href={id === 'home' ? '/' : `/${id}`} key={id} aria-current={activePage === id ? 'page' : undefined} onClick={e => { e.preventDefault(); go(id); }}>{label}</a>)}<button onClick={() => { setMenuOpen(false); setQuoteOpen(true); }}>Request a quote ↗</button></nav>}
    </header>
    <QuoteRequestModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
  </>;
};
