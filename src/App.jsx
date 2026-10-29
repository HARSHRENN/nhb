import React from 'react';
import { SiteMotion } from './components/SiteMotion';
import { useData } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { QualityPage } from './pages/QualityPage';
import { LeanCulturePage } from './pages/LeanCulturePage';
import { GalleryPage } from './pages/GalleryPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { AdminCmsPage } from './pages/AdminCmsPage';
export function App() {
  const {
    activePage,
    pages,
    navigateTo
  } = useData();
  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'quality':
        return <QualityPage />;
      case 'lean-culture':
        return <LeanCulturePage />;
      case 'gallery':
        return <GalleryPage />;
      case 'careers':
        return <CareersPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminCmsPage />;
      case 'home':
        return <HomePage />;
      default:
        {
          const page = pages.find(p => p.slug === activePage);
          return page ? <div className="brief-page"><section className="brief-page-heading wrap"><h1>{page.title}</h1><div className="prose-copy">{page.body.split('\n\n').map((text, i) => <p key={i}>{text}</p>)}</div>{page.linkUrl && <a className="text-link" href={page.linkUrl} target="_blank" rel="noreferrer">{page.linkLabel} ↗</a>}</section></div> : <div className="brief-page"><section className="brief-page-heading wrap"><h1>Page not found.</h1><button className="text-link" onClick={() => navigateTo('home')}>Return home →</button></section></div>;
        }
    }
  };
  return <div className="site-shell min-h-screen flex flex-col">
      <SiteMotion page={activePage} />
      <Header />
      <main id="main-content" tabIndex={-1} className={`flex-1 ${activePage !== 'home' && activePage !== 'admin' ? 'inner-glass-page' : ''}`}>
        {renderPage()}
      </main>
      <Footer />
    </div>;
}
export default App;
