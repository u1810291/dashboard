import React from 'react'
import { Items, Card, Click } from 'components'

const PLANS = [
  { name: 'starter', amount: 105, price: 187 },
  { name: 'starter', amount: 105, price: 187, color: 'pistachio' },
  { name: 'starter', amount: 105, price: 187 }
]

export default function PricingPlans() {
  return (
    <Items gap={1}>
      {PLANS.map(plan => (
        <Card>
          <Click>{plan.name}</Click>
        </Card>
      ))}
    </Items>
  )
}
