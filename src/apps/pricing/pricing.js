import React from 'react'
import { FormattedMessage } from 'react-intl'
import CSS from './pricing-plan.scss'
import Feature from 'src/fragments/pricing/feature'
import PricingPlan from 'src/fragments/pricing/pricing-plan'
import Feedback from 'src/fragments/pricing/feedback'

export default
class Pricing extends React.Component {
  render() {

    return (
      <div className={CSS.content}>

        <PricingPlan />

        <div className="pricing-plan__preferences">
          <h2 className="text-center">
            <FormattedMessage id="pricing.complianceFeature.title" />
          </h2>
          <Feature />
        </div>

        <div className="pricing-plan__clients">
          <h2 className="text-center">
            <FormattedMessage id="pricing.feedbacks.title" />
          </h2>
          <Feedback />
        </div>

      </div>
    )
  }
}