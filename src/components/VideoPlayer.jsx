import React, { useEffect, useRef, useState } from 'react';
import { directVideoUrl, videoEmbedUrl } from '../lib/media';

export function VideoPlayer({ videoUrl, title, poster }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const player = ref.current;
    return () => player?.pause();
  }, []);
  const direct = directVideoUrl(videoUrl);
  const embed = videoEmbedUrl(videoUrl);
  if (failed || (!direct && !embed)) return <p role="alert">This film could not be loaded. Please close it and try again.{direct && <> <a href={direct}>Open the video file</a></>}</p>;
  return direct ? <video ref={ref} controls playsInline preload="metadata" poster={poster || undefined} aria-label={title} onError={() => setFailed(true)}>
    <source src={direct} type="video/mp4" />
    Your browser does not support video playback. <a href={direct}>Open the film</a>.
  </video> : <iframe src={embed} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />;
}
