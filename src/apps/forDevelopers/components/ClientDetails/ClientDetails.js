import { IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { VisibilityOff } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../user/state/user.selectors';

export const ClientDetails = () => {
  const clientId = useSelector(selectUserId);

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
                {clientId}
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
              <Typography>5e9576d8ac2c70001ca9ee3d</Typography>
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
