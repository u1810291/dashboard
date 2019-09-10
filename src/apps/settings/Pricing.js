import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { pick, sortBy } from 'lodash';

import { closeOverlay, createOverlay, Items } from 'components';
import { notification } from 'components/notification';
import Feedback from 'fragments/info/feedback';
import {
  CardDeclinedModal,
  CardModal,
  ChangePlanModal,
  CompaniesUsingMati,
  MatiNumbers,
  PricingLargePlans,
  PricingPlans,
  PricingRefundNotice,
} from 'fragments';
import { showIntercom } from 'lib/intercom';
import { trackEvent } from 'lib/mixpanel';
import {
  trackEvent as hubspotTrackEvent,
  hubspotEvents,
} from 'lib/hubspot';

import { setMerchantPlan, addMerchantProvider } from 'state/merchant';
import { getMerchantPlan, getPlans } from 'state/plans';

import { FormattedMessage } from 'react-intl';
import SettingsLayout from './SettingsLayout';

export default function Pricing() {
  const matiToken = useSelector(({ auth = {} }) => auth.token);
  const merchantBilling = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.providers,
  );
  const merchantPlan = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.planDetails,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlanExist, setCurrentPlan] = useState(merchantPlan && merchantPlan.activatedAt);
  const [planList, setPlanList] = useState({});
  const [largeCardsContent, setLargeCardsContent] = useState([]);
  const [smallCardsContent, setSmallCardsContent] = useState([]);
  const smallCardsInRowCount = 3;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPlans(matiToken, currentPage),
    ).then(({ data }) => {
      if (data && data.rows.length) {
        setPlanList(data);
        setCurrentPage(data.page);
        const largeCardsPlans = [];
        const smallCardsPlans = [];
        smallCardsPlans.push(...sortBy(data.rows.filter((plan) => (!plan.isCustom)), ['order']));
        if (smallCardsPlans.length % smallCardsInRowCount === 1) {
          largeCardsPlans.push(smallCardsPlans.pop());
        }
        setSmallCardsContent(smallCardsPlans);
        largeCardsPlans.push(...sortBy(data.rows.filter((plan) => (plan.isCustom)), ['order']));
        setLargeCardsContent(largeCardsPlans);
      }
    });
  }, [matiToken, currentPage, dispatch]);

  useEffect(() => {
    dispatch(
      getMerchantPlan(matiToken),
    ).then(({ data: { planDetails } }) => {
      if (planDetails.activatedAt) {
        setCurrentPlan(planDetails.plan);
      }
    });
  }, [matiToken, dispatch]);

  const handlePlanChange = async (plan) => {
    try {
      await dispatch(
        setMerchantPlan(matiToken, plan._id),
      );

      trackEvent('merchant_plan_changed', {
        ...(pick(plan, ['_id'])),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      setCurrentPlan(plan._id);

      closeOverlay();
    } catch (e) {
      notification.error(
        <>
          <FormattedMessage id="Billing.notification.changeFailure" />
        </>,
      );
    }
  };

  const handleLoad = () => {
    const hasMoreItems = planList.totalPages > currentPage;

    if (hasMoreItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCardSubmit = async (plan, token) => {
    try {
      trackEvent('merchant_entered_cc', {
        ...(pick(plan, ['_id'])),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      await dispatch(
        addMerchantProvider(matiToken, token.id),
      );

      await dispatch(
        setMerchantPlan(matiToken, plan._id),
      );

      setCurrentPlan(plan._id);

      trackEvent('merchant_cc_stored', {
        ...(pick(plan, ['_id'])),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      closeOverlay();
    } catch (e) {
      notification.error(
        <>
          <FormattedMessage id="Billing.notification.setFailure" />
        </>,
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
      ...(pick(plan, ['_id'])),
      subscriptionPrice,
    });

    hubspotTrackEvent(hubspotEvents.startPlan, {
      plan_name: plan.name,
      plan_price: subscriptionPrice,
    });

    if (isPlanExist || merchantBilling.length) {
      createOverlay(
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ChangePlanModal {...plan} onSubmit={() => handlePlanChange(plan)} />,
      );
    } else {
      createOverlay(
        // eslint-disable-next-line react/jsx-props-no-spreading
        <CardModal {...plan} onSubmit={(token) => handleCardSubmit(plan, token)} />,
      );
    }
  };

  const handleChangeMethod = (plan) => {
    createOverlay(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <CardModal {...plan} onSubmit={(token) => handleCardSubmit(plan, token)} />,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan={isPlanExist}>
      <main>
        <Items flow="row" gap={12}>
          {planList.rows && (
            <Items flow="row">
              <Items flow="none" templateColumns={`repeat(${smallCardsInRowCount}, 1fr)`} gap={2}>
                {smallCardsContent.map((plan) => (
                  <PricingPlans
                    name={plan.name}
                    key={plan._id}
                    subscriptionPrice={plan.subscriptionPrice}
                    highlight={plan.highlight}
                    includedVerifications={plan.includedVerifications}
                    onChoosePlan={() => handlePlanClick(plan)}
                    current={isPlanExist && plan._id === isPlanExist}
                  />
                ))}
              </Items>
              <Items flow="none" templateColumns={`repeat(${largeCardsContent.length}, 1fr)`} justifyItems={largeCardsContent.length > 1 ? 'normal' : 'center'}>
                {largeCardsContent.map((plan) => (
                  <PricingLargePlans
                    name={plan.name}
                    isOnePlan={!(largeCardsContent.length > 1)}
                    verificationPrice={plan.extraPrice}
                    subscriptionPrice={plan.subscriptionPrice}
                    current={isPlanExist && plan._id === isPlanExist}
                    key={plan._id}
                    onClick={plan.isCustom ? showIntercom : () => handlePlanClick(plan)}
                  />
                ))}
              </Items>
              <Waypoint onEnter={handleLoad} />
            </Items>
          )}
          <PricingRefundNotice />
          <CompaniesUsingMati />
          <MatiNumbers />
          <Feedback />
        </Items>
      </main>
    </SettingsLayout>
  );
}
