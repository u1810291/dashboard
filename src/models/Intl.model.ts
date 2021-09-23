import 'moment/locale/es';
import 'moment/locale/pt-br';
// moment's locales must be imported before using

export const SupportedLocales = {
  EN: 'en',
  ES: 'es',
  ptBR: 'pt-BR',
};

export const DEFAULT_LOCALE = SupportedLocales.EN;

export const LanguageList = [
  {
    locale: SupportedLocales.EN,
    label: 'English',
  },
  {
    locale: SupportedLocales.ES,
    label: 'Español',
  },
  {
    locale: SupportedLocales.ptBR,
    label: 'Português',
  },
];
