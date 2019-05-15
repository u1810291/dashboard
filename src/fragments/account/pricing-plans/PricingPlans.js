import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Items, Card, Click, Text, H2 } from 'components'

export default function PricingPlans({
  planId,
  amount,
  planPrice,
  current,
  highlight = false,
  onChoosePlan = () => {}
}) {
  return (
    <Card gap={4} background={highlight ? 'pistachio' : 'white'}>
      <Items flow="row" gap={2}>
        <H2>
          <FormattedMessage id={`PricingPlans.${planId}.title`} />
        </H2>
        <Items gap={0} flow="row">
          <Text size={4} weight="1">
            <FormattedMessage id="PricingPlans.upTo" />
          </Text>
          <Text size={16} weight={4}>
            {amount}
          </Text>
          <Text size={4} weight="1">
            <FormattedMessage id="PricingPlans.verificationsPerMonth" />
          </Text>
        </Items>
      </Items>
      <Items justifyItems="center" flow="row" gap={1}>
        <section>
          <Text size={4} weight={4}>
            ${planPrice}
          </Text>
          <Text size={4}>
            <FormattedMessage id="PricingPlans.pricePerMonth" />
          </Text>
        </section>
        <Text weight={1} color="secondary">
          <FormattedMessage id="PricingPlans.limitationsNotice" />
        </Text>
      </Items>
      <Click background="active" onClick={onChoosePlan} disabled={current}>
        <Text uppercase>
          <FormattedMessage
            id={current ? 'PricingPlans.currentPlan' : 'PricingPlans.start'}
          />
        </Text>
      </Click>
    </Card>
  )
}
