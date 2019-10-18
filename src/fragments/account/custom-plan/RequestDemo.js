import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Items, Text, H2, Click } from 'components';
import { useHubSpotForm } from 'lib/hubspot';

import CSS from './CustomPlan.module.scss';

export default function RequestDemo() {
  const intl = useIntl();
  const showHubSpotForm = useHubSpotForm();

  return (
    <Card
      padding="2/4"
      border="transparent"
      flow="column"
      autoColumns="1fr max-content"
      align="center"
      className={clsx(CSS.block, CSS.request)}
    >
      <Items flow="row">
        <H2>
          { intl.formatMessage({ id: 'Pricing.RequestCall.header' }) }
        </H2>
        <Text>
          { intl.formatMessage({ id: 'Pricing.RequestCall.requestText' }) }
        </Text>
      </Items>

      <Click border="active" onClick={showHubSpotForm} className={CSS.button}>
        <Text color="active">
          {intl.formatMessage({ id: 'Pricing.RequestCall.button' })}
        </Text>
      </Click>
    </Card>
  );
}
