import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Items, createOverlay, closeOverlay } from 'components'
import Feedback from 'fragments/info/feedback'
import {
  PricingPlans,
  PricingRefundNotice,
  PricingLargePlans,
  CompaniesUsingMati,
  MatiNumbers,
  CheckoutModal
} from 'fragments'
import { notification } from 'components/notification'
import { showIntercom } from 'lib/intercom'
import { saveConfiguration } from 'state/merchant'
import client from 'lib/client'
import SettingsLayout from './SettingsLayout'

const PLANS = [
  { planId: 'starter', amount: '120', planPrice: '187', extraPrice: '1.56' },
  {
    planId: 'regular',
    amount: '300',
    planPrice: '399',
    extraPrice: '1.33',
    highlight: true
  },
  { planId: 'growth', amount: '800', planPrice: '799', extraPrice: '0.99' }
]

export default function Pricing() {
  const dashboardData = useSelector(s => s.merchant.configuration.dashboard)
  const matiToken = useSelector(s => s.auth.token)
  const fullName = useSelector(s => s.merchant.displayName)
  const clientId = useSelector(s => s.merchant.id)
  const dispatch = useDispatch()

  const handlePlanClick = plan => {
    createOverlay(
      <CheckoutModal {...plan} onSubmit={handleCardSubmit.bind(this, plan)} />
    )
  }

  const handleCardSubmit = async (plan, token = {}) => {
    try {
      const { data } = await client.stripe.createClient(
        token.id,
        fullName,
        clientId
      )
      await dispatch(
        saveConfiguration(matiToken, {
          dashboard: {
            ...dashboardData,
            planId: plan.planId,
            stripeClientId: data.id
          }
        })
      )
      notification.success(
        <FormattedMessage id="Pricing.notification.success" />
      )
      closeOverlay()
    } catch (e) {
      notification.error(<FormattedMessage id="Pricing.notification.failure" />)
    }
  }

  return (
    <SettingsLayout aside={false}>
      <main>
        <Items flow="row" gap={12}>
          <Items flow="row" gap={4}>
            <Items>
              {PLANS.map(plan => (
                <PricingPlans
                  key={plan.planId}
                  onChoosePlan={handlePlanClick.bind(this, plan)}
                  current={plan.planId === dashboardData.planId}
                  {...plan}
                />
              ))}
            </Items>
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
