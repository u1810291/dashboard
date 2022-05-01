import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { ExtendedDescription, RangeSlider } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { useDebounce } from 'lib/debounce.hook';
import { ProductSettingsProps } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AmlCheckTypes, AmlSettingsTypes } from '../../models/Aml.model';
import { selectCanUseBasicWatchlists } from '../../state/Aml.selectors';
import { BasicWatchlist } from '../BasicWatchlist/BasicWatchlist';

export function AmlSettings({ settings, onUpdate }: ProductSettingsProps<AmlSettingsTypes>) {
  const debounced = useDebounce();
  const canUseBasicWatchlists = useSelector(selectCanUseBasicWatchlists);
  const [search, setSearch] = useState<boolean>(settings[AmlSettingsTypes.Search].value);
  const [monitoring, setMonitoring] = useState<boolean>(settings[AmlSettingsTypes.Monitoring].value);
  const [amlThreshold, setAmlThreshold] = useState<number>(settings[AmlSettingsTypes.AmlThreshold].value);
  const formatMessage = useFormatMessage();

  useEffect(() => {
    setSearch(settings[AmlSettingsTypes.Search].value);
    setMonitoring(settings[AmlSettingsTypes.Monitoring].value);
    setAmlThreshold(settings[AmlSettingsTypes.AmlThreshold].value);
  }, [settings]);

  const handleSearchToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    newSettings[AmlSettingsTypes.Search].value = newValue;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Monitoring].value = false;
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleMonitoringToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    const newValue = e.target.checked;
    if (!newValue) {
      newSettings[AmlSettingsTypes.Search].value = false;
    }
    newSettings[AmlSettingsTypes.Monitoring].value = newValue;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleSliderChange = useCallback((event: React.ChangeEvent<{}>, value: number | number[]) => {
    const newSettings = cloneDeep(settings);
    newSettings[AmlSettingsTypes.AmlThreshold].value = value;
    debounced(() => onUpdate(newSettings));
  }, [onUpdate, settings, debounced]);

  const handleBasicWatchlistsSelected = useCallback((watchlistChecked: number[]) => {
    const newSettings = cloneDeep(settings);
    newSettings[AmlSettingsTypes.BasicWatchlists].value = watchlistChecked;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  const handleBasicWatchlistValidationToggle = useCallback((_, checked: boolean) => {
    const newSettings = cloneDeep(settings);
    newSettings[AmlSettingsTypes.BasicWatchlistsPattern].value = checked;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <Box>
      {canUseBasicWatchlists && (
        <Box mb={4}>
          <BasicWatchlist
            basicWatchlistsIds={settings[AmlSettingsTypes.BasicWatchlists].value}
            isBasicWatchlistChecked={settings[AmlSettingsTypes.BasicWatchlistsPattern].value}
            onBasicWatchlistsSelected={handleBasicWatchlistsSelected}
            onBasicWatchlistValidationToggle={handleBasicWatchlistValidationToggle}
          />
        </Box>
      )}
      <Box mb={4}>
        <ExtendedDescription
          title={formatMessage('AmlCheck.settings.watchlist.title')}
          text={formatMessage('AmlCheck.settings.watchlist.description')}
          postfix={(
            <Switch
              checked={search}
              onChange={handleSearchToggle}
              color="primary"
            />
          )}
        />
      </Box>
      <Box mb={4}>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
          {formatMessage('AmlCheck.settings.fuzzinessParameter.title')}
        </Typography>
        <Box color="common.black75" mb={2}>
          {formatMessage('AmlCheck.settings.fuzzinessParameter.description')}
        </Box>
        <RangeSlider
          defaultValue={amlThreshold}
          onChange={handleSliderChange}
        />
      </Box>
      <ExtendedDescription
        title={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.title`)}
        text={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.description`)}
        postfix={(
          <Switch
            checked={monitoring}
            onChange={handleMonitoringToggle}
            color="primary"
          />
        )}
      />
    </Box>
  );
}
