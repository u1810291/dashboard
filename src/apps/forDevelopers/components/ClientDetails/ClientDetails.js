import { Box, IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAppLastModel, selectClientIdModel } from 'state/merchant/merchant.selectors';
import { PageLoader } from 'apps/layout';
import { useStyles } from './ClientDetails.styles';

export const ClientDetails = () => {
  const classes = useStyles();
  const intl = useIntl();
  const appModel = useSelector(selectAppLastModel);
  const clientIdModel = useSelector(selectClientIdModel);
  const [isSecretShow, setIsSecretShow] = useState(false);

  const handleChangeShow = useCallback(() => {
    setIsSecretShow(((prevState) => !prevState));
  }, []);

  return (
    <Paper>
      <Box px={2} py={3}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} lg={5}>
            <Box mb={{ xs: 2, lg: 0 }}>
              <Typography variant="h5">
                {intl.formatMessage({ id: 'forDevs.clientDetails.title' })}
              </Typography>
            </Box>
          </Grid>
          {appModel.isLoaded ? (
            <Grid item container xs={12} lg={7} alignItems="center">
              <Grid item container xs={12} lg={6} direction="column">
                <Box mb={{ xs: 2, lg: 0 }} maxWidth="100%">
                  <Typography variant="subtitle2" className={classes.title}>
                    <CopyToClipboard text={clientIdModel?.value} qa={QATags.Integration.ClientId.Copy}>
                      <code data-qa={QATags.Integration.ClientId.Value}>{clientIdModel?.value}</code>
                    </CopyToClipboard>
                  </Typography>
                  <Typography className={classes.name}>
                    {intl.formatMessage({ id: 'forDevs.clientDetails.id' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item container xs={12} lg={6} direction="column">
                <Grid item container>
                  <Typography variant="subtitle2" className={classes.code}>
                    <CopyToClipboard text={appModel?.value?.clientSecret} qa={QATags.Integration.ClientSecret.Copy}>
                      <code data-qa={QATags.Integration.ClientSecret.Value}>
                        {isSecretShow
                          ? (appModel?.value?.clientSecret)
                          : <Box className={classes.codeSecret}>************************</Box>}
                      </code>
                    </CopyToClipboard>
                  </Typography>
                  <IconButton className={classes.button} onClick={handleChangeShow}>
                    <VisibilityOffIcon />
                  </IconButton>
                </Grid>
                <Grid container>
                  <Typography className={classes.name}>
                    {intl.formatMessage({ id: 'forDevs.clientDetails.secret' })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <PageLoader />
          )}
        </Grid>
      </Box>
    </Paper>
  );
};
