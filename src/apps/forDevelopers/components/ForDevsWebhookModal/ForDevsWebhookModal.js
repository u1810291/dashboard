import Modal from 'components/modal';
import { Button, Typography, Box, Grid, InputLabel, IconButton } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from 'formik-material-ui';
import { FiExternalLink } from 'react-icons/fi';
import { selectWebhook } from '../../../../state/webhooks/webhooks.selectors';
import { useStyles } from './ForDevsWebhookModal.styles';
import { deleteWebhook, getWebhooks, subscribeToWebhook } from '../../../../state/webhooks/webhooks.actions';
import { notification } from '../../../../components/notification';
import { VideoPlayer } from '../../../../components';
import { ReactComponent as PlayIcon } from '../../../../assets/video-player-play.svg';

export function ForDevsWebhookModal({ onClose }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhook = useSelector(selectWebhook);
  const currentSecret = webhook.url ? '*'.repeat(16) : '—';
  const currentUrl = webhook.url || '—';

  const handleRedirect = useCallback(() => {
    window.open('https://github.com', '_blank');
  }, []);

  const initialValues = {
    url: currentUrl,
    secret: currentSecret,
  };

  const handleSubmit = useCallback(async ({ url, secret }) => {
    onClose();
    try {
      if (webhook?.id) {
        await dispatch(deleteWebhook(webhook.id));
      }
      await dispatch(subscribeToWebhook({ url, secret }));
      await dispatch(getWebhooks());
      notification.info(intl.formatMessage({ id: 'forDevs.webhook.success' }));
    } catch (error) {
      console.error(error);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, webhook, intl, onClose]);

  return (
    <Modal className={classes.modal}>
      <Typography variant="h4" gutterBottom className={classes.title}>
        {intl.formatMessage({ id: 'forDevs.webhook.title' })}
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        {intl.formatMessage({ id: 'forDevs.webhook.description' })}
      </Typography>
      <Button
        onClick={handleRedirect}
        className={classes.documentation}
        variant="outlined"
        fullWidth
      >
        {intl.formatMessage({ id: 'forDevs.webhook.documentation' })}
        <FiExternalLink />
      </Button>
      <Typography variant="body1" className={classes.subtitle}>
        {intl.formatMessage({ id: 'forDevs.webhook.video' })}
      </Typography>
      <VideoPlayer
        controls
        light="https://img.youtube.com/vi/7yzZcAj24AI/maxresdefault.jpg"
        playing
        muted
        url="https://media.w3.org/2010/05/sintel/trailer.mp4"
        playIcon={<IconButton><PlayIcon /></IconButton>}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container direction="column">
              <Grid item className={classes.inputWrapper}>
                <InputLabel className={classes.label}>
                  {intl.formatMessage({ id: 'forDevs.webhook.url' })}
                </InputLabel>
                <Field
                  name="url"
                  type="input"
                  variant="outlined"
                  fullWidth
                  component={TextField}
                />
              </Grid>
              <Grid item className={classes.inputWrapper}>
                <InputLabel className={classes.label}>
                  {intl.formatMessage({ id: 'forDevs.webhook.secret' })}
                </InputLabel>
                <Field
                  name="secret"
                  type="input"
                  variant="outlined"
                  fullWidth
                  component={TextField}
                />
              </Grid>
            </Grid>
            <Box align="right">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
                disabled={isSubmitting}
                className={classes.button}
              >
                {intl.formatMessage({ id: 'forDevs.webhook.submit' })}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
