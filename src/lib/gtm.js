export default {
  pushEvent(event) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  },
};
