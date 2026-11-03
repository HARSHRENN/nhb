import React, { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  poster,
  title = 'Inside NHB'
}) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (isOpen) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [isOpen]);
  return <dialog ref={ref} className="brief-dialog video-dialog" aria-labelledby={titleId} onCancel={e => {
    e.preventDefault();
    onClose();
  }} onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }}><div className="dialog-heading"><h2 id={titleId}>{title}</h2><button aria-label="Close film" onClick={onClose}><X /></button></div>{isOpen && <VideoPlayer key={videoUrl} videoUrl={videoUrl} title={title} poster={poster} />}</dialog>;
}
