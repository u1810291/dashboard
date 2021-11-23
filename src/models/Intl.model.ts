import 'dayjs/locale/es';
import 'dayjs/locale/pt-br';
// dayjs locales must be imported before using

export enum SupportedLocales {
  EN = 'en',
  ES = 'es',
  ptBR = 'pt-BR',
}

export enum FullSupportedLocales {
  EN ='en-US',
  ES = 'es-ES',
  ptBR = 'pt-BR',
}

export const SupportedLocaleToFullLocale = {
  [SupportedLocales.EN]: FullSupportedLocales.EN,
  [SupportedLocales.ES]: FullSupportedLocales.ES,
  [SupportedLocales.ptBR]: FullSupportedLocales.ptBR,
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
