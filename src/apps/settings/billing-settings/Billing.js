import { Box } from '@material-ui/core';
import { Card, closeOverlay, createOverlay, Items, Text } from 'components';
import Button from 'components/button';
import { notification } from 'components/notification';
import Spinner from 'components/spinner';
import { PlanCancelModal } from 'fragments';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { cancelPlan, getCurrentPlan, getPlan } from 'state/plans/plans.actions';
import { selectCardDetails, selectCurrentPlan, selectCurrentPlanId, selectPlanDetails } from 'state/plans/plans.selectors';
import SettingsLayout from '../SettingsLayout';
import CSS from './Billing.module.scss';

export default function Billing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentPlanId = useSelector(selectCurrentPlanId);
  const currentPlan = useSelector(selectCurrentPlan);
  const planDetails = useSelector(selectPlanDetails);
  const card = useSelector(selectCardDetails);

  useEffect(() => {
    if (planDetails && planDetails.plan) {
      dispatch(getPlan(planDetails.plan)).then(() => {
        setLoading(false);
      });
    }
    return () => setLoading(true);
  }, [planDetails, dispatch]);

  useEffect(() => {
    if (currentPlanId) {
      dispatch(getCurrentPlan()).then(() => {
        setLoading(false);
      });
    }
    return () => setLoading(true);
  }, [currentPlanId, dispatch]);

  const handleCancelPlan = async () => {
    try {
      await dispatch(cancelPlan());
      trackEvent(MixPanelEvents.PlanDeclined, {
        ...currentPlan,
      });
      closeOverlay();
    } catch (e) {
      console.error(e);
      notification.error(
        <>
          <FormattedMessage id="Billing.notification.failure" />
        </>,
      );
    }
  };

  const handleCancel = () => {
    createOverlay(
      <PlanCancelModal onSubmit={() => handleCancelPlan()} />,
    );
  };

  return (
    <SettingsLayout aside={false} hasMerchantPlan>
      {loading
        ? (
          <Box display="flex" alignItems="center">
            <Spinner size="large" />
          </Box>
        )
        : (
          <main>
            <Items flow="row" gap={12}>
              {(!!currentPlanId && card) && (
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
                              {currentPlan.name}
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
                        <FormattedMessage id="Billing.form.card" values={{ last4: card.last4 }} />
                      </Text>
                    </Items>
                  </Items>
                  <Items gap={4} templateColumns="1fr 3fr">
                    <Items flow="row">
                      <Text color="gray" padding="12px 0 0 0">
                        <FormattedMessage id="Billing.form.price" />
                      </Text>
                      <Text size={3} lineHeight={0}>
                        <FormattedMessage id="CardModal.planPrice" values={{ planPrice: Math.floor(currentPlan.subscriptionPrice / 100) }} />
                      </Text>
                    </Items>
                    <Items flow="row">
                      <Text color="gray" padding="12px 0 0 0">
                        <FormattedMessage id="Billing.form.verification" />
                      </Text>
                      <Text size={3} lineHeight={0}>
                        <FormattedMessage id="Billing.form.verification.data" values={{ amount: currentPlan.includedVerifications }} />
                      </Text>
                    </Items>
                  </Items>
                </Card>
              )}
              {!currentPlanId && (
                <Card padding={2.5}>
                  <Items flow="row" alignContent="top">
                    <Text color="gray">
                      <FormattedMessage id="Billing.form.plan" />
                    </Text>
                    <Text color="error" size={3} lineHeight={0}>
                      <FormattedMessage
                        id="Billing.form.cancelPlan"
                        values={{
                          planName: currentPlan.name,
                          date: moment(planDetails.invoiceAt).format('DD MMMM YYYY'),
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
