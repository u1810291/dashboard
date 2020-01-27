import { Box, Grid } from '@material-ui/core';
import { planListLoad, planUpdate, providerListUpdate } from 'apps/billing/state/billing.actions';
import { selectCurrentPlanId, selectPlanDetailsModel, selectCustomPlanCollection, selectPlanCollection, selectProviderCollection, selectRegularPlanCollection } from 'apps/billing/state/billing.selectors';
import { closeOverlay, createOverlay } from 'components';
import { notification } from 'components/notification';
import Spinner from 'components/spinner';
import { contactProperties, hubspotEvents, trackEvent as hubspotTrackEvent } from 'lib/hubspot';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { pick } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { hubspotTrack } from 'state/hubspot/hubspot.actions';
import { CardDeclinedModal } from '../CardDeclinedModal/CardDeclinedModal';
import CardModal from '../CardModal/CardModal';
import ChangePlanModal from '../ChangePlanModal/ChangePlanModal';
import { PricingPlans } from '../PricingPlans/PricingPlans';

export function PlanList() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const planList = useSelector(selectPlanCollection);
  const currentPlanId = useSelector(selectCurrentPlanId);
  const regularPlanList = useSelector(selectRegularPlanCollection);
  const customPlanList = useSelector(selectCustomPlanCollection);
  const planDetailsModel = useSelector(selectPlanDetailsModel);
  const providerList = useSelector(selectProviderCollection);

  useEffect(() => {
    if (planDetailsModel.isLoaded && LoadableAdapter.isPristine(planList)) {
      dispatch(planListLoad());
    }
  }, [dispatch, planList, planDetailsModel]);

  const handlePlanChange = useCallback(async (plan) => {
    try {
      await dispatch(planUpdate(plan._id));
      const planPrice = Math.floor(plan.subscriptionPrice / 100);

      dispatch(hubspotTrack({
        [contactProperties.planName]: plan.name,
        [contactProperties.planPrice]: planPrice,
      }));

      trackEvent(MixPanelEvents.PlanChanged, {
        ...pick(plan, ['_id']),
        subscriptionPrice: planPrice,
      });

      closeOverlay();
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Billing.notification.changeFailure' }));
    }
  }, [dispatch, intl]);

  const handleCardSubmit = async (plan, provider) => {
    try {
      trackEvent(MixPanelEvents.CCEntered, {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      await dispatch(providerListUpdate(provider.id));
      await dispatch(planUpdate(plan._id));

      trackEvent(MixPanelEvents.CCStored, {
        ...pick(plan, ['_id']),
        subscriptionPrice: Math.floor(plan.subscriptionPrice / 100),
      });

      closeOverlay();
    } catch (e) {
      console.error(e);
      notification.error(intl.formatMessage({ id: 'Billing.notification.setFailure' }));
      // eslint-disable-next-line no-use-before-define
      createOverlay(<CardDeclinedModal onChangeMethod={() => handleChangeMethod(plan)} />);
    }
  };

  const handleChangeMethod = (plan) => {
    createOverlay(<CardModal plan={plan} onSubmit={handleCardSubmit} />);
  };

  const handlePlanClick = (plan) => {
    const subscriptionPrice = Math.floor(plan.subscriptionPrice / 100);

    trackEvent(MixPanelEvents.PlanSelect, {
      ...pick(plan, ['_id']),
      subscriptionPrice,
    });

    hubspotTrackEvent(hubspotEvents.startPlan, {
      plan_name: plan.name,
      plan_price: subscriptionPrice,
    });

    if (currentPlanId || providerList.value.length) {
      createOverlay(<ChangePlanModal plan={plan} onSubmit={handlePlanChange} />);
    } else {
      createOverlay(<CardModal plan={plan} onSubmit={handleCardSubmit} />);
    }
  };

  if (!planList.isLoaded) {
    return (
      <Box display="flex" alignItems="center">
        <Spinner size="large" />
      </Box>
    );
  }

  // Make the list for Pricing page, might be refactored later
  const planListOutput = [
    ...regularPlanList.value,
    ...customPlanList.value,
  ].filter((item) => !item.isArchived);

  return (
    <Grid container spacing={2}>
      {planListOutput.map((plan) => (
        <PricingPlans
          name={plan.name}
          current={plan._id === currentPlanId}
          extraPrice={plan.extraPrice}
          isCustom={plan.isCustom}
          subscriptionPrice={plan.subscriptionPrice}
          onChoosePlan={() => handlePlanClick(plan)}
          key={plan._id}
          highlight={plan.highlight}
          includedVerifications={plan.includedVerifications}
          supportLevel={plan.supportLevel}
        />
      ))}
    </Grid>
  );
}
