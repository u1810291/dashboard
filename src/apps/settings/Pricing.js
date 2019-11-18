import { Box } from '@material-ui/core';
import { closeOverlay, createOverlay, Items } from 'components';
import { notification } from 'components/notification';
import Spinner from 'components/spinner';
import { CardDeclinedModal, CardModal, ChangePlanModal, CompaniesUsingMati, CustomPlan, MatiNumbers, PlansFeatures, PricingPlans, PricingRefundNotice, RequestDemo } from 'fragments';
import { Feedback } from 'fragments/info/feedback';
import { contactProperties, hubspotEvents, requestApi, showWidget, trackEvent as hubspotTrackEvent } from 'lib/hubspot';
import { trackEvent } from 'lib/mixpanel';
import { pick } from 'lodash';
import { BlockedPlans } from 'models/Plan.model';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken, selectUserEmail } from 'state/auth/auth.selectors';
import { getCurrentPlan, getPlans, providerAdd, setPlan } from 'state/plans/plans.actions';
import { selectCurrentPlanId, selectPlanList, selectProviders } from 'state/plans/plans.selectors';
import SettingsLayout from './SettingsLayout';

export default function Pricing() {
  const dispatch = useDispatch();
  const planList = useSelector(selectPlanList);
  const matiToken = useSelector(selectAuthToken);
  const email = useSelector(selectUserEmail);
  const providers = useSelector(selectProviders);
  const currentPlanId = useSelector(selectCurrentPlanId);

  const nonblockedList = planList.filter((item) => !BlockedPlans.includes(item._id));
  const regularPlans = nonblockedList.filter((plan) => !plan.isCustom);
  const customPlans = nonblockedList.filter((plan) => plan.isCustom);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    if (currentPlanId) {
      dispatch(getCurrentPlan());
    }
  }, [currentPlanId, dispatch]);

  const handlePlanChange = async (plan) => {
    try {
      await dispatch(setPlan(plan._id));
      const planPrice = Math.floor(plan.subscriptionPrice / 100);

      requestApi(matiToken, email, {
        [contactProperties.planName]: plan.name,
        [contactProperties.planPrice]: planPrice,
      });

      trackEvent('merchant_plan_changed', {
        ...pick(plan, ['_id']),
        subscriptionPrice: planPrice,
      });

      closeOverlay();
    } catch (e) {
      notification.error(
        <FormattedMessage id="Billing.notification.changeFailure" />,
      );
    }
  };

  const handleCardSubmit = async (plan, provider) => {
    try {
      trackEvent('merchant_entered_cc', {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      await dispatch(providerAdd(provider.id));
      await dispatch(setPlan(plan._id));

      trackEvent('merchant_cc_stored', {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      closeOverlay();
    } catch (e) {
      console.error(e);
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

    if (currentPlanId || providers.length) {
      createOverlay(
        <ChangePlanModal
          {...plan}
          onSubmit={() => handlePlanChange(plan)}
        />,
      );
    } else {
      createOverlay(
        <CardModal
          {...plan}
          onSubmit={(provider) => handleCardSubmit(plan, provider)}
        />,
      );
    }
  };

  const handleChangeMethod = (plan) => {
    createOverlay(
      <CardModal
        {...plan}
        onSubmit={(provider) => handleCardSubmit(plan, provider)}
      />,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan={!!currentPlanId}>
      <main>
        <Items flow="row" gap={12}>
          {planList.length === 0
            ? (
              <Box display="flex" alignItems="center">
                <Spinner size="large" />
              </Box>
            )
            : (
              <Items flow="row" gap={2}>
                <PricingRefundNotice />
                <Items flow="column" gap={1} align="stretch" templateColumns={`repeat(${regularPlans.length}, 1fr)`}>
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
                      current={plan._id === currentPlanId}
                    />
                  ))}
                </Items>
                <Items flow="column" gap={1} templateColumns="1fr 1fr">
                  {customPlans.map((plan) => (
                    <CustomPlan
                      name={plan.name}
                      current={plan._id === currentPlanId}
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
