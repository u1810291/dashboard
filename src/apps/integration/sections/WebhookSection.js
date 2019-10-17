import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Items, Click, Card, Text } from 'components';
import { H2 } from 'components/text';
import NewWebhookModal from 'fragments/account/new-webhook-modal/NewWebhookModal';
import { closeOverlay, createOverlay } from 'components/overlay';
import confirm from 'components/confirm';

export default function WebhookSection({ webhook, setWebhook, removeWebhook }) {
  const openWebhookModal = useCallback(
    () => {
      createOverlay(
        <NewWebhookModal onSave={setWebhook} onClose={closeOverlay} />,
      );
    },
    [setWebhook],
  );

  const handleRemoveWebhook = useCallback(async () => {
    try {
      await confirm();
      removeWebhook();
    } catch (e) {} // eslint-disable-line no-empty
  }, [removeWebhook]);

  return (
    <Card flow="column" align="center" autoColumns="1fr 1fr 1fr" shadow="2">
      <Items flow="row">
        <H2 weight="2">
          <FormattedMessage id="apps.integration.webhookform.title" />
          <p>
            <FormattedMessage id="apps.integration.webhookform.subtitle" />
          </p>
        </H2>
        <Click background="active" onClick={openWebhookModal}>
          <FormattedMessage id="apps.integration.webhookform.cta" />
        </Click>
      </Items>
      <div />
      <Items flow="row">
        <H2 weight="2">
          <FormattedMessage id="apps.integration.webhookform.url" />
          <Text as="p" wordBreak="break-all">
            {webhook.url || '—'}
          </Text>
        </H2>
        <H2 weight="2">
          <FormattedMessage id="apps.integration.webhookform.secret" />
          <p>{webhook.url ? '*'.repeat(16) : '—'}</p>
        </H2>
        {webhook.url && (
          <Click
            justifyContent="start"
            padding="0"
            hoverShadow={false}
            onClick={handleRemoveWebhook}
          >
            <Text color="error">
              <FormattedMessage id="apps.integration.webhookform.delete" />
            </Text>
          </Click>
        )}
      </Items>
    </Card>
  );
}
