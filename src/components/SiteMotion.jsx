import React, { useEffect, useRef } from 'react';

/** One observer for section entrance motion. */
export function SiteMotion({ page }) {
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main || page === 'admin') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    const seen = new WeakSet();
    const selector = '.hero-copy, .hero-editorial, .company-numbers, .impact-section, .brief-page-heading, .brief-section, .brief-grid > .brief-card, .why-grid > .brief-card, .media-card';
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.dataset.revealed = 'true'; observer.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -20px 0px' }) : null;
    const add = element => {
      if (seen.has(element) || element.closest('dialog')) return;
      seen.add(element);
      element.dataset.reveal = '';
      const siblings = element.parentElement ? [...element.parentElement.children] : [];
      const index = siblings.indexOf(element);
      element.style.setProperty('--reveal-delay', `${Math.min(Math.max(index, 0), 3) * 65}ms`);
      if (observer && !media.matches) observer.observe(element);
      else element.dataset.revealed = 'true';
    };
    const scan = element => {
      if (element.matches(selector)) add(element);
      element.querySelectorAll(selector).forEach(add);
    };
    const preference = () => {
      root.classList.toggle('motion-enabled', !media.matches && !!observer);
      if (media.matches) main.querySelectorAll('[data-reveal]').forEach(el => { el.dataset.revealed = 'true'; });
    };
    preference(); scan(main);
    const mutations = new MutationObserver(records => records.forEach(record => {
      record.addedNodes.forEach(node => { if (node instanceof Element) scan(node); });
    }));
    mutations.observe(main, { childList: true, subtree: true });
    const visibility = () => { root.dataset.pageHidden = String(document.hidden); };
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', preference);
    visibility();
    return () => {
      observer?.disconnect(); mutations.disconnect();
      document.removeEventListener('visibilitychange', visibility); media.removeEventListener('change', preference);
      root.classList.remove('motion-enabled');
    };
  }, [page]);
  return null;
}

export function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const text = String(value);
    const match = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || !match || /^\d{4}s$/.test(text) || /since|heritage|year/i.test(label) || reduced.matches || !('IntersectionObserver' in window)) return;
    const target = Number(match[2].replace(/,/g, ''));
    if (!Number.isFinite(target)) return;
    let frame = 0;
    const decimals = match[2].split('.')[1]?.length || 0;
    const formatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals });
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / 1100);
        element.textContent = t === 1 || reduced.matches ? text : `${match[1]}${formatter.format(Number((target * (1 - (1 - t) ** 3)).toFixed(decimals)))}${match[3]}`;
        if (t < 1 && !reduced.matches) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); element.textContent = text; };
  }, [value, label]);
  return <strong aria-label={String(value)}><span ref={ref} aria-hidden="true">{value}</span></strong>;
}
