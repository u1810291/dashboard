// eslint-disable-next-line import/prefer-default-export
export function pushEvent(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
