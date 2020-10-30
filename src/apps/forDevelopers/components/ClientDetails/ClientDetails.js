import { Box, IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { VisibilityOff } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from '../../../../components/clipboard';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { QATags } from '../../../../models/QA.model';
import { appLoad } from '../../../../state/merchant/merchant.actions';
import { selectClientIdModel, selectClientSecret } from '../../../../state/merchant/merchant.selectors';
import { useStyles } from './ClientDetails.styles';

export const ClientDetails = () => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const clientIdModel = useSelector(selectClientIdModel);
  const clientSecret = useSelector(selectClientSecret);
  const [isSecretShow, setIsSecretShow] = useState(false);

  const handleChangeShow = useCallback(() => {
    setIsSecretShow(((prevState) => !prevState));
  }, []);

  useEffect(() => {
    if (LoadableAdapter.isPristine(clientIdModel)) {
      dispatch((appLoad()));
    }
  }, [clientIdModel, dispatch]);

  return (
    <Paper>
      <Box px={2} py={3}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} lg={5}>
            <Typography variant="h5">
              Client Details
            </Typography>
          </Grid>
          <Grid item container xs={12} lg={7} alignItems="center">
            <Grid item container xs={12} lg={6} direction="column">
              <Box mb={{ xs: 2, lg: 0 }}>
                <Typography variant="subtitle2">
                  <CopyToClipboard text={clientIdModel?.value} qa={QATags.Integration.flowId.Copy}>
                    <code data-qa={QATags.Integration.flowId.Value}>{clientIdModel?.value}</code>
                  </CopyToClipboard>
                </Typography>
                <Typography className={classes.name}>{intl.formatMessage({ id: 'DocumentationSection.clientId' })}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} lg={6} direction="column">
              <Grid item container>
                <Typography variant="subtitle2" className={classes.code}>
                  <CopyToClipboard text={clientSecret} qa={QATags.Integration.flowId.Copy}>
                    <code data-qa={QATags.Integration.flowId.Value}>{isSecretShow ? clientSecret : '************************'}</code>
                  </CopyToClipboard>
                </Typography>
                <IconButton className={classes.button} onClick={handleChangeShow}>
                  <VisibilityOff />
                </IconButton>
              </Grid>
              <Grid container>
                <Typography className={classes.name}>Client Secret</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
