import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useOverlay } from 'apps/overlay';
import { IntegrationType } from 'apps/Integration';
import { ForDevsWebhookModal } from 'apps/forDevelopers/components/ForDevsWebhookModal/ForDevsWebhookModal';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './FlowBuilderIntegrationDetails.styles';

export function FlowBuilderIntegrationDetails() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [createOverlay] = useOverlay();

  const handleOpenWebhookModal = useCallback(() => {
    createOverlay(<ForDevsWebhookModal />);
  }, [createOverlay]);

  return (
    <Box p={0.4} className={classes.root}>
      <Box p={1.6} className={classes.container}>
        <Box mb={4}>
          <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
            <Box fontWeight="bold" color="common.black90">
              {formatMessage('FlowBuilder.integration')}
            </Box>
            <Button color="primary" variant="text" onClick={handleOpenWebhookModal}>
              <FiSettings size={17} />
              <Box fontWeight="bold" fontSize={14} ml={0.5} component="span">
                {formatMessage('forDevs.webhook.button')}
              </Box>
            </Button>
          </Grid>
        </Box>
        <IntegrationType />
      </Box>
    </Box>
  );
}
