import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import { CustomWatchlistSeverityOnMatchTypes, IFlowWatchlist } from 'models/CustomWatchlist.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { HOCIsAccessAllowed } from 'apps/merchant';
import { CustomWatchlistItemSettings } from 'apps/CustomWatchlist/components/CustomWatchlistItemSettings/CustomWatchlistItemSettings';
import { selectCanUseCustomWatchlists, selectWatchlists } from '../../state/CustomWatchlist.selectors';
import { customWatchlistsClear, customWatchlistsLoad } from '../../state/CustomWatchlist.actions';
import { CustomWatchlistSettingsTypes, FlowWatchlistUi } from '../../models/CustomWatchlist.model';

export function CustomWatchlistSettings({ settings, onUpdate }: ProductSettingsProps<CustomWatchlistSettingsTypes>) {
  const formatMessage = useFormatMessage();
  const canUseCustomWatchlists = useSelector(selectCanUseCustomWatchlists);
  const watchlists = useSelector(selectWatchlists);
  const merchantId = useSelector(selectMerchantId);
  const dispatch = useDispatch();

  const handleUpdateItem = useCallback((watchlist: Partial<FlowWatchlistUi>) => {
    const newSettings = cloneDeep(settings);
    const settingsWatchlists: Partial<FlowWatchlistUi>[] = newSettings[CustomWatchlistSettingsTypes.CustomWatchlists].value;
    const settingsWatchlistIndex = settingsWatchlists.findIndex((item) => item.id === watchlist.id);

    if (settingsWatchlistIndex >= 0) {
      settingsWatchlists[settingsWatchlistIndex] = watchlist;
    } else {
      settingsWatchlists.push(watchlist);
    }

    newSettings[CustomWatchlistSettingsTypes.CustomWatchlists].value = settingsWatchlists.filter((settingsWatchlist) => settingsWatchlist.severityOnMatch !== CustomWatchlistSeverityOnMatchTypes.NoAction);
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  const flowAndCustomWatchlistsMerged: FlowWatchlistUi[] = useMemo(() => {
    const flowWatchlists: IFlowWatchlist[] = settings[CustomWatchlistSettingsTypes.CustomWatchlists].value;
    return watchlists.map((watchlist) => {
      const findedWatchlist = flowWatchlists.find((flowWatchlist) => flowWatchlist.id === watchlist.id);
      return {
        ...watchlist,
        ...findedWatchlist,
        severityOnMatch: findedWatchlist?.severityOnMatch ?? CustomWatchlistSeverityOnMatchTypes.NoAction,
      };
    });
  }, [settings, watchlists]);

  useEffect(() => {
    dispatch(customWatchlistsLoad(merchantId));
    return () => {
      dispatch(customWatchlistsClear());
    };
  }, [merchantId, dispatch]);

  return (
    <HOCIsAccessAllowed isAccessAllowed={canUseCustomWatchlists}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="h4">
              {formatMessage('CustomWatchlist.settings.addYourWatchlist.title')}
            </Typography>
            <Box color="common.black75" mt={1}>
              <Typography variant="body1">
                {formatMessage('CustomWatchlist.settings.addYourWatchlist.subtitle')}
              </Typography>
            </Box>
          </Box>
          <CustomWatchlistItemSettings watchlists={flowAndCustomWatchlistsMerged} onUpdate={handleUpdateItem} />
        </Grid>
      </Grid>
    </HOCIsAccessAllowed>
  );
}
