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
import { setMerchantPlan, setMerchantToken } from 'state/merchant';
import { getMerchantPlan, getPlans } from 'state/plans';

import SettingsLayout from './SettingsLayout';
import { FormattedMessage } from 'react-intl';

export default function Pricing() {
  const matiToken = useSelector(s => s.auth.token);
  const merchantBilling = useSelector(s => s.merchant.billing.providers);
  const merchantPlan = useSelector(s => s.merchant.billing.planDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlanExist, setCurrentPlan] = useState(merchantPlan && merchantPlan.activatedAt);
  const [planList, setPlanList] = useState({});
  const [customPlans, setCustomPlans] = useState([]);
  const [basicPlans, setBasicPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPlans(matiToken, currentPage),
    ).then(({ data }) => {
      if (data && data.rows.length) {
        setPlanList(data);
        setCurrentPage(data.page);
        setBasicPlans(sortBy(data.rows.filter(plan => (!plan.isCustom)), ['order']));
        setCustomPlans(sortBy(data.rows.filter(plan => (plan.isCustom)), ['order']));
      }
    })
  }, [matiToken, currentPage, dispatch]);

  useEffect(() => {
    dispatch(
      getMerchantPlan(matiToken),
    ).then(({ data: { planDetails } }) => {
      if (!!planDetails.activatedAt) {
        setCurrentPlan(planDetails.plan);
      }
    })
  }, [matiToken, dispatch]);

  const handleCardSubmit = async (plan, token = {}) => {
    try {
      trackEvent('merchant_entered_cc', {
        ...(pick(plan, ['_id'])),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      await dispatch(
        setMerchantToken(matiToken, token.id),
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
          <FormattedMessage id="Billing.notification.setFailure"/>
        </>,
      );
      createOverlay(
        <CardDeclinedModal
          onChangeMethod={handleChangeMethod.bind(this, plan)}
        />,
      );
    }
  };

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
          <FormattedMessage id="Billing.notification.changeFailure"/>
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

  const handlePlanClick = plan => {
    trackEvent('merchant_clicked_select_plan', {
      ...(pick(plan, ['_id'])),
      subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
    });

    if (isPlanExist || merchantBilling.length) {
      createOverlay(
        <ChangePlanModal {...plan} onSubmit={handlePlanChange.bind(this, plan)}/>,
      );
    } else {
      createOverlay(
        <CardModal {...plan} onSubmit={handleCardSubmit.bind(this, plan)}/>,
      );
    }
  };

  const handleChangeMethod = (plan) => {
    createOverlay(
      <CardModal {...plan} onSubmit={handleCardSubmit.bind(this, plan)}/>,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan={isPlanExist}>
      <main>
        <Items flow="row" gap={12}>
          {planList.rows && (
            <Items flow="row">
              <Items flow="none" templateColumns="repeat(3, 1fr)" gap={2}>
                {basicPlans.map(plan => (
                  <PricingPlans
                    key={plan._id}
                    onChoosePlan={handlePlanClick.bind(this, plan)}
                    current={isPlanExist && plan._id === isPlanExist}
                    {...plan}
                  />
                ))}
              </Items>
              <Items flow="none" templateColumns="1fr" justifyItems={customPlans.length > 1 ? 'left': 'center'} gap={2}>
                {customPlans.map(plan => (
                  <PricingLargePlans
                    isOnePlan={!(customPlans.length > 1)}
                    key={plan._id}
                    onClick={showIntercom}
                    {...plan}
                  />
                ))}
              </Items>
              <Waypoint onEnter={handleLoad} />
            </Items>
          )}
          <PricingRefundNotice/>
          <CompaniesUsingMati/>
          <MatiNumbers/>
          <Feedback/>
        </Items>
      </main>
    </SettingsLayout>
  );
}
