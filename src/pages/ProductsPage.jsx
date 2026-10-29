import { PhotoMosaic } from '../components/PhotoExplorer';
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { QuoteRequestModal } from '../components/QuoteRequestModal';
export function ProductsPage() {
  const {
    content
  } = useData();
  const [quote, setQuote] = useState(false);
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">PRODUCTS & CAPABILITIES</span><h1>Precision for your application.</h1><p>{content.productsIntro}</p><div className="hero-actions"><button className="pill primary" onClick={() => setQuote(true)}>Request a quote ↗</button></div></section><section className="brief-section wrap"><div className="brief-grid two">{content.products.map(({
          title,
          description: text
        }) => <article className="brief-card" key={title}><h2>{title}</h2><p>{text}</p><button className="text-link" onClick={() => setQuote(true)}>Discuss your requirements →</button></article>)}</div></section><PhotoMosaic title="Engineering, from every angle." ids={['machining','workshop','automation','robotics','metalwork','tools','quality','craft']} /><section className="brief-section wrap"><h2>From requirements to finished components.</h2><p className="prose-copy">Share your material, ball diameter, grade, quantity and application. You can attach a drawing to your quote request so our team can review the details.</p></section><QuoteRequestModal isOpen={quote} onClose={() => setQuote(false)} /></div>;
}
