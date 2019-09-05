import React from 'react';
import { Items } from 'components';
import MobileDemo from './MobileDemo';
import ClientApplications from './ClientApplications';
import IntegrationCode from './IntegrationCode';

import CSS from './IntegrationContent.module.scss';

export default function InfoPage() {
  return (
    <Items
      flow="row"
      gap={2}
      className={CSS.integrationContent}
    >
      <IntegrationCode />
      <hr className={CSS.divider} />
      <ClientApplications />
      <hr className={CSS.divider} />
      <MobileDemo />
    </Items>
  );
}
