import { Box, Grid, Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FiSettings } from 'react-icons/fi';
import { useOverlay } from 'apps/overlay';
import { IntegrationType } from 'apps/Integration';
import { ForDevsWebhookModal } from 'apps/forDevelopers/components/ForDevsWebhookModal/ForDevsWebhookModal';
import { useStyles } from './WorkflowBuilderIntegrationDetails.styles';

export function WorkflowBuilderIntegrationDetails() {
  const classes = useStyles();
  const intl = useIntl();
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
              {intl.formatMessage({ id: 'FlowBuilder.integration' })}
            </Box>
            <Button color="primary" variant="text" onClick={handleOpenWebhookModal}>
              <FiSettings size={17} />
              <Box fontWeight="bold" fontSize={14} ml={0.5} component="span">
                {intl.formatMessage({ id: 'forDevs.webhook.button' })}
              </Box>
            </Button>
          </Grid>
        </Box>
        <IntegrationType />
      </Box>
    </Box>
  );
}
