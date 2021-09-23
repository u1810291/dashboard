import { Box, Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Watchlist, CustomWatchlistSettingsTypes } from 'models/CustomWatchlist.model';
import { CustomWatchlistItemSettings } from '../CustomWatchlistItemSettings/CustomWatchlistItemSettings';

export function CustomWatchlistSettings({ settings, onUpdate }: ProductSettingsProps<CustomWatchlistSettingsTypes>) {
  const intl = useIntl();

  const handleUpdateItem = useCallback(
    (watchlist: Watchlist) => {
      const newSettings = cloneDeep(settings);
      const settingsWatchlists: Watchlist[] = newSettings[CustomWatchlistSettingsTypes.Watchlists].value;
      const settingsWatchlistIndex = settingsWatchlists.findIndex((item) => item.watchlistId === watchlist.watchlistId);

      settingsWatchlists[settingsWatchlistIndex] = watchlist;
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
        <CustomWatchlistItemSettings watchlists={settings[CustomWatchlistSettingsTypes.Watchlists].value} onUpdate={handleUpdateItem} />
      </Grid>
    </Grid>
  );
}
