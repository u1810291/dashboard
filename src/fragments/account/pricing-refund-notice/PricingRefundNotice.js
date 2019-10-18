import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, Text } from 'components';
import CSS from './PricingRefundNotice.module.scss';

export default function PricingRefundNotice() {
  return (
    <Card justifyContent="center" className={CSS.border}>
      <Text weight={4}>
        <FormattedMessage id="PricingRefundNotice.title" />
        {' '}
        <FormattedMessage id="PricingRefundNotice.subtitle" />
      </Text>
    </Card>
  );
}
