import React, { useState } from 'react';
import { ArrowUpRight, Play, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LightboxModal } from './LightboxModal';
import { videoThumbnail } from '../lib/media';
export function MediaThumbnail({
  item
}) {
  const url = item.type === 'video' ? item.thumbnailUrl || videoThumbnail(item.videoUrl) : item.imageUrl;
  return <div className="media-thumbnail">{url ? <img src={url} alt={item.title} loading="lazy" decoding="async" /> : <ImageIcon size={32} aria-hidden="true" />}{item.type === 'video' && <span className="media-play"><Play size={21} aria-hidden="true" /></span>}</div>;
}
export function GalleryPreview({
  title = 'Culture in action.',
  featuredOnly = false,
  showEmpty = false,
  kaizenOnly = false
}) {
  const {
    gallery,
    navigateTo
  } = useData();
  const [selected, setSelected] = useState(null);
  const items = gallery.filter(item => (!featuredOnly || item.featured) && (!kaizenOnly || item.category === 'Kaizen Events')).slice(0, 3);
  if (!items.length && !showEmpty) return null;
  return <section className="brief-section wrap"><div className="section-heading"><div><span className="eyebrow">FROM OUR GALLERY</span><h2>{title}</h2></div><button className="text-link" onClick={() => navigateTo('gallery')}>View Full Gallery <ArrowUpRight size={17} /></button></div><>{!items.length && <div className="brief-empty"><p>{featuredOnly ? 'Featured photos and videos will appear here once published.' : 'Photos and videos from our Kaizen events will appear here once published.'}</p></div>}<div className="media-grid">{items.map(item => <button key={item.id} className="media-card" onClick={() => setSelected(item)}><MediaThumbnail item={item} /><div><span className="eyebrow">{item.category} · {item.date}</span><h3>{item.title}</h3><p>{item.caption}</p></div></button>)}</div></><LightboxModal isOpen={!!selected} item={selected} onClose={() => setSelected(null)} /></section>;
}
