import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';

export const PRODUCT_DEMO_CDN_URL = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos';
export const PRODUCT_FOOTER_UPDATE_TIMEOUT = 7000;

export const ProductTabs = [
  {
    mixPanelEvent: null,
    tab: 'Product.tab.customization',
    qa: QATags.Product.Tab.Configuration,
  },
  {
    mixPanelEvent: MixPanelEvents.NavIntegration,
    tab: 'Product.tab.integration',
    qa: QATags.Product.Tab.Integration,
  },
  {
    mixPanelEvent: null,
    tab: 'Product.tab.checks',
  },
];
