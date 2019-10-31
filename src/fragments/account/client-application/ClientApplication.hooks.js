import confirm from 'components/confirm/Confirm';
import { notification } from 'components/notification';
import { closeOverlay, createOverlay } from 'components/overlay';
import { CardDeclinedModal } from 'fragments';
import { hubspotEvents, trackEvent as hubspotTrackEvent } from 'lib/hubspot';
import { trackEvent } from 'lib/mixpanel';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { addMerchantProvider } from 'state/merchant/merchant.actions';
import CardModal from '../card-modal/CardModal';
import NewWebhookModal from '../new-webhook-modal/NewWebhookModal';

export default ({ application, deleteWebhook, subscribeToWebhook }) => {
  const dispatch = useDispatch();

  const metadata = '{"email":"user@example.com"}';
  const permalink = `${process.env.REACT_APP_SIGNUP_URL}?merchantToken=`
    + `${application.clientId}&metadata=${metadata}`;

  function handleAddNewWebhook() {
    createOverlay(
      <NewWebhookModal onSave={subscribeToWebhook} onClose={closeOverlay} />,
    );
  }

  async function handleDeleteWebhook(id) {
    await confirm(
      <FormattedMessage id="fragments.client_application.confirm_delete_webhook" />,
    );
    return deleteWebhook(id);
  }

  // const { hasProvider, isPlanActivated } = useMerchantBilling();
  const isIntegrationLocked = false;

  const matiToken = useSelector(({ auth = {} }) => auth.token);

  function showCardModal(onSubmit) {
    createOverlay(<CardModal onSubmit={onSubmit} />);
  }

  async function handleCardSubmit(token) {
    try {
      await dispatch(addMerchantProvider(matiToken, token.id));
      closeOverlay();
      trackEvent('merchant_entered_cc_unlock_keys', { success: true });
      hubspotTrackEvent(hubspotEvents.unlockIntegration);
    } catch (error) {
      notification.error(<FormattedMessage
        id="fragments.integration.integration-code.unlock-application.error"
      />);
      trackEvent('merchant_entered_cc_unlock_keys', { success: false });
      createOverlay(
        <CardDeclinedModal onChangeMethod={() => showCardModal(handleCardSubmit)} />,
      );
    }
  }

  function handleUnlockApplication() {
    trackEvent('merchant_clicked_unlock_keys_button');
    showCardModal(handleCardSubmit);
  }

  return {
    handleAddNewWebhook,
    handleDeleteWebhook,
    handleUnlockApplication,
    isIntegrationLocked,
    permalink,
  };
};
