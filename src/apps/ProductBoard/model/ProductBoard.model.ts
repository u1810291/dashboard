import { SupportedLocales } from 'models/Intl.model';

export const PRODUCT_BOARD_BASE_URL = 'https://portal.productboard.com';

export const ProductBoardIframeLinkByLocale = {
  [SupportedLocales.EN]: '3rgwwqtrxhquabuhvz7ftas4',
  [SupportedLocales.ES]: 'npxfj7fq3mwagddhc2x2cdwb',
  [SupportedLocales.ptBR]: 'an7rgurfkkep2gqwyfpwnuhn',
};

export function getIframeSrc(iframeLink: string, token: string, hideLogo: number = 1): string {
  return `${PRODUCT_BOARD_BASE_URL}/${iframeLink}?token=${token}&hide_logo=${hideLogo}`;
}

export interface ProductBoardTokenResponse {
  data: {
    token: string;
  };
}

export const PRODUCT_BOARD_IFRAME_ID = 'productBoardIframe';
export const DRAWER_WIDTH = 276;
export const CLOSED_DRAWER_WIDTH = 60;
export const CLOSED_DRAWER_WIDTH_MOBILE = 0;
