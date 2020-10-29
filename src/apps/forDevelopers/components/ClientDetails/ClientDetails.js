import { Box, IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { VisibilityOff } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from '../../../../components/clipboard';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { QATags } from '../../../../models/QA.model';
import { appLoad } from '../../../../state/merchant/merchant.actions';
import { selectClientIdModel, selectClientSecret } from '../../../../state/merchant/merchant.selectors';

export const ClientDetails = () => {
  const dispatch = useDispatch();
  const clientIdModel = useSelector(selectClientIdModel);
  const clientSecret = useSelector(selectClientSecret);

  useEffect(() => {
    if (LoadableAdapter.isPristine(clientIdModel)) {
      dispatch((appLoad()));
    }
  }, [clientIdModel, dispatch]);

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={6}>
            <Typography>
              Client Details
            </Typography>
          </Grid>
          <Grid item container xs={6}>
            <Grid container direction="column">
              <Grid container>
                <Typography>
                  <CopyToClipboard text={clientIdModel?.value} qa={QATags.Integration.flowId.Copy}>
                    <code data-qa={QATags.Integration.flowId.Value}>{clientIdModel?.value}</code>
                  </CopyToClipboard>
                </Typography>
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>Client id</Typography>
              </Grid>
            </Grid>
            <Grid container direction="column">
              <Grid container>
                <Typography>
                  <CopyToClipboard text={clientSecret} qa={QATags.Integration.flowId.Copy}>
                    <code data-qa={QATags.Integration.flowId.Value}>{clientSecret}</code>
                  </CopyToClipboard>
                </Typography>
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </Grid>
              <Grid container>
                <Typography>Client secret</Typography>
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
