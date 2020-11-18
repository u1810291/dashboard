import { SupportedLocales } from 'models/Intl.model';
import en from './en.json';
import es from './es.json';
import pt from './pt_BR.json';

export const translations = {
  [SupportedLocales.EN]: en,
  [SupportedLocales.ES]: es,
  [SupportedLocales.ptBR]: pt,
};
