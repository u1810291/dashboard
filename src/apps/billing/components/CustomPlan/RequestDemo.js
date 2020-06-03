import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Items, Text, H2, Click } from 'components';
import { useContactUsLink } from 'lib/contactUs';
import { useStyles } from './CustomPlan.styles';

export function RequestDemo() {
  const intl = useIntl();
  const classes = useStyles();
  const externalLinkHandler = useContactUsLink(intl.locale);

  return (
    <Card
      padding="2/4"
      border="transparent"
      flow="column"
      autoColumns="1fr max-content"
      align="center"
      className={clsx(classes.block, classes.request)}
    >
      <Items flow="row">
        <H2>
          { intl.formatMessage({ id: 'Pricing.RequestCall.header' }) }
        </H2>
        <Text>
          { intl.formatMessage({ id: 'Pricing.RequestCall.requestText' }) }
        </Text>
      </Items>

      <Click border="active" onClick={externalLinkHandler} className={classes.button}>
        <Text color="active">
          {intl.formatMessage({ id: 'Pricing.RequestCall.button' })}
        </Text>
      </Click>
    </Card>
  );
}
