import React, { useCallback, useState } from 'react';
import { FiExternalLink, FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import { notification, TextFieldSecret, VideoPlayer } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { deleteWebhook, getWebhooks, subscribeToWebhook } from 'state/webhooks/webhooks.actions';
import { selectWebhook } from 'state/webhooks/webhooks.selectors';
import { ReactComponent as PlayIcon } from 'assets/video-player-play.svg';
import { ForDevelopersInputTypes } from '../../models/ForDevelopers.model';
import { useStyles } from './ForDevsWebhookModal.styles';

interface ForDevsWebhookModalInputs {
  [ForDevelopersInputTypes.Secret]: string;
  [ForDevelopersInputTypes.Url]: string;
}

export function ForDevsWebhookModal() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhook = useSelector<any, { secret: string; url: string; id: string }>(selectWebhook);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue, formState: { errors, submitCount } } = useForm<ForDevsWebhookModalInputs>({
    defaultValues: {
      [ForDevelopersInputTypes.Url]: webhook?.url || '',
      [ForDevelopersInputTypes.Secret]: webhook?.secret || '',
    },
  });

  const urlRegister = register(ForDevelopersInputTypes.Url, { required: intl.formatMessage({ id: 'validations.required' }) });
  const secretRegister = register(ForDevelopersInputTypes.Secret, { required: intl.formatMessage({ id: 'validations.required' }) });
  const secretWatch = watch(ForDevelopersInputTypes.Secret);

  const handleFormSubmit: SubmitHandler<ForDevsWebhookModalInputs> = useCallback(async (data) => {
    try {
      setIsSubmitting(true);
      if (webhook?.id) {
        await dispatch(deleteWebhook(webhook.id));
      }
      await dispatch(subscribeToWebhook(data));
      await dispatch(getWebhooks());
      setIsSubmitting(false);
      notification.info(intl.formatMessage({ id: 'forDevs.webhook.success' }));
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, webhook, intl]);

  const handleRedirect = useCallback(() => {
    window.open('https://docs.getmati.com/#webhooks-verification-callbacks', '_blank');
  }, []);

  return (
    <Modal className={classes.modal}>
      <Box mb={1}>
        <Typography variant="h4">
          {intl.formatMessage({ id: 'forDevs.webhook.title' })}
        </Typography>
      </Box>
      <Box mb={3.5}>
        <Grid container alignItems="flex-start">
          <Grid item xs={12} lg={7}>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'forDevs.webhook.description' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box ml={{ xs: 0, lg: 4 }} mt={{ xs: 2, lg: 0 }}>
              <Button
                onClick={handleRedirect}
                className={classes.documentation}
                variant="outlined"
                fullWidth
                data-qa={QATags.Webhook.Doc}
              >
                {intl.formatMessage({ id: 'forDevs.webhook.documentation' })}
                <FiExternalLink />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb={4}>
        <Box mb={1}>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: 'forDevs.webhook.video' })}
          </Typography>
        </Box>
        <Box className={classes.video}>
          <VideoPlayer
            controls
            light="https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BWebhooks.png"
            playing
            url="https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Webhooks.mp4"
            playIcon={<IconButton><PlayIcon /></IconButton>}
          />
        </Box>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <InputLabel className={classes.label}>
              {intl.formatMessage({ id: 'forDevs.webhook.url' })}
            </InputLabel>
            <TextField
              {...urlRegister}
              helperText={errors?.[ForDevelopersInputTypes.Url]?.message}
              error={!!errors[ForDevelopersInputTypes.Url]}
              type="input"
              variant="outlined"
              fullWidth
              placeholder={intl.formatMessage({ id: 'onboarding.webhooks.placeholders.url' })}
              className={classes.input}
              inputProps={{ 'data-qa': QATags.Webhook.Url }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputLabel className={classes.label}>
              {intl.formatMessage({ id: 'forDevs.webhook.secret' })}
            </InputLabel>
            <TextFieldSecret
              {...secretRegister}
              setValue={setValue}
              helperText={errors?.[ForDevelopersInputTypes.Secret]?.message}
              error={!!errors[ForDevelopersInputTypes.Secret]}
              value={secretWatch}
              submitCount={submitCount}
              type="input"
              variant="outlined"
              fullWidth
              placeholder={intl.formatMessage({ id: 'onboarding.webhooks.placeholders.secret' })}
              className={classes.input}
            />
          </Grid>
        </Grid>
        <Box mt={4} textAlign="right">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disableElevation
            disabled={isSubmitting}
            className={classes.button}
            data-qa={QATags.Webhook.Save}
          >
            <FiSave />
            {intl.formatMessage({ id: 'forDevs.webhook.submit' })}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
