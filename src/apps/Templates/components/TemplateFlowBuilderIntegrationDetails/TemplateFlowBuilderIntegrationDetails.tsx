import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './TemplateFlowBuilderIntegrationDetails.styles';
import { TemplateIntegrationType } from '../TemplateIntegrationType/TemplateIntegrationType';

export function TemplateFlowBuilderIntegrationDetails() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Box p={0.4} className={classes.root}>
      <Box p={1.6} className={classes.container}>
        <Box mb={4}>
          <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
            <Box fontWeight="bold" color="common.black90">
              {formatMessage('FlowBuilder.integration')}
            </Box>
          </Grid>
        </Box>
        <TemplateIntegrationType />
      </Box>
    </Box>
  );
}
