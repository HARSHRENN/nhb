import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { videoEmbedUrl } from '../lib/media';
export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title = 'Inside NHB'
}) {
  const ref = useRef(null);
  const embed = videoEmbedUrl(videoUrl);
  useEffect(() => {
    const d = ref.current;
    if (isOpen && embed) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [isOpen, embed]);
  return <dialog ref={ref} className="brief-dialog video-dialog" aria-labelledby="film-title" onCancel={e => {
    e.preventDefault();
    onClose();
  }} onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }}><div className="dialog-heading"><h2 id="film-title">{title}</h2><button aria-label="Close film" onClick={onClose}><X /></button></div>{isOpen && embed && <iframe src={embed} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}</dialog>;
}
