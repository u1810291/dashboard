import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useLiveStatusUpdate } from 'apps/liveStatusBanner/hooks/liveStatusUpdate';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as MatiLogo } from '../../icons/mati-small-logo.svg';
import { useStyles } from './LiveStatusBanner.styles';

export function LiveStatusBanner() {
  const [status] = useLiveStatusUpdate();
  const intl = useIntl();
  const classes = useStyles({ textColor: status.color });

  return (
    <Link underline="none" target="_blank" href="https://mati.statuspage.io/">
      <Box className={classes.badge}>
        <MatiLogo className={classes.logo} />
        <Typography className={classes.statusMessage}>
          {`• ${status?.descriptionToken
            ? intl.formatMessage({ id: status.descriptionToken })
            : (status?.id || intl.formatMessage({ id: 'LiveStatus.unknownStatus' }))}`}
        </Typography>
      </Box>
    </Link>
  );
}
