import React, { useCallback, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Modal } from 'apps/overlay';
import { TextFieldSecret, VideoPlayer } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { ReactComponent as PlayIcon } from 'assets/video-player-play.svg';
import { useSelector } from 'react-redux';
import { Webhook, WebhookDocumentationLink, WebhookPreviewImageLink, WebhookVideoLink } from 'models/Webhook.model';
import { useFormatMessage } from 'apps/intl';
import { selectWebhookChangeableWorkflow } from '../../store/WorkflowBuilder.selectors';
import { WebhookInputTypes } from '../../models/WorkflowBuilder.model';
import { useStyles } from './WorkflowWebhookModal.styles';

interface ForDevsWebhookModalInputs {
  [WebhookInputTypes.Secret]: string;
  [WebhookInputTypes.Url]: string;
}

export function WorkflowWebhookModal({ onChange }: {onChange: ({ secret, url }: {secret: string; url: string}) => void }) {
  const classes = useStyles();
  const webhook = useSelector<any, Webhook>(selectWebhookChangeableWorkflow);
  const formatMessage = useFormatMessage();

  const { register, watch, setValue, formState: { errors, submitCount } } = useForm<ForDevsWebhookModalInputs>({
    defaultValues: {
      [WebhookInputTypes.Url]: webhook?.url || '',
      [WebhookInputTypes.Secret]: webhook?.secret || '',
    },
  });

  const urlRegister = register(WebhookInputTypes.Url, { required: formatMessage('validations.required') });
  const secretRegister = register(WebhookInputTypes.Secret, { required: formatMessage('validations.required') });
  const secretWatch = watch(WebhookInputTypes.Secret);
  const urlWatch = watch(WebhookInputTypes.Url);

  const handleRedirect = useCallback(() => {
    window.open(WebhookDocumentationLink, '_blank', 'noopener');
  }, []);

  useEffect(() => {
    onChange({ secret: secretWatch, url: urlWatch });
  }, [onChange, secretWatch, urlWatch]);

  return (
    <Modal className={classes.modal}>
      <Box mb={1}>
        <Typography variant="h4">
          {formatMessage('forDevs.webhook.title')}
        </Typography>
      </Box>
      <Box mb={3.5}>
        <Grid container alignItems="flex-start">
          <Grid item xs={12} lg={7}>
            <Box color="common.black75">
              {formatMessage('forDevs.webhook.description')}
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
                {formatMessage('forDevs.webhook.documentation')}
                <FiExternalLink />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb={4}>
        <Box mb={1}>
          <Typography variant="subtitle2">
            {formatMessage('forDevs.webhook.video')}
          </Typography>
        </Box>
        <Box className={classes.video}>
          <VideoPlayer
            controls
            light={WebhookPreviewImageLink}
            playing
            url={WebhookVideoLink}
            playIcon={<IconButton><PlayIcon /></IconButton>}
          />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <InputLabel className={classes.label}>
            {formatMessage('forDevs.webhook.url')}
          </InputLabel>
          <TextField
            {...urlRegister}
            helperText={errors?.[WebhookInputTypes.Url]?.message}
            error={!!errors[WebhookInputTypes.Url]}
            type="input"
            variant="outlined"
            fullWidth
            placeholder={formatMessage('onboarding.webhooks.placeholders.url')}
            className={classes.input}
            inputProps={{ 'data-qa': QATags.Webhook.Url }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputLabel className={classes.label}>
            {formatMessage('forDevs.webhook.secret')}
          </InputLabel>
          <TextFieldSecret
            {...secretRegister}
            setValue={setValue}
            helperText={errors?.[WebhookInputTypes.Secret]?.message}
            error={!!errors[WebhookInputTypes.Secret]}
            value={secretWatch}
            submitCount={submitCount}
            type="input"
            variant="outlined"
            fullWidth
            placeholder={formatMessage('onboarding.webhooks.placeholders.secret')}
            className={classes.input}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
