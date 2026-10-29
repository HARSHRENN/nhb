const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
let started = false;
export function trackEvent(name, parameters = {}) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
  if (!started) {
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  window.gtag('event', name, parameters);
}
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId || '');
