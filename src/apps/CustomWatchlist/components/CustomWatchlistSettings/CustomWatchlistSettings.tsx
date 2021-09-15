import { Box, Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Watchlist, CustomWatchlistSettingsTypes } from 'models/CustomWatchlist.model';
import { CustomWatchlistItemSettings } from '../CustomWatchlistItemSettings/CustomWatchlistItemSettings';

export function CustomWatchlistSettings({ settings, onUpdate }: ProductSettingsProps<CustomWatchlistSettingsTypes>) {
  const intl = useIntl();

  console.log('settings', settings);

  const handleUpdateItems = useCallback(
    (watchlist: Watchlist) => {
      const newSettings = cloneDeep(settings);
      const settingsWatchlists = newSettings[CustomWatchlistSettingsTypes.Watchlists].value;
      const findedWatchlist = settingsWatchlists.find((item) => item.id);

      if (findedWatchlist) {
        settingsWatchlists[settingsWatchlists.findIndex((item) => item.id)] = watchlist;
        onUpdate(newSettings);
        return;
      }
      settingsWatchlists.push(watchlist);
      onUpdate(newSettings);
    },
    [settings, onUpdate],
  );

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
        <CustomWatchlistItemSettings onUpdate={handleUpdateItems} />
      </Grid>
    </Grid>
  );
}
