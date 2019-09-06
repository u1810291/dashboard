/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FormattedMessage } from 'react-intl';
import { Card, Items, Text } from 'components';
import Icon from './icon.svg';

export default function PricingRefundNotice() {
  return (
    <Card
      flow="column"
      gap={4}
      justifyContent="start"
      padding="2/4"
      align="center"
      css={css`
        margin: 0 calc(var(--mgi-spacing) * 8);
      `}
    >
      <img src={Icon} alt="refund notice" />
      <Items flow="row" gap="1">
        <Text color="active" size={3}>
          <FormattedMessage id="PricingRefundNotice.title" />
        </Text>
        <Text color="active" size={3}>
          <FormattedMessage id="PricingRefundNotice.subtitle" />
        </Text>
      </Items>
    </Card>
  );
}
