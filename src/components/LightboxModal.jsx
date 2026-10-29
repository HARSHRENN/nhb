import React, { useRef, useEffect, useId } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { videoEmbedUrl } from '../lib/media';
export function LightboxModal({
  isOpen,
  onClose,
  item,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (isOpen && item) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [isOpen, item]);
  return <dialog ref={ref} className="brief-dialog lightbox-dialog" aria-labelledby={titleId} onCancel={e => {
    e.preventDefault();
    onClose();
  }} onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }} onKeyDown={e => {
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    if (e.key === 'ArrowRight' && hasNext) onNext();
  }}><div className="dialog-heading"><span>{item?.category}{item?.date ? ` · ${item.date}` : ''}</span><button onClick={onClose} aria-label="Close gallery item"><X /></button></div>{isOpen && item && <><div className="lightbox-media">{item.type === 'video' ? <iframe src={videoEmbedUrl(item.videoUrl)} title={item.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <img src={item.imageUrl} alt={item.title} />}</div><div className="lightbox-caption"><h2 id={titleId}>{item.title}</h2><p>{item.caption}</p>{(item.beforeImageUrl || item.afterImageUrl) && <div className="before-after">{[['Before', item.beforeImageUrl], ['After', item.afterImageUrl]].map(([label, url]) => url && <figure key={label}><img src={url} alt={`${label}: ${item.title}`} loading="lazy" /><figcaption>{label}</figcaption></figure>)}</div>}{[['Before', item.problem], ['What changed', item.solution], ['After', item.result]].map(([label, text]) => text && <p key={label}><strong>{label}: </strong>{text}</p>)}<div className="lightbox-navigation">{hasPrev && <button className="text-link" onClick={onPrev}><ChevronLeft size={16} /> Previous</button>}{hasNext && <button className="text-link" onClick={onNext}>Next <ChevronRight size={16} /></button>}</div></div></>}</dialog>;
}
