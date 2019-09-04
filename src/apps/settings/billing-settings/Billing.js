import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { pick } from 'lodash';
import moment from 'moment';

import { Items, Card, Text, createOverlay, closeOverlay } from 'components';
import { PlanCancelModal } from 'fragments';
import Button from 'components/button';
import { notification } from 'components/notification';
import { trackEvent } from 'lib/mixpanel';
import { cancelPlan, getPlan, getMerchantPlan } from 'state/plans';

import SettingsLayout from '../SettingsLayout';
import CSS from './Billing.module.scss';

export default function Billing() {
  const token = useSelector(({ auth = {} }) => auth.token);
  const merchantPlanDetails = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.planDetails,
  );
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(false);
  const [merchantPlan, setMerchantPlan] = useState(
    merchantPlanDetails ? merchantPlanDetails.plan : false,
  );
  const [isPlanExist, setCurrentPlan] = useState(merchantPlan && merchantPlan.activatedAt);
  const [card, setCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (merchantPlan) {
      dispatch(
        getPlan(token, merchantPlan),
      ).then(({ data }) => {
        setPlan(data);
      });
    }
  }, [token, merchantPlan, dispatch]);

  useEffect(() => {
    if (merchantPlan) {
      dispatch(
        getMerchantPlan(token),
      ).then(({ data: { cardDetails, planDetails } }) => {
        setCard(cardDetails.last4);
        setMerchantPlan(planDetails.plan);
        setCurrentPlan(!!planDetails.activatedAt);
        setLoading(false);
      });
    }
  }, [token, card, merchantPlan, dispatch]);

  const handleCancelPlan = async () => {
    try {
      await dispatch(
        cancelPlan(token),
      );

      setCard(false);

      trackEvent('merchant_plan_declined', {
        ...(pick(plan)),
      });

      closeOverlay();
    } catch (e) {
      notification.error(
        <>
          <FormattedMessage id="Billing.notification.failure" />
        </>,
      );
    }
  };

  const handleCancel = () => {
    createOverlay(
      <PlanCancelModal onSubmit={() => handleCancelPlan(plan.id)} />,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan>
      {!loading && (
        <main>
          <Items flow="row" gap={12}>
            {(isPlanExist && card) && (
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
                      <FormattedMessage id="Billing.form.card" values={{ last4: card }} />
                    </Text>
                  </Items>
                </Items>
                <Items gap={4} templateColumns="1fr 3fr">
                  <Items flow="row">
                    <Text color="gray" padding="12px 0 0 0">
                      <FormattedMessage id="Billing.form.price" />
                    </Text>
                    <Text size={3} lineHeight={0}>
                      <FormattedMessage id="CardModal.planPrice" values={{ planPrice: Math.floor(plan.subscriptionPrice / 100) }} />
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
            {!isPlanExist && (
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
                        date: moment(plan.invoiceAt).format('DD MMMM YYYY'),
                      }}
                    />
                  </Text>
                </Items>
              </Card>
            )}
          </Items>
        </main>
      )}
    </SettingsLayout>
  );
}
