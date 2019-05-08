import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Items, Text } from 'components'
import Icon from './icon.svg'

export default function PricingRefundNotice() {
  return (
    <Card padding="0/8" background="transparent" shadow="0">
      <Card flow="column" gap={4} justifyContent="start" padding="2/4">
        <img src={Icon} alt="refund notice" />
        <Items flow="row">
          <Text color="active" size={3}>
            <FormattedMessage id="PricingRefundNotice.title" />
          </Text>
          <Text color="active" weight={4} size={3}>
            <FormattedMessage id="PricingRefundNotice.subtitle" />
          </Text>
        </Items>
      </Card>
    </Card>
  )
}
