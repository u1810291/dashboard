import { Box, Paper, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectCurrentFlowId, selectStyleModel } from 'state/merchant/merchant.selectors';
import { useStyles } from './PreviewButton.styles';

export function PreviewButton() {
  const intl = useIntl();
  const styleModel = useSelector(selectStyleModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const flowId = useSelector(selectCurrentFlowId);
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} xl={6}>
          <Box mr={2}>
            <Box mb={1} color="common.black90" fontWeight="bold">
              {intl.formatMessage({ id: 'FlowBuilder.previewButton.header' })}
            </Box>
            <Box color="common.black75">{intl.formatMessage({ id: 'FlowBuilder.previewButton.description' })}</Box>
          </Box>
        </Grid>
        <Grid item xs={12} xl={6}>
          {clientIdModel.isLoaded && styleModel && clientIdModel.value && (
            // @ts-ignore
            <mati-button
              class={classes.button}
              color={styleModel.color}
              clientId={clientIdModel.value}
              language={styleModel.language}
              apiHost={process.env.REACT_APP_API_URL}
              signupHost={process.env.REACT_APP_SIGNUP_URL}
              flowId={flowId}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
