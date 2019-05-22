import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Items, Card, Text, Click } from 'components'

function Plan({ title, price, onClick }) {
  return (
    <Card justifyItems="center">
      <Text size="7" weight="1">
        {title}
      </Text>
      <Text size="4">{price}</Text>
      <Click hoverShadow={false} onClick={onClick}>
        <Text color="active" uppercase>
          <FormattedMessage id="PricingLargePlans.contactUs" />
        </Text>
      </Click>
    </Card>
  )
}

export default function PricingLargePlans({ onClick = () => {} }) {
  return (
    <Items>
      <Plan
        title={<FormattedMessage id="PricingLargePlans.highgrowth.title" />}
        price={
          <FormattedHTMLMessage id="PricingLargePlans.highgrowth.priceline" />
        }
        onClick={onClick}
      />
      <Plan
        title={<FormattedMessage id="PricingLargePlans.enterprise.title" />}
        price={
          <Text weight="4">
            <FormattedMessage id="PricingLargePlans.enterprise.priceline" />
          </Text>
        }
        onClick={onClick}
      />
    </Items>
  )
}
