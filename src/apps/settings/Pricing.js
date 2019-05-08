import React from 'react'
import Items from 'components/items'
import Feedback from 'fragments/info/feedback'
import {
  PricingPlans,
  PricingRefundNotice,
  PricingLargePlans,
  CompaniesUsingMati,
  MatiNumbers
} from 'fragments'
import { showIntercom } from 'lib/intercom'
import SettingsLayout from './SettingsLayout'

export default class Pricing extends React.Component {
  render() {
    return (
      <SettingsLayout aside={false}>
        <main>
          <Items flow="row" gap={12}>
            <Items flow="row" gap={4}>
              <PricingPlans onChoosePlan={showIntercom} />
              <PricingRefundNotice />
            </Items>
            <PricingLargePlans onClick={showIntercom} />
            <CompaniesUsingMati />
            <MatiNumbers />
            <Feedback />
          </Items>
        </main>
      </SettingsLayout>
    )
  }
}
