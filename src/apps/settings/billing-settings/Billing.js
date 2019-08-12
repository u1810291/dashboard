import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { pick } from 'lodash'
import moment from 'moment'
import { Items, Card, Text, createOverlay, closeOverlay } from 'components'
import { PlanCancelModal } from 'fragments'
import Button from 'components/button'
import { notification } from 'components/notification'
import { trackEvent } from 'lib/mixpanel'
import { cancelPlan, getPlan } from 'state/plans'

import SettingsLayout from '../SettingsLayout'
import CSS from './Billing.module.scss'

export default function Billing() {
  const token = useSelector(s => s.auth.token);
  const merchantBillingProviders = useSelector(s => s.merchant.billing.providers);
  const merchantPlanDetails = useSelector(s => s.merchant.billing.planDetails);
  const [plan, setPlan] = useState({});
  const dispatch = useDispatch();
  const hasMerchantPlan = merchantPlanDetails && merchantPlanDetails.plan;
  const hadMerchantPlan = merchantPlanDetails && !merchantPlanDetails.activatedAt && merchantPlanDetails.invoiceAt;
  const card = merchantBillingProviders &&
    merchantBillingProviders.filter(provider => provider.name === 'stripe')[0].data.card;

  useEffect(() => {
    dispatch(
      getPlan(token, merchantPlanDetails.plan),
    ).then(({ data }) => {
      setPlan(data);
    })
  }, [token, merchantPlanDetails.plan, dispatch]);

  const handleCancelPlan = async () => {
    try {
      await dispatch(
        cancelPlan(token),
      );
      trackEvent('merchant_plan_declined', {
        ...(pick(merchantPlanDetails.plan, ['_id'])),
      });
      closeOverlay();
    } catch (e) {
      notification.error(
        <>
          <FormattedMessage id="Billing.notification.failure"/>
        </>,
      );
    }
  };

  const handleCancel = () => {
    createOverlay(
      <PlanCancelModal onSubmit={handleCancelPlan.bind(this, merchantPlanDetails.plan)} />
    )
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan>
      <main>
        <Items flow="row" gap={12}>
          {hasMerchantPlan && (
            <Card padding={2.5}>
              <Items gap={4} templateColumns="1fr 3fr">
                <Items flow="row" alignContent="top">
                  <Text color="gray">
                    <FormattedMessage id="Billing.form.plan" />
                  </Text>
                  <Text size={3}>
                    <div className={CSS.planActions}>
                      <Items
                        gap={1}
                        templateColumns="3fr 2fr 3fr"
                      >
                        <Text lineHeight={1}>
                          {plan.name}
                        </Text>
                        <Button
                          buttonStyle="primary-revert"
                          href="/settings/pricing"
                        >
                          <Text
                            color="active"
                            textDecoration="underline"
                          >
                            <FormattedMessage id="Billing.form.change" />
                          </Text>
                        </Button>
                        <Button
                          buttonStyle="primary-revert"
                          onClick={handleCancel}
                        >
                          <Text
                            color="error"
                            textDecoration="underline"
                          >
                            <FormattedMessage id="Billing.form.cancel" />
                          </Text>
                        </Button>
                      </Items>
                    </div>
                  </Text>
                </Items>
                <Items flow="row">
                  <Text color="gray">
                    <FormattedMessage id="Billing.form.payment" />
                  </Text>
                  <Text size={3} lineHeight={0}>
                    <FormattedMessage id="Billing.form.card" values={{ last4: card && card.last4 }} />
                  </Text>
                </Items>
              </Items>
              <Items gap={4} templateColumns="1fr 3fr">
                <Items flow="row">
                  <Text color="gray" padding="12px 0 0 0">
                    <FormattedMessage id="Billing.form.price" />
                  </Text>
                  <Text size={3} lineHeight={0}>
                    <FormattedMessage id="CardModal.planPrice" values={{ planPrice: plan.subscriptionPrice }} />
                  </Text>
                </Items>
                <Items flow="row">
                  <Text color="gray" padding="12px 0 0 0">
                    <FormattedMessage id="Billing.form.verification" />
                  </Text>
                  <Text size={3} lineHeight={0}>
                    <FormattedMessage id="Billing.form.verification.data" values={{ amount: plan.includedVerifications }} />
                  </Text>
                </Items>
              </Items>
            </Card>
          )}
          {hadMerchantPlan && (
            <Card padding={2.5}>
              <Items flow="row" alignContent="top">
                <Text color="gray">
                  <FormattedMessage id="Billing.form.plan" />
                </Text>
                <Text color="error" size={3} lineHeight={0}>
                  <FormattedMessage
                    id="Billing.form.cancelPlan"
                    values={{
                      planName: plan.name,
                      date: moment(plan.invoiceAt).format('DD MMMM YYYY')
                    }} />
                </Text>
              </Items>
            </Card>
          )}
        </Items>
      </main>
    </SettingsLayout>
  )
}
