import { SupportedLocales } from 'models/Intl.model';
import en from './en.json';
import es from './es.json';
import pt from './pt_BR.json';
import enRegions from './en_regions.json';

export const translations = {
  [SupportedLocales.EN]: {
    ...en,
    ...enRegions,
  },
  // For locales other than english: use messages in English as base so that we
  // fallback to English in case we're missing translations for other locales
  // to avoid displaying a bare message ID.
  [SupportedLocales.ES]: {
    ...en,
    ...es,
    ...enRegions,
  },
  [SupportedLocales.ptBR]: {
    ...en,
    ...pt,
    ...enRegions,
  },
};
