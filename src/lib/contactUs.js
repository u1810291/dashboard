import { SupportedLocales } from '../models/Intl.model';

export function contactUsLink(lang) {
  return (lang === SupportedLocales.EN)
    ? 'https://getmati.com/contactus?utm_source=product&utm_medium=dashboard_cta&utm_campaign=product_dashboard_cta_pricing&utm_term=earned'
    : 'https://es.getmati.com/contactanos?utm_source=product&utm_medium=dashboard_cta&utm_campaign=product_dashboard_cta_pricing&utm_term=earned';
}

export function useContactUsLink(lang = SupportedLocales.EN, target = '_blank') {
  return () => window.open(contactUsLink(lang), target);
}
