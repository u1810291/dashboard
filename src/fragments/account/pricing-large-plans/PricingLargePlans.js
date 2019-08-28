import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Items, Card, Text, Click } from 'components'

import CSS from './PricingLargePlans.module.scss'

function Plan({ title, price, isOnePlan, onClick }) {
  return (
    <Card justifyItems="center" padding={2} className={classNames({ [CSS.singlePlan]: isOnePlan })}>
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

export default function PricingLargePlans({ name, subscriptionPrice, isOnePlan, onClick = () => {} }) {
  return (
    <Items>
      <Plan
        isOnePlan={isOnePlan}
        title={name}
        price={+subscriptionPrice ?
          <FormattedMessage id="CardModal.planPrice" values={{ planPrice: Math.floor(subscriptionPrice / 100) }} />
          : subscriptionPrice
        }
        onClick={onClick}
      />
    </Items>
  )
}
