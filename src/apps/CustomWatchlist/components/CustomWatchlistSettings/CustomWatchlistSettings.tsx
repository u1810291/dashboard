import { Box, Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { BoxBordered } from 'apps/ui';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Watchlist, CustomWatchlistSettingsTypes } from 'models/CustomWatchlist.model';
import { CustomWatchlistItemSettings } from '../CustomWatchlistItemSettings/CustomWatchlistItemSettings';

const mock: Watchlist[] = [{
  id: 1234,
  name: 'Test Watchlist',
  merchant_id: 'merchant_id',
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
}];

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
        <CustomWatchlistItemSettings watchlists={mock} onUpdate={(watchlists) => console.log('watchlist', watchlists)} />
      </Grid>
    </Grid>
  );
}
