import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';

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
];
