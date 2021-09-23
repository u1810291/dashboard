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
    <Grid container alignItems="center" className={classes.wrapper}>
      {intl.formatMessage({ id: 'SoftLaunchBanner.description' })}
      <Box mt={{ xs: 1, sm: 0 }} ml="auto" pl={{ xs: 0, sm: 2 }} flexShrink={0} fontWeight="normal">
        <Button className={classes.button} color="primary" variant="outlined" onClick={onClick}>
          {intl.formatMessage({ id: `SoftLaunchBanner.${id}Layout.button` })}
        </Button>
      </Box>
    </Grid>
  );
}
