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

export enum LocaleAsPopup {
  EN ='en',
  ES = 'es',
  PT = 'pt',
}

export const SupportedLocalesToLocaleAsPopup = {
  [SupportedLocales.EN]: LocaleAsPopup.EN,
  [SupportedLocales.ES]: LocaleAsPopup.ES,
  [SupportedLocales.ptBR]: LocaleAsPopup.PT,
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
