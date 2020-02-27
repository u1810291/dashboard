import Badge from 'apps/product/Badge';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';
import React from 'react';

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
    mixPanelEvent: MixPanelEvents.NavLegalServices,
    tab: 'Product.LegalService.tab',
    badge: <Badge label="Beta" />,
    qa: QATags.Product.Tab.LegalServices,
  },
];
