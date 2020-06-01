import { Card, Click, H2, Items, Text } from 'components';
import { camelCase } from 'lodash';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStyles } from './CustomPlan.styles';

export function CustomPlan({ name, current = false, onClick }) {
  const intl = useIntl();
  const classes = useStyles;

  return (
    <Card
      padding="2/4"
      border={current ? 'blue' : 'transparent'}
      flow="column"
      align="center"
      className={classes.block}
    >
      <Items flow="row">
        <H2>{name}</H2>
        <Text>
          <FormattedMessage
            id={`PricingPlans.${camelCase(name)}.description`}
          />
        </Text>
      </Items>

      <Click border="active" onClick={onClick}>
        <Text color="active">
          {intl.formatMessage({ id: current ? 'PricingPlans.currentPlan' : 'PricingPlans.contactUs' })}
        </Text>
      </Click>
    </Card>
  );
}
