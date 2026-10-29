export function videoEmbedUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    const host = url.hostname.replace(/^www\./, '');
    let id = '';
    if (host === 'youtu.be') id = url.pathname.slice(1);
    if (['youtube.com', 'youtube-nocookie.com'].includes(host)) {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] || '';
    }
    if (/^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const match = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/);
      if (match) return `https://player.vimeo.com/video/${match[1]}`;
    }
  } catch {/* Invalid or unsupported URL. */}
  return '';
}
export function mediaUrl(value) {
  if (typeof value !== 'string') return '';
  if (/^\/uploads\/[\w.-]+$/.test(value)) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}
export function videoThumbnail(value) {
  const embed = videoEmbedUrl(value);
  const id = embed.match(/youtube-nocookie\.com\/embed\/([\w-]+)/)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}
export async function compressPhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use JPG, PNG or WebP images.');
  if (file.size > 25 * 1024 * 1024) throw new Error('Each original image must be under 25 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', .82));
    if (!blob) throw new Error('Could not process this image.');
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', {
      type: 'image/webp'
    });
  } finally {
    bitmap.close();
  }
}
