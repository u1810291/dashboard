import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, Text } from 'components';

export default function PricingRefundNotice() {
  return (
    <Card justifyContent="center" background="active-alternate">
      <Text weight={4}>
        <FormattedMessage id="PricingRefundNotice.title" />
        {' '}
        <FormattedMessage id="PricingRefundNotice.subtitle" />
      </Text>
    </Card>
  );
}
