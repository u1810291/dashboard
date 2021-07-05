import { Grid, Button, Box } from '@material-ui/core';
import { SoftLaunchBanners } from 'apps/ui/models/SoftLaunchBanner.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './SoftLaunchSwitch.styles';

export function SoftLaunchBanner({ id, onClick }: {
  id: SoftLaunchBanners;
  onClick: () => void;
}) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.wrapper}>
      {intl.formatMessage({ id: 'SoftLaunchBanner.description' })}
      <Box ml="auto" flexShrink={0} fontWeight="normal">
        <Button className={classes.button} color="primary" variant="outlined" onClick={onClick}>
          {intl.formatMessage({ id: `SoftLaunchBanner.${id}Layout.button` })}
        </Button>
      </Box>
    </Grid>
  );
}
