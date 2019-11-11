import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pick } from 'lodash';

import { closeOverlay, createOverlay, Items } from 'components';
import { notification } from 'components/notification';
import { Feedback } from 'fragments/info/feedback';
import {
  CardDeclinedModal,
  CardModal,
  ChangePlanModal,
  CompaniesUsingMati,
  MatiNumbers,
  CustomPlan,
  PricingPlans,
  PricingRefundNotice,
  PlansFeatures,
  RequestDemo,
} from 'fragments';
import { trackEvent } from 'lib/mixpanel';
import {
  trackEvent as hubspotTrackEvent,
  hubspotEvents,
  showWidget,
  requestApi,
  contactProperties,
} from 'lib/hubspot';
import { addMerchantProvider, setMerchantPlan } from 'state/merchant/merchant.actions';

import { getMerchantPlan, getPlans } from 'state/plans/plans.actions';

import { FormattedMessage } from 'react-intl';
import SettingsLayout from './SettingsLayout';

export default function Pricing() {
  const matiToken = useSelector(({ auth = {} }) => auth.token);
  const email = useSelector(({ auth = {} }) => auth.user && auth.user.email);

  const merchantBilling = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.providers,
  );
  const merchantPlan = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.planDetails,
  );

  const planList = useSelector((state) => state.plans.rows.sort((a, b) => a.order - b.order),
  );
  const [currentPlan, setCurrentPlan] = useState(
    merchantPlan && merchantPlan.activatedAt,
  );
  const regularPlans = planList.filter((plan) => !plan.isCustom);
  const customPlans = planList.filter((plan) => plan.isCustom);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getPlans(matiToken));
    },
    [matiToken, dispatch],
  );

  useEffect(
    () => {
      dispatch(getMerchantPlan(matiToken)).then(({ data: { planDetails } }) => {
        if (planDetails.activatedAt) {
          setCurrentPlan(planDetails.plan);
        }
      });
    },
    [matiToken, dispatch],
  );

  const handlePlanChange = async (plan) => {
    try {
      await dispatch(setMerchantPlan(matiToken, plan._id));
      const planPrice = Math.floor(plan.subscriptionPrice / 100);

      requestApi(matiToken, email, { [contactProperties.planName]: plan.name, [contactProperties.planPrice]: planPrice });

      trackEvent('merchant_plan_changed', {
        ...pick(plan, ['_id']),
        subscriptionPrice: planPrice,
      });

      setCurrentPlan(plan._id);

      closeOverlay();
    } catch (e) {
      notification.error(
        <FormattedMessage id="Billing.notification.changeFailure" />,
      );
    }
  };

  const handleCardSubmit = async (plan, token) => {
    try {
      trackEvent('merchant_entered_cc', {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      await dispatch(addMerchantProvider(matiToken, token.id));

      await dispatch(setMerchantPlan(matiToken, plan._id));

      setCurrentPlan(plan._id);

      trackEvent('merchant_cc_stored', {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      closeOverlay();
    } catch (e) {
      notification.error(
        <FormattedMessage id="Billing.notification.setFailure" />,
      );
      createOverlay(
        <CardDeclinedModal
          onChangeMethod={
            () => handleChangeMethod(plan) // eslint-disable-line no-use-before-define
          }
        />,
      );
    }
  };

  const handlePlanClick = (plan) => {
    const subscriptionPrice = Math.floor(plan.subscriptionPrice / 100);

    trackEvent('merchant_clicked_select_plan', {
      ...pick(plan, ['_id']),
      subscriptionPrice,
    });

    hubspotTrackEvent(hubspotEvents.startPlan, {
      plan_name: plan.name,
      plan_price: subscriptionPrice,
    });

    if (currentPlan || merchantBilling.length) {
      createOverlay(
        <ChangePlanModal {...plan} onSubmit={() => handlePlanChange(plan)} />,
      );
    } else {
      createOverlay(
        <CardModal
          {...plan}
          onSubmit={(token) => handleCardSubmit(plan, token)}
        />,
      );
    }
  };

  const handleChangeMethod = (plan) => {
    createOverlay(
      <CardModal
        {...plan}
        onSubmit={(token) => handleCardSubmit(plan, token)}
      />,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan={currentPlan}>
      <main>
        <Items flow="row" gap={12}>
          {!!planList.length && (
            <Items flow="row" gap={2}>
              <PricingRefundNotice />
              <Items flow="column" gap={1} align="stretch" templateColumns="1fr 1fr 1fr 1fr">
                {regularPlans.map((plan) => (
                  <PricingPlans
                    name={plan.name}
                    key={plan._id}
                    subscriptionPrice={plan.subscriptionPrice}
                    highlight={plan.highlight}
                    includedVerifications={plan.includedVerifications}
                    extraPrice={plan.extraPrice}
                    supportLevel={plan.supportLevel}
                    onChoosePlan={() => handlePlanClick(plan)}
                    current={currentPlan && plan._id === currentPlan}
                  />
                ))}
              </Items>
              <Items flow="column" gap={1} templateColumns="1fr 1fr">
                {customPlans.map((plan) => (
                  <CustomPlan
                    name={plan.name}
                    current={currentPlan && plan._id === currentPlan}
                    key={plan._id}
                    onClick={
                      plan.isCustom
                        ? () => showWidget()
                        : () => handlePlanClick(plan)
                    }
                  />
                ))}
                <RequestDemo />
              </Items>
              <PlansFeatures />
            </Items>
          )}
          <CompaniesUsingMati />
          <MatiNumbers />
          <Feedback />
        </Items>
      </main>
    </SettingsLayout>
  );
}
