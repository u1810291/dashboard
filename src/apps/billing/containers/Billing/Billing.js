import { Card, closeOverlay, createOverlay, Items, Text } from 'components';
import { PageError, PageLoader } from 'apps/layout';
import Button from 'components/button';
import { notification } from 'components/notification';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { get } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PlanCancelModal } from '../../components/PlanCancelModal/PlanCancelModal';
import { currentPlanLoad, planCancel, planListLoad } from '../../state/billing.actions';
import { selectCardModel, selectCurrentPlanFullModel, selectCurrentPlanId, selectPlanDetailsModel } from '../../state/billing.selectors';
import { useStyles } from './Billing.styles';

export function Billing() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentPlanId = useSelector(selectCurrentPlanId);
  const planDetailsModel = useSelector(selectPlanDetailsModel);
  const currentPlanFullModel = useSelector(selectCurrentPlanFullModel);
  const cardModel = useSelector(selectCardModel);

  useEffect(() => {
    if (planDetailsModel.isLoaded && LoadableAdapter.isPristine(currentPlanFullModel)) {
      dispatch(planListLoad());
    }
  }, [dispatch, planDetailsModel, currentPlanFullModel]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(cardModel)) {
      dispatch(currentPlanLoad());
    }
  }, [dispatch, cardModel]);

  const handleCancelPlan = async () => {
    try {
      await dispatch(planCancel());
      trackEvent(MixPanelEvents.PlanDeclined, {
        ...currentPlanFullModel.value,
      });
      closeOverlay();
    } catch (e) {
      console.error(e);
      notification.error(intl.formatMessage({ id: 'Billing.notification.failure' }));
    }
  };

  const handleCancel = () => {
    createOverlay(
      <PlanCancelModal onSubmit={() => handleCancelPlan()} />,
    );
  };

  if (planDetailsModel.isFailed || currentPlanFullModel.isFailed || cardModel.isFailed) {
    return <PageError />;
  }

  if (!currentPlanFullModel.isLoaded || !cardModel.isLoaded) {
    return <PageLoader />;
  }

  const period = get(currentPlanFullModel, 'value.name') === 'Yearly'
    ? intl.formatMessage({ id: 'PricingPlans.pricePerYear' })
    : intl.formatMessage({ id: 'PricingPlans.pricePerMonth' });

  return (
    <Items flow="row" gap={12}>
      {currentPlanId && cardModel.value && (
        <Card padding={2.5}>
          <Items gap={4} templateColumns="1fr 3fr">
            <Items flow="row" alignContent="top">
              <Text color="gray">
                {intl.formatMessage({ id: 'Billing.form.plan' })}
              </Text>
              <Text size={3}>
                <div className={classes.planActions}>
                  <Items
                    gap={1}
                    templateColumns="3fr 2fr 3fr"
                  >
                    <Text lineHeight={1}>
                      {currentPlanFullModel.value.name}
                    </Text>
                    <Button
                      buttonStyle="primary-revert"
                      onClick={handleCancel}
                    >
                      <Text
                        color="error"
                        textDecoration="underline"
                      >
                        {intl.formatMessage({ id: 'Billing.form.cancel' })}
                      </Text>
                    </Button>
                  </Items>
                </div>
              </Text>
            </Items>
            <Items flow="row">
              <Text color="gray">
                {intl.formatMessage({ id: 'Billing.form.payment' })}
              </Text>
              <Text size={3} lineHeight={0}>
                {intl.formatMessage({ id: 'Billing.form.card' }, {
                  last4: cardModel.value.last4,
                })}
              </Text>
            </Items>
          </Items>
          <Items gap={4} templateColumns="1fr 3fr">
            <Items flow="row">
              <Text color="gray" padding="12px 0 0 0">
                {intl.formatMessage({ id: 'Billing.form.price' })}
              </Text>
              <Text size={3} lineHeight={0}>
                {intl.formatMessage({ id: 'CardModal.planPrice' }, {
                  planPrice: Math.floor(currentPlanFullModel.value.subscriptionPrice / 100),
                  period,
                })}
              </Text>
            </Items>
            <Items flow="row">
              <Text color="gray" padding="12px 0 0 0">
                {intl.formatMessage({ id: 'Billing.form.verification' })}
              </Text>
              <Text size={3} lineHeight={0}>
                {intl.formatMessage({ id: 'Billing.form.verification.data' }, {
                  amount: currentPlanFullModel.value.includedVerifications,
                  period,
                })}
              </Text>
            </Items>
          </Items>
        </Card>
      )}
      {!currentPlanId && (
        <Card padding={2.5}>
          <Items flow="row" alignContent="top">
            <Text color="gray">
              {intl.formatMessage({ id: 'Billing.form.plan' })}
            </Text>
            <Text color="error" size={3} lineHeight={0}>
              {intl.formatMessage({ id: 'Billing.form.cancelPlan' }, {
                planName: currentPlanFullModel.value.name,
                date: moment(planDetailsModel.value.invoiceAt).format('DD MMMM YYYY'),
              })}
            </Text>
          </Items>
        </Card>
      )}
    </Items>
  );
}
