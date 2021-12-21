import { SupportedLocales } from '../models/Intl.model';

export function contactUsLink(lang) {
  return (lang === SupportedLocales.EN)
    ? 'https://www.metamap.com/mati-contact-us'
    : 'https://www.metamap.com/mati-contact-us';
}

export function useContactUsLink(lang = SupportedLocales.EN, target = '_blank') {
  return () => window.open(contactUsLink(lang), target);
}
