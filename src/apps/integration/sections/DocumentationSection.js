import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { trackEvent } from 'lib/mixpanel';
import { Items, Click, Card } from 'components';
import { H2 } from 'components/text';
import { CopyToClipboard } from 'components/clipboard';
import { notification } from 'components/notification';
import { addMerchantProvider } from 'state/merchant';
import { trackEvent as hubspotTrackEvent, hubspotEvents } from 'lib/hubspot';
import { closeOverlay, createOverlay } from 'components/overlay';
import CardModal from 'fragments/account/card-modal/CardModal';
import { CardDeclinedModal } from 'fragments';
import CSS from './DocumentationSection.module.scss';

export default function DocumentationSection({
  clientId = '',
  clientSecret = '',
  hasProvider,
  matiToken,
}) {
  const dispatch = useDispatch();
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
        <CardDeclinedModal
          onChangeMethod={() => createOverlay(
            <CardModal onSubmit={handleCardSubmit} />,
          )}
        />,
      );
    }
  }

  function handleUnlockApplication() {
    trackEvent('merchant_clicked_unlock_keys_button');
    createOverlay(<CardModal onSubmit={handleCardSubmit} />);
  }

  return (
    <Card flow="column" templateColumns="1fr 1fr 1fr" shadow="2">
      <Items flow="row">
        <H2 weight="2">
          <FormattedMessage id="apps.integration.documentation.title" />
          <p>
            <FormattedMessage id="apps.integration.documentation.subtitle" />
          </p>
        </H2>
        <Click
          as="a"
          href="https://docs.getmati.com"
          border="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="apps.integration.documentation.cta" />
        </Click>
      </Items>
      <div />
      <Items flow="row" className={CSS.fullAreaRoot}>
        <Items
          flow="row"
          className={`${!hasProvider && CSS.fullAreaBackground}`}
        >
          <H2 weight="2">Client ID</H2>
          <CopyToClipboard text={clientId} disabled={!hasProvider}>
            <code>{clientId}</code>
          </CopyToClipboard>
        </Items>
        <Items
          flow="row"
          className={`${!hasProvider && CSS.fullAreaBackground}`}
        >
          <H2 weight="2">Client Secret</H2>
          <CopyToClipboard text={clientSecret} disabled={!hasProvider}>
            <code>{(clientSecret).replace(/./g, '*')}</code>
          </CopyToClipboard>
        </Items>
        {
          !hasProvider && (
            <Items
              className={CSS.fullArea}
              alignContent="center"
              justifyContent="center"
            >
              <Click background="active" onClick={handleUnlockApplication}>
                <FormattedMessage
                  id="fragments.integration.integration-code.unlock-application.button"
                />
              </Click>
            </Items>
          )
        }
      </Items>
    </Card>
  );
}
