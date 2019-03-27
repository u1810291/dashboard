import React from 'react'
import { FormattedMessage } from 'react-intl'
import Feature from 'src/fragments/account/pricing-features'
import PricingPlan from 'src/fragments/account/pricing-plan'
import Feedback from 'src/fragments/info/feedback'
import Sections from 'src/components/sections'
import SettingsLayout from './SettingsLayout'

export default class Pricing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>
          <FormattedMessage id="apps.settings.pricing" />
        </h1>
        <SettingsLayout>
          <main>
            <Sections extraGap>
              <PricingPlan />
              <Feature />
              <Feedback />
            </Sections>
          </main>
        </SettingsLayout>
      </React.Fragment>
    )
  }
}
