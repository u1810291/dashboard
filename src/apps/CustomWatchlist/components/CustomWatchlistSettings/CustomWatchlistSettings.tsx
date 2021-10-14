import { Box, Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FlowWatchlist, CustomWatchlistSettingsTypes, CustomWatchlistSeverityOnMatchTypes, FlowWatchlistUi } from 'models/CustomWatchlist.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { CustomWatchlistItemSettings } from '../CustomWatchlistItemSettings/CustomWatchlistItemSettings';
import { selectWatchlists } from '../../state/CustomWatchlist.selectors';
import { customWatchlistClear, customWatchlistsLoad } from '../../state/CustomWatchlist.actions';

export function CustomWatchlistSettings({ settings, onUpdate }: ProductSettingsProps<CustomWatchlistSettingsTypes>) {
  const intl = useIntl();
  const watchlists = useSelector(selectWatchlists);
  const merchantId = useSelector(selectMerchantId);
  const dispatch = useDispatch();

  const handleUpdateItem = useCallback((watchlist: FlowWatchlist) => {
    const newSettings = cloneDeep(settings);
    const settingsWatchlists: FlowWatchlist[] = newSettings[CustomWatchlistSettingsTypes.Watchlists].value;
    const settingsWatchlistIndex = settingsWatchlists.findIndex((item) => item.id === watchlist.id);

    if (settingsWatchlistIndex >= 0) {
      settingsWatchlists[settingsWatchlistIndex] = watchlist;
    } else {
      settingsWatchlists.push(watchlist);
    }

    newSettings[CustomWatchlistSettingsTypes.Watchlists].value = settingsWatchlists.filter((settingsWatchlist) => settingsWatchlist.severityOnMatch !== CustomWatchlistSeverityOnMatchTypes.NoAction);
    onUpdate(newSettings);
  },
  [settings, onUpdate]);

  const flowAndCustomWatchlistsMerged: FlowWatchlistUi[] = useMemo(() => {
    const flowWatchlists: FlowWatchlist[] = settings[CustomWatchlistSettingsTypes.Watchlists].value;
    return watchlists.map((watchlist) => {
      const findedWatchlist = flowWatchlists.find((flowWatchlist) => flowWatchlist.id === watchlist.id);
      return {
        ...watchlist,
        ...findedWatchlist,
        severityOnMatch: findedWatchlist?.severityOnMatch ?? CustomWatchlistSeverityOnMatchTypes.NoAction,
        csvDelimiter: watchlist?.csvDelimiter ?? null,
      };
    });
  }, [settings, watchlists]);

  useEffect(() => {
    dispatch(customWatchlistsLoad(merchantId));
    return () => {
      dispatch(customWatchlistClear());
    };
  }, [merchantId, dispatch]);

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
        <CustomWatchlistItemSettings watchlists={flowAndCustomWatchlistsMerged} onUpdate={handleUpdateItem} />
      </Grid>
    </Grid>
  );
}
