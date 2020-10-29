import { IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { VisibilityOff } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
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
      <Grid container justify="space-between">
        <Grid container xs={6}>
          <Typography>
            Client Details
          </Typography>
        </Grid>
        <Grid container xs={6}>
          <Grid container direction="column">
            <Grid container>
              <Typography>
                {clientIdModel?.value}
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
              <Typography>{clientSecret}</Typography>
              <IconButton>
                <VisibilityOff />
              </IconButton>
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
    </Paper>
  );
};
