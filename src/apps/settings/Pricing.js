import React from 'react'
import Items from 'src/components/items'
import Feature from 'src/fragments/account/pricing-features'
import PricingPlan from 'src/fragments/account/pricing-plan'
import Feedback from 'src/fragments/info/feedback'

export default class Pricing extends React.Component {
  render() {
    return (
      <main>
        <Items flow="row" gap={4}>
          <PricingPlan />
          <Feature />
          <Feedback />
        </Items>
      </main>
    )
  }
}
