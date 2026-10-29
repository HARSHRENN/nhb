import { PhotoWall } from '../components/PhotoWall';
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MediaThumbnail } from '../components/GalleryPreview';
import { LightboxModal } from '../components/LightboxModal';
export function GalleryPage() {
  const {
    gallery,
    loading,
    loadError
  } = useData();
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const items = gallery.filter(i => (type === 'all' || i.type === type) && (category === 'all' || i.category === category));
  const index = items.findIndex(i => i.id === selected?.id);
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">LIFE AT NHB</span><h1>Kaizen photos & videos.</h1><p>Kaizen events, training, people and everyday improvements from our plant.</p></section><section className="brief-section wrap"><div className="filter-row" role="group" aria-label="Media type">{[['all', 'All media'], ['photo', 'Photos'], ['video', 'Videos']].map(([value, label]) => <button key={value} aria-pressed={type === value} className={type === value ? 'selected' : ''} onClick={() => { setSelected(null); setType(value); }}>{label}</button>)}</div><div className="filter-row" role="group" aria-label="Gallery category">{['all', 'Kaizen Events', 'Training', 'Plant', 'Events'].map(value => <button key={value} aria-pressed={category === value} className={category === value ? 'selected' : ''} onClick={() => { setSelected(null); setCategory(value); }}>{value === 'all' ? 'All categories' : value}</button>)}</div><p className="gallery-count" role="status" aria-live="polite">{!loading && !loadError ? `${items.length} ${items.length === 1 ? 'item' : 'items'}` : ''}</p>{loading ? <p role="status">Loading gallery…</p> : loadError ? <p role="alert">The gallery is unavailable right now. Please try again later.</p> : items.length ? <div className="media-grid">{items.map(item => <button className="media-card" key={item.id} onClick={() => setSelected(item)}><MediaThumbnail item={item} /><div><span className="eyebrow">{item.category} · {item.date}</span><h2>{item.title}</h2><p>{item.caption}</p></div></button>)}</div> : <div className="brief-empty"><h2>{gallery.length ? 'No media in this filter.' : 'A closer look, coming soon.'}</h2><p>{gallery.length ? 'Try another category or media type.' : 'We’re preparing photos and stories from our people and plant.'}</p></div>}</section><PhotoWall title="Engineering in focus." /><LightboxModal isOpen={!!selected} item={selected} onClose={() => setSelected(null)} hasPrev={index > 0} hasNext={index >= 0 && index < items.length - 1} onPrev={() => setSelected(items[index - 1])} onNext={() => setSelected(items[index + 1])} /></div>;
}
