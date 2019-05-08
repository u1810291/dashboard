import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Items, Card, Click, Text, H2 } from 'components'

const PLANS = [
  { name: 'starter', amount: 120, price: 187 },
  { name: 'regular', amount: 300, price: 399, color: 'pistachio' },
  { name: 'growth', amount: 800, price: 799 }
]

export default function PricingPlans({ onChoosePlan = () => {} }) {
  return (
    <Items>
      {PLANS.map(plan => (
        <Card gap={4} background={plan.color}>
          <Items flow="row" gap={2}>
            <H2>
              <FormattedMessage id={`PricingPlans.${plan.name}.title`} />
            </H2>
            <Items gap={0} flow="row">
              <Text size={4} weight="1">
                <FormattedMessage id="PricingPlans.upTo" />
              </Text>
              <Text size={16} weight={4}>
                {plan.amount}
              </Text>
              <Text size={4} weight="1">
                <FormattedMessage id="PricingPlans.verificationsPerMonth" />
              </Text>
            </Items>
          </Items>
          <Items justifyItems="center" flow="row" gap={1}>
            <section>
              <Text size={4} weight={4}>
                ${plan.price}
              </Text>
              <Text size={4}>
                <FormattedMessage id="PricingPlans.pricePerMonth" />
              </Text>
            </section>
            <Text weight={1} color="secondary">
              <FormattedMessage id="PricingPlans.limitationsNotice" />
            </Text>
          </Items>
          <Click
            background="active"
            onClick={onChoosePlan.bind(null, plan.name)}
          >
            <Text uppercase>
              <FormattedMessage id="PricingPlans.start" />
            </Text>
          </Click>
        </Card>
      ))}
    </Items>
  )
}
