import Badge from 'apps/product/Badge';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import React from 'react';

export const ProductTabs = [
  {
    mixPanelEvent: null,
    tab: 'Product.tab.customization',
  },
  {
    mixPanelEvent: MixPanelEvents.NavIntegration,
    tab: 'Product.tab.integration',
  },
  {
    mixPanelEvent: MixPanelEvents.NavLegalServices,
    tab: 'Product.LegalService.tab',
    badge: <Badge label="Beta" />,
  },
];
