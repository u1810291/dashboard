import 'dayjs/locale/es';
import 'dayjs/locale/pt-br';
// dayjs locales must be imported before using

export enum SupportedLocales {
  EN = 'en',
  ES = 'es',
  ptBR = 'pt-BR',
}

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
