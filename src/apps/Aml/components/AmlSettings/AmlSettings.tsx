import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { ExtendedDescription, RangeSlider, Warning, BoxBordered, CountryModalSelectContainer, ToggleFloatingButtonGroup } from 'apps/ui';
import cloneDeep from 'lodash/cloneDeep';
import { useDebounce } from 'lib/debounce.hook';
import { ProductSettingsProps } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import classNames from 'classnames';
import { AllowedRegions } from 'models/Country.model';
import { AmlCheckTypes, AmlSettingsTypes, SearchModeTypes } from '../../models/Aml.model';
import { selectCanUseBasicWatchlists, selectCanUsePremiumWatchlistsSearch, selectCanUsePremiumWatchlistsSearchAndMonitoring } from '../../state/Aml.selectors';
import { BasicWatchlist } from '../BasicWatchlist/BasicWatchlist';
import { useStyles } from './AmlSettings.styles';

export function AmlSettings({ settings, onUpdate }: ProductSettingsProps<AmlSettingsTypes>) {
  const debounced = useDebounce();
  const [createOverlay] = useOverlay();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const allowedCountriesAmount = settings[AmlSettingsTypes.CountriesSearched].value?.length || 0;
  const canUseBasicWatchlists = useSelector<any, boolean>(selectCanUseBasicWatchlists);
  const canUsePremiumWatchlistsSearch = useSelector<any, boolean>(selectCanUsePremiumWatchlistsSearch);
  const canUsePremiumWatchlistsSearchAndMonitoring = useSelector<any, boolean>(selectCanUsePremiumWatchlistsSearchAndMonitoring);
  const isPremiumEnabled = canUsePremiumWatchlistsSearch || canUsePremiumWatchlistsSearchAndMonitoring;
  const [isCountriesSearchEnabled, setCountriesSearch] = useState<boolean>(Boolean(allowedCountriesAmount) && isPremiumEnabled);

  const handleSearchToggle = useCallback((_, checked: boolean) => {
    const newSettings = cloneDeep(settings);
    newSettings[AmlSettingsTypes.Search].value = checked;
    if (!checked) {
      newSettings[AmlSettingsTypes.Monitoring].value = false;
      newSettings[AmlSettingsTypes.CountriesSearched].value = [];
      setCountriesSearch(false);
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const updateSettingField = useCallback((field: AmlSettingsTypes, value: unknown) => {
    const newSettings = cloneDeep(settings);
    newSettings[field].value = value;
    debounced(() => onUpdate(newSettings));
  }, [settings, debounced, onUpdate]);

  const handleCountriesToggle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettingField(AmlSettingsTypes.CountriesSearched, []);
    setCountriesSearch(event.target.checked);
  }, [updateSettingField]);

  const handleSubmitAllowedRegions = useCallback((data: AllowedRegions[]) => {
    updateSettingField(AmlSettingsTypes.CountriesSearched, data.map((item: AllowedRegions) => item.country));
    setCountriesSearch(Boolean(data.length));
  }, [updateSettingField]);

  const openCountryModal = useCallback(() => {
    const initialValues = settings[AmlSettingsTypes.CountriesSearched].value.map((countryCode: string) => ({ country: countryCode, regions: [] }));
    createOverlay(
      <CountryModalSelectContainer
        title={formatMessage('AmlCheck.settings.countriesModal.title')}
        description={formatMessage('AmlCheck.settings.countriesModal.description')}
        initialValues={initialValues}
        onSubmit={handleSubmitAllowedRegions}
      />,
    );
  }, [createOverlay, handleSubmitAllowedRegions, formatMessage, settings]);

  const searchModeOptions = [
    { name: formatMessage('AmlCheck.settings.searchMode.fuzzy'), value: SearchModeTypes.Fuzzy },
    { name: formatMessage('AmlCheck.settings.searchMode.exact'), value: SearchModeTypes.Exact },
  ];

  return (
    <Box>
      {canUseBasicWatchlists && (
        <Box mb={4}>
          <BasicWatchlist
            basicWatchlistsIds={settings[AmlSettingsTypes.BasicWatchlists].value}
            isBasicWatchlistChecked={settings[AmlSettingsTypes.BasicWatchlistsPattern].value}
            onBasicWatchlistsSelected={(watchlistChecked) => updateSettingField(AmlSettingsTypes.BasicWatchlists, watchlistChecked)}
            onBasicWatchlistValidationToggle={(_, checked: boolean) => updateSettingField(AmlSettingsTypes.BasicWatchlistsPattern, checked)}
          />
        </Box>
      )}
      <Divider className={classes.divider} />
      {!isPremiumEnabled && (
        <Box mb={2} mt={2}>
          <Warning
            label={formatMessage('AmlCheck.settings.amlNotAvailable')}
            linkLabel={formatMessage('AmlCheck.settings.helpEmail')}
            isLabelColored={false}
            bordered
          />
        </Box>
      )}
      <BoxBordered mt={2} className={classNames(classes.boxBordered, { [classes.disabled]: !isPremiumEnabled })}>
        <ExtendedDescription
          title={formatMessage('AmlCheck.settings.watchlist.title')}
          text={formatMessage('AmlCheck.settings.watchlist.description')}
          postfix={(
            <Switch
              checked={isPremiumEnabled && settings[AmlSettingsTypes.Search].value}
              onChange={handleSearchToggle}
              color="primary"
              disabled={!isPremiumEnabled}
            />
          )}
        />
        <Box mt={2} className={classNames({ [classes.disabled]: isPremiumEnabled && !settings[AmlSettingsTypes.Search].value })}>
          <ExtendedDescription
            title={formatMessage('AmlCheck.settings.searchMode.title')}
            text={formatMessage('AmlCheck.settings.searchMode.description')}
          >
            <ToggleFloatingButtonGroup
              value={settings[AmlSettingsTypes.SearchMode].value}
              options={searchModeOptions}
              onChange={(mode) => updateSettingField(AmlSettingsTypes.SearchMode, mode)}
            />
          </ExtendedDescription>
          {settings[AmlSettingsTypes.SearchMode].value === SearchModeTypes.Fuzzy && (
            <ExtendedDescription
              title={formatMessage('AmlCheck.settings.fuzzinessParameter.title')}
              className={classes.productBlock}
            >
              <RangeSlider
                defaultValue={settings[AmlSettingsTypes.AmlThreshold].value}
                onChange={(_, value) => updateSettingField(AmlSettingsTypes.AmlThreshold, value)}
                disabled={!isPremiumEnabled}
              />
            </ExtendedDescription>
          )}
          <ExtendedDescription
            title={formatMessage(`AmlCheck.settings.${AmlSettingsTypes.CountriesSearched}.title`)}
            text={formatMessage(`AmlCheck.settings.${AmlSettingsTypes.CountriesSearched}.description`)}
            className={classes.productBlock}
            postfix={(
              <Switch
                checked={isPremiumEnabled && isCountriesSearchEnabled}
                onChange={handleCountriesToggle}
                color="primary"
              />
            )}
          >
            {Boolean(allowedCountriesAmount) && isPremiumEnabled && (
              <Box mb={1} className={classes.countriesAmount}>
                {allowedCountriesAmount}
                {formatMessage(`AmlCheck.settings.${AmlSettingsTypes.CountriesSearched}.amount`)}
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={openCountryModal}
              disabled={!isCountriesSearchEnabled || !isPremiumEnabled}
              className={classes.openCountriesButton}
            >
              {formatMessage(`AmlCheck.settings.${AmlSettingsTypes.CountriesSearched}.editButton`)}
            </Button>
          </ExtendedDescription>
          <Divider className={classes.divider} />
          <ExtendedDescription
            isDisabled={isPremiumEnabled && settings[AmlSettingsTypes.Search].value && !canUsePremiumWatchlistsSearchAndMonitoring}
            title={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.title`)}
            text={formatMessage(`AmlCheck.settings.${AmlCheckTypes.Monitoring}.description`)}
            className={classes.productBlock}
            postfix={(
              <Switch
                checked={canUsePremiumWatchlistsSearchAndMonitoring && settings[AmlSettingsTypes.Monitoring].value}
                onChange={(_, checked) => updateSettingField(AmlSettingsTypes.Monitoring, checked)}
                color="primary"
                disabled={!canUsePremiumWatchlistsSearchAndMonitoring}
              />
            )}
          />
        </Box>
      </BoxBordered>
    </Box>
  );
}
