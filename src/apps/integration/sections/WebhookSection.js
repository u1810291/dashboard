import { Button, Grid, Typography } from '@material-ui/core';
import confirm from 'components/confirm';
import { closeOverlay, createOverlay } from 'components/overlay';
import NewWebhookModal from 'fragments/account/new-webhook-modal/NewWebhookModal';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWebhook, getWebhooks, subscribeToWebhook } from 'state/webhooks/webhooks.actions';
import { selectWebhook } from 'state/webhooks/webhooks.selectors';
import { RemoveButton, useStyles } from './WebhookSection.styles';

export function WebhookSection({ clientId }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhook = useSelector(selectWebhook);

  useEffect(() => {
    if (clientId) {
      dispatch(getWebhooks(clientId));
    }
  }, [dispatch, clientId]);

  const handleOnSave = useCallback(async (url, secret) => {
    if (webhook.id) {
      await dispatch(deleteWebhook(clientId, webhook.id));
    }
    await dispatch(subscribeToWebhook(clientId, { url, secret }));
    return dispatch(getWebhooks(clientId));
  }, [dispatch, clientId, webhook.id]);

  const handleRemoveWebhook = useCallback(async () => {
    try {
      await confirm();
      await dispatch(deleteWebhook(clientId, webhook.id));
      dispatch(getWebhooks(clientId));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, clientId, webhook.id]);

  const handleOpenModal = useCallback(() => {
    createOverlay(<NewWebhookModal onSave={handleOnSave} onClose={closeOverlay} />);
  }, [handleOnSave]);

  const secret = webhook.url ? '*'.repeat(16) : '—';
  const url = webhook.url || '—';

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'WebhookSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'WebhookSection.description' })}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          {intl.formatMessage({ id: 'WebhookSection.cta' })}
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6">{intl.formatMessage({ id: 'WebhookSection.url' })}</Typography>
        <Typography paragraph className={classes.breakAll}>{url}</Typography>
        <Typography variant="h6">{intl.formatMessage({ id: 'WebhookSection.secret' })}</Typography>
        <Typography paragraph>{secret}</Typography>
        {webhook.url && (
          <RemoveButton
            onClick={handleRemoveWebhook}
          >
            {intl.formatMessage({ id: 'WebhookSection.delete' })}
          </RemoveButton>
        )}
      </Grid>
    </Grid>
  );
}
