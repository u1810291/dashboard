import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { ExtendedDescription, RangeSlider, Warning } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { useDebounce } from 'lib/debounce.hook';
import { ProductSettingsProps } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { AmlCheckTypes, AmlSettingsTypes } from '../../models/Aml.model';
import { selectCanUseBasicWatchlists, selectCanUsePremiumWatchlistsSearch, selectCanUsePremiumWatchlistsSearchAndMonitoring } from '../../state/Aml.selectors';
import { BasicWatchlist } from '../BasicWatchlist/BasicWatchlist';
import { useStyles } from './AmlSettings.styles';

export function AmlSettings({ settings, onUpdate }: ProductSettingsProps<AmlSettingsTypes>) {
  const debounced = useDebounce();
  const canUseBasicWatchlists = useSelector<any, boolean>(selectCanUseBasicWatchlists);
  const canUsePremiumWatchlistsSearch = useSelector<any, boolean>(selectCanUsePremiumWatchlistsSearch);
  const canUsePremiumWatchlistsSearchAndMonitoring = useSelector<any, boolean>(selectCanUsePremiumWatchlistsSearchAndMonitoring);
  const formatMessage = useFormatMessage();
  const classes = useStyles();

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
      {!canUsePremiumWatchlistsSearch && !canUsePremiumWatchlistsSearchAndMonitoring && (
        <Box mb={2}>
          <Warning
            label={formatMessage('AmlCheck.settings.amlNotAvailable')}
            linkLabel={formatMessage('AmlCheck.settings.helpEmail')}
            isLabelColored={false}
            bordered
          />
        </Box>
      )}
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
          isDisabled={!canUsePremiumWatchlistsSearch}
          title={formatMessage('AmlCheck.settings.watchlist.title')}
          text={formatMessage('AmlCheck.settings.watchlist.description')}
          postfix={(
            <Switch
              checked={canUsePremiumWatchlistsSearch && settings[AmlSettingsTypes.Search].value}
              onChange={handleSearchToggle}
              color="primary"
              disabled={!canUsePremiumWatchlistsSearch}
            />
          )}
        />
      </Box>
      <Box mb={4} className={classNames({ [classes.disabled]: !canUsePremiumWatchlistsSearch })}>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
          {formatMessage('AmlCheck.settings.fuzzinessParameter.title')}
        </Typography>
        <Box color="common.black75" mb={2}>
          {formatMessage('AmlCheck.settings.fuzzinessParameter.description')}
        </Box>
        <RangeSlider
          defaultValue={settings[AmlSettingsTypes.AmlThreshold].value}
          onChange={handleSliderChange}
          disabled={!canUsePremiumWatchlistsSearch}
        />
      </Box>
      <ExtendedDescription
        isDisabled={!canUsePremiumWatchlistsSearchAndMonitoring}
        title={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.title`)}
        text={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.description`)}
        postfix={(
          <Switch
            checked={canUsePremiumWatchlistsSearchAndMonitoring && settings[AmlSettingsTypes.Monitoring].value}
            onChange={handleMonitoringToggle}
            color="primary"
            disabled={!canUsePremiumWatchlistsSearchAndMonitoring}
          />
        )}
      />
    </Box>
  );
}
