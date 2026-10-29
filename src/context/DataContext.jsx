import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { defaultContent, pageMeta } from '../data/siteContent';
import { api } from '../lib/api';
import { trackEvent } from '../lib/analytics';
const DataContext = createContext(null);
const currentPage = () => location.hash.slice(1) || location.pathname.replace(/^\/|\/$/g, '') || 'home';
export function DataProvider({
  children
}) {
  const [activePage, setActivePage] = useState(currentPage);
  const [content, setContent] = useState(defaultContent);
  const [jobs, setJobs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const tracked = useRef('');
  const refreshData = useCallback(async () => {
    try {
      const [c, j, g, p] = await Promise.all([api('/content'), api('/jobs'), api('/gallery'), api('/pages')]);
      setContent({
        ...defaultContent,
        ...c
      });
      setJobs(j);
      setGallery(g);
      setPages(p);
      setLoadError('');
    } catch (e) {
      setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshData();
  }, [refreshData]);
  useEffect(() => {
    const update = () => setActivePage(currentPage());
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  const navigateTo = useCallback(page => {
    history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    setActivePage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  useEffect(() => {
    const custom = pages.find(p => p.slug === activePage);
    const meta = pageMeta[activePage] || [custom?.title ? `${custom.title} | NHB` : 'NHB', custom?.description || 'Precision manufacturing at NHB.'];
    document.title = meta[0];
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[1]);
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = activePage === 'admin' || !pageMeta[activePage] && !custom ? 'noindex,nofollow' : 'index,follow';
    if (activePage === 'admin' || tracked.current === activePage) return;
    tracked.current = activePage;
    let session = sessionStorage.getItem('nhb-session');
    if (!session) {
      session = crypto.randomUUID();
      sessionStorage.setItem('nhb-session', session);
    }
    const path = activePage === 'home' ? '/' : `/${activePage}`;
    api('/stats/track-view', {
      method: 'POST',
      body: JSON.stringify({
        path,
        session
      })
    }).catch(() => {});
    trackEvent('page_view', {
      page_title: meta[0],
      page_location: location.origin + path
    });
    if (activePage === 'careers') trackEvent('career_page_view');
  }, [activePage, pages]);
  const submitQuote = async form => {
    try {
      const result = await api('/quotes', {
        method: 'POST',
        body: form
      });
      trackEvent('generate_lead', {
        lead_type: 'quote'
      });
      return result;
    } catch (e) {
      return {
        success: false,
        error: e.message
      };
    }
  };
  const submitApplication = async form => {
    try {
      const result = await api('/applications', {
        method: 'POST',
        body: form
      });
      trackEvent('job_application');
      return result;
    } catch (e) {
      return {
        success: false,
        error: e.message
      };
    }
  };
  return <DataContext.Provider value={{
    activePage,
    navigateTo,
    content,
    jobs,
    gallery,
    pages,
    loading,
    loadError,
    refreshData,
    submitQuote,
    submitApplication
  }}>{children}</DataContext.Provider>;
}
export const useData = () => useContext(DataContext);
