import React from 'react';
export function EditorialImage({ src, alt, className = '', eager = false }) {
  return <figure className={`editorial-image ${className}`}>
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" width="1600" height="900" />
  </figure>;
}
