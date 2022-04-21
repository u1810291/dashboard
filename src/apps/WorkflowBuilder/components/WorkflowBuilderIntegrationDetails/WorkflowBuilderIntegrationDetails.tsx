import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FiSettings } from 'react-icons/fi';
import { useOverlay } from 'apps/overlay';
import { IntegrationType } from 'apps/Integration';
import { useDispatch } from 'react-redux';
import { IWorkflow } from 'models/Workflow.model';
import { workflowBuilderChangeableFlowUpdate } from '../../store/WorkflowBuilder.action';
import { WorkflowWebhookModal } from '../WorkflowWebhookModal/WorkflowWebhookModal';
import { useStyles } from './WorkflowBuilderIntegrationDetails.styles';

export function WorkflowBuilderIntegrationDetails() {
  const classes = useStyles();
  const intl = useIntl();
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();

  const handleUpdateWebhook = useCallback((data: unknown) => {
    dispatch(workflowBuilderChangeableFlowUpdate({ workflowSetting: { webhook: data } } as Partial<IWorkflow>));
  }, [dispatch]);

  const handleOpenWebhookModal = useCallback(() => {
    createOverlay(<WorkflowWebhookModal onChange={handleUpdateWebhook} />);
  }, [createOverlay, handleUpdateWebhook]);

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
