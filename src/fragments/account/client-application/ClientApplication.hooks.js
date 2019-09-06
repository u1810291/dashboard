import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import confirm from 'components/confirm/Confirm';
import { addMerchantProvider } from 'state/merchant';
import { CardDeclinedModal } from 'fragments';
import { closeOverlay, createOverlay } from 'components/overlay';
import { notification } from 'components/notification';
import { trackEvent } from 'lib/mixpanel';

import NewWebhookModal from '../new-webhook-modal/NewWebhookModal';
import CardModal from '../card-modal/CardModal';

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

  const hasProvider = useSelector(({ merchant }) => merchant.billing.providers.length);

  const matiToken = useSelector(({ auth = {} }) => auth.token);
  function showCardModal(onSubmit) {
    createOverlay(<CardModal onSubmit={onSubmit} />);
  }
  async function handleCardSubmit(token) {
    try {
      await dispatch(addMerchantProvider(matiToken, token.id));
      closeOverlay();
      trackEvent('merchant_entered_cc_unlock_keys');
    } catch (error) {
      notification.error(<FormattedMessage
        id="fragments.integration.integration-code.unlock-application.error"
      />);
      createOverlay(
        <CardDeclinedModal onChangeMethod={() => showCardModal(handleCardSubmit)} />,
      );
    }
  }

  return {
    handleAddNewWebhook,
    handleDeleteWebhook,
    handleUnlockApplication: () => showCardModal(handleCardSubmit),
    hasProvider,
    permalink,
  };
};
