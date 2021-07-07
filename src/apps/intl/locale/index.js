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
  [SupportedLocales.ES]: {
    ...es,
    ...enRegions,
  },
  [SupportedLocales.ptBR]: {
    ...pt,
    ...enRegions,
  },
};
