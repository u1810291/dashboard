import { Button, Grid, Typography } from '@material-ui/core';
import NewWebhookModal from 'apps/integration/components/NewWebhookModal';
import { useConfirm, useOverlay } from 'apps/overlay';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWebhook, getWebhooks, subscribeToWebhook } from 'state/webhooks/webhooks.actions';
import { selectWebhook } from 'state/webhooks/webhooks.selectors';
import { RemoveButton, useStyles } from './SectionWebhook.styles';

export function SectionWebhook() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhook = useSelector(selectWebhook);
  // eslint-disable-next-line no-undef
  const confirm = useConfirm();
  const [createOverlay, closeOverlay] = useOverlay();

  const handleOnSave = useCallback(async (url, secret) => {
    if (webhook?.id) {
      await dispatch(deleteWebhook(webhook.id));
    }
    await dispatch(subscribeToWebhook({ url, secret }));
    return dispatch(getWebhooks());
  }, [dispatch, webhook]);

  const handleRemoveWebhook = useCallback(async () => {
    try {
      await confirm();
      await dispatch(deleteWebhook(webhook.id));
      dispatch(getWebhooks());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, confirm, webhook.id]);

  const handleOpenModal = useCallback(() => {
    createOverlay(<NewWebhookModal onSave={handleOnSave} onClose={closeOverlay} />);
  }, [handleOnSave, createOverlay, closeOverlay]);

  const secret = webhook.url ? '*'.repeat(16) : '—';
  const url = webhook.url || '—';

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'WebhookSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'WebhookSection.description' })}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          data-qa={QATags.Integration.WebHook.Create}
        >
          {intl.formatMessage({ id: 'WebhookSection.cta' })}
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">{intl.formatMessage({ id: 'WebhookSection.url' })}</Typography>
        <Typography paragraph className={classes.breakAll} data-qa={QATags.Integration.WebHook.URL}>{url}</Typography>
        <Typography variant="h6">{intl.formatMessage({ id: 'WebhookSection.secret' })}</Typography>
        <Typography paragraph data-qa={QATags.Integration.WebHook.Secret}>{secret}</Typography>
        {webhook.url && (
          <RemoveButton variant="outlined" onClick={handleRemoveWebhook} data-qa={QATags.Integration.WebHook.Delete}>
            {intl.formatMessage({ id: 'WebhookSection.delete' })}
          </RemoveButton>
        )}
      </Grid>
    </Grid>
  );
}
