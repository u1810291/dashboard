import { Box, Button, Grid } from '@material-ui/core';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { FiCode, FiExternalLink, FiGlobe, FiSmartphone } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { TabID } from '../../models/ForDevelopers.model';
import { useStyles } from './GithubDocumentationBanner.styles';

export function GithubDocumentationBanner({ platform, documentationURL, tabId }) {
  const classes = useStyles();
  const intl = useIntl();

  const handleRedirect = useCallback(() => {
    window.open(documentationURL, '_blank');
  }, [documentationURL]);

  const getIcon = useCallback(() => {
    switch (tabId) {
      case TabID.Web:
        return (<FiGlobe />);
      case TabID.Api:
        return (<FiCode />);
      default:
        return (<FiSmartphone />);
    }
  }, [tabId]);

  const getPlatformName = useCallback(() => {
    const webSDK = intl.formatMessage({ id: 'forDevs.informationPage.webSDK.title' });
    const name = platform === intl.formatMessage({ id: 'forDevs.sideMenu.web' }) ? webSDK : platform;
    return documentationURL.includes('github.com') ? `${name} Github` : name;
  }, [documentationURL, intl, platform]);

  return (
    <Grid container justify="space-between" className={classes.wrapper}>
      <Grid item container wrap="nowrap" alignItems="center" className={classes.textWrapper}>
        <Grid container justify="center" alignItems="center" className={classes.icon}>
          {getIcon()}
        </Grid>
        <Box color="common.black90" fontSize={18}>
          {intl.formatMessage({ id: 'forDevs.documentationBanner.label' },
            { platform: getPlatformName() })}
        </Box>
      </Grid>
      <Grid item className={classes.buttonWrapper}>
        <Button
          onClick={handleRedirect}
          className={classes.button}
          variant="outlined"
          fullWidth
          data-qa={QATags.Integration.Doc.Banner}
        >
          {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform })}
          <FiExternalLink />
        </Button>
      </Grid>
    </Grid>
  );
}
