export function pushEvent(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
