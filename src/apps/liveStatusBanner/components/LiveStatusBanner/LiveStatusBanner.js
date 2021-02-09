import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as MatiLogo } from '../../icons/mati-small-logo.svg';
import { useStyles } from './LiveStatusBanner.styles';

export function LiveStatusBanner() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Link underline="none" target="_blank" href="https://mati.statuspage.io/">
      <Box className={classes.badge}>
        <MatiLogo className={classes.logo} />
        <Typography className={classes.statusMessage}>
          {intl.formatMessage({ id: 'LiveStatus.goToStatuspage' })}
        </Typography>
      </Box>
    </Link>
  );
}
