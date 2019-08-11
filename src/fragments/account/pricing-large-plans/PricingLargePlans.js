import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Items, Card, Text, Click } from 'components'

function Plan({ title, price, onClick }) {
  return (
    <Card justifyItems="center" padding={2}>
      <Text size="7" weight="1">
        {title}
      </Text>
      <Text size="4" weight={4} padding="20px 0 30px 0">{price}</Text>
      <Click hoverShadow={false} onClick={onClick}>
        <Text color="active" uppercase>
          <FormattedMessage id="PricingLargePlans.contactUs" />
        </Text>
      </Click>
    </Card>
  )
}

export default function PricingLargePlans({ name, subscriptionPrice, onClick = () => {} }) {
  return (
    <Items>
      <Plan
        title={name}
        price={ +subscriptionPrice ?
          <FormattedMessage id="CardModal.planPrice" values={{ planPrice: subscriptionPrice }} />
          : subscriptionPrice
        }
        onClick={onClick}
      />
    </Items>
  )
}
