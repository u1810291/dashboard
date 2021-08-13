import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { BoxBordered } from 'apps/ui';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { CustomWatchlistSettingsTypes } from '../../models/CustomWatchlist.model';
import { CustomWatchlistStepSettings } from '../CustomWatchlistStepSettings/CustomWatchlistStepSettings';

export function CustomWatchlistSettings({ settings, onUpdate }: ProductSettingsProps<CustomWatchlistSettingsTypes>) {
  const intl = useIntl();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12}>
        <Box mb={2}>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'CustomWatchlist.settings.addYourWatchlist.title' })}
          </Typography>
          <Box color="common.black75" mt={1}>
            <Typography variant="body1">
              {intl.formatMessage({ id: 'CustomWatchlist.settings.addYourWatchlist.subtitle' })}
            </Typography>
          </Box>
        </Box>
        <CustomWatchlistStepSettings steps={[]} onUpdate={(steps) => console.log('steps', steps)} />
      </Grid>
    </Grid>
  );
}
