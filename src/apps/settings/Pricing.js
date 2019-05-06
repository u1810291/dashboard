import React from 'react'
import Items from 'components/items'
import Feature from 'fragments/account/pricing-features'
import PricingPlan from 'fragments/account/pricing-plan'
import Feedback from 'fragments/info/feedback'

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
