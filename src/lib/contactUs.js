export function contactUsLink(lang) {
  return (lang === 'en')
    ? 'https://getmati.com/contactus?utm_source=product&utm_medium=dashboard_cta&utm_campaign=product_dashboard_cta_pricing&utm_term=earned'
    : 'https://es.getmati.com/contactanos?utm_source=product&utm_medium=dashboard_cta&utm_campaign=product_dashboard_cta_pricing&utm_term=earned';
}

export function useContactUsLink(lang = 'en', target = '_blank') {
  return () => window.open(contactUsLink(lang), target);
}
