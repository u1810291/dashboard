import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { BoxBordered, Warning } from 'apps/ui';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import { CountryModalSelect, CountryModalSelectContainer } from 'apps/CountryModalSelect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { AllowedRegions, Country } from 'models/Country.model';
import { useFormatMessage } from 'apps/intl';

import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { getAllAllowedRegions, LocationIntelligenceSettingsTypes, LocationIntelligenceValidationTypes } from '../../models/LocationIntelligence.model';

export function LocationIntelligenceSettings({ settings, onUpdate }: ProductSettingsProps<LocationIntelligenceSettingsTypes>) {
  const [createOverlay] = useOverlay();
  const countries = useSelector<any, Country[]>(selectCountriesList);
  const [currentMethod, setCurrentMethod] = useState<LocationIntelligenceValidationTypes>(LocationIntelligenceValidationTypes.None);
  const [isVpnRestricted, setIsVpnRestricted] = useState<boolean>(false);
  const [isHighAccuracyEnabled, setIsHighAccuracyEnabled] = useState<boolean>(false);
  const [allowedRegions, setAllowedRegions] = useState<AllowedRegions[] | null>([]);
  const merchantTags: MerchantTags[] = useSelector(selectMerchantTags);
  const isProductEnabled = merchantTags.includes(MerchantTags.CanUseHighAccuracyLocationTracking);

  useEffect(() => {
    setCurrentMethod(settings?.[LocationIntelligenceSettingsTypes.IpValidation].value);
    setIsVpnRestricted(settings?.[LocationIntelligenceSettingsTypes.VpnDetection].value);
    setAllowedRegions(settings?.[LocationIntelligenceSettingsTypes.AllowedRegions].value);
    setIsHighAccuracyEnabled(settings?.[LocationIntelligenceSettingsTypes.HighAccuracy].value);
  }, [settings]);

  const handleChangeMode = useCallback((modeOn: LocationIntelligenceValidationTypes, modeOff?: LocationIntelligenceValidationTypes) => async ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    newSettings[LocationIntelligenceSettingsTypes.IpValidation].value = checked ? modeOn : modeOff;
    if (modeOn === LocationIntelligenceValidationTypes.RestrictionBlock) {
      newSettings[LocationIntelligenceSettingsTypes.VpnDetection].value = true;
    }
    if (modeOff === LocationIntelligenceValidationTypes.Basic) {
      newSettings[LocationIntelligenceSettingsTypes.VpnDetection].value = false;
    }
    if (modeOn === LocationIntelligenceValidationTypes.RestrictionInvisible && !!allowedRegions?.length) {
      newSettings[LocationIntelligenceSettingsTypes.AllowedRegions].value = getAllAllowedRegions(countries);
    }
    onUpdate(newSettings);
  }, [onUpdate, settings, allowedRegions, countries]);

  const handleVpnRestricted = useCallback(({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    newSettings[LocationIntelligenceSettingsTypes.VpnDetection].value = checked;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleSubmitAllowedRegions = useCallback((data) => {
    const newSettings = cloneDeep(settings);
    newSettings[LocationIntelligenceSettingsTypes.AllowedRegions].value = data;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleEnableHighAccuracy = useCallback(({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    newSettings[LocationIntelligenceSettingsTypes.HighAccuracy].value = checked;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const openCountryModal = useCallback(() => {
    createOverlay(
      <CountryModalSelectContainer>
        <CountryModalSelect
          initialValues={allowedRegions}
          onSubmit={handleSubmitAllowedRegions}
        />
      </CountryModalSelectContainer>,
    );
  }, [allowedRegions, createOverlay, handleSubmitAllowedRegions]);

  const formatMessage = useFormatMessage();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12}>
        <Box mt={1}>
          <Grid container direction="row" justify="space-between" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h4">
                {formatMessage('Product.configuration.LocInt.highAccuracy.title')}
              </Typography>
              <Box color="common.black75" mt={1}>
                <Typography variant="body1">
                  {formatMessage('Product.configuration.LocInt.highAccuracy.subtitleFirst')}
                  <br />
                  <br />
                  {formatMessage('Product.configuration.LocInt.highAccuracy.subtitleSecond')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="highAccuracy"
                color="primary"
                size="small"
                onChange={handleEnableHighAccuracy}
                checked={isHighAccuracyEnabled}
                disabled={!isProductEnabled}
              />
            </Grid>
          </Grid>
          {!isProductEnabled
          && (
          <Box mb={2} mt={2}>
            <Warning
              label={formatMessage('CustomDocuments.settings.customDocumentNotAvailable')}
              linkLabel={formatMessage('CustomDocuments.settings.helpEmail')}
              isLabelColored={false}
              bordered
            />
          </Box>
          )}
        </Box>
        <Box mt={2}>
          <Grid container direction="row" justify="space-between" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h4">
                {formatMessage('Product.configuration.ipCheck.geoRestriction.title')}
              </Typography>
              <Box color="common.black75" mt={1}>
                <Typography variant="body1">
                  {formatMessage('Product.configuration.ipCheck.geoRestriction.subtitle')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="geoRestriction"
                color="primary"
                size="small"
                checked={[LocationIntelligenceValidationTypes.RestrictionInvisible, LocationIntelligenceValidationTypes.RestrictionVisible, LocationIntelligenceValidationTypes.RestrictionBlock].includes(currentMethod)}
                onChange={handleChangeMode(LocationIntelligenceValidationTypes.RestrictionInvisible, LocationIntelligenceValidationTypes.Basic)}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid container direction="row" justify="space-between" spacing={1}>
              <Grid item xs={10}>
                <Typography variant="h5">
                  {formatMessage('Product.configuration.ipCheck.vpnRestriction.title')}
                </Typography>
                <Box color="common.black75" mt={1}>
                  <Typography variant="body1">
                    {formatMessage('Product.configuration.ipCheck.vpnRestriction.subtitle')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  name="vpnRestriction"
                  color="primary"
                  size="small"
                  checked={isVpnRestricted && currentMethod !== LocationIntelligenceValidationTypes.None}
                  onChange={handleVpnRestricted}
                  disabled={[LocationIntelligenceValidationTypes.Basic, LocationIntelligenceValidationTypes.None].includes(currentMethod)}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={openCountryModal}
              disabled={[LocationIntelligenceValidationTypes.Basic, LocationIntelligenceValidationTypes.None].includes(currentMethod)}
            >
              {formatMessage('Product.configuration.ipCheck.geoRestriction.editButton')}
            </Button>
          </Box>
          <RadioGroup
            aria-label="ipCheck-configuration"
            name="ipCheck-configuration"
            value={currentMethod}
            onChange={(e, value) => handleChangeMode(value as LocationIntelligenceValidationTypes)(e)}
          >
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {formatMessage('Product.configuration.ipCheck.checks.invisible')}
                    </Typography>
                  </Box>
                )}
                value={LocationIntelligenceValidationTypes.RestrictionInvisible}
                disabled={[LocationIntelligenceValidationTypes.Basic, LocationIntelligenceValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {formatMessage('Product.configuration.ipCheck.checks.invisible.subtitle')}
                </Typography>
              </Box>
            </BoxBordered>
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {formatMessage('Product.configuration.ipCheck.checks.visible')}
                    </Typography>
                  </Box>
                )}
                value={LocationIntelligenceValidationTypes.RestrictionVisible}
                disabled={[LocationIntelligenceValidationTypes.Basic, LocationIntelligenceValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {formatMessage('Product.configuration.ipCheck.checks.visible.subtitle')}
                </Typography>
              </Box>
            </BoxBordered>
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {formatMessage('Product.configuration.ipCheck.checks.verificationFlowBlock')}
                    </Typography>
                  </Box>
                )}
                value={LocationIntelligenceValidationTypes.RestrictionBlock}
                disabled={[LocationIntelligenceValidationTypes.Basic, LocationIntelligenceValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {formatMessage('Product.configuration.ipCheck.checks.verificationFlowBlock.subtitle')}
                </Typography>
              </Box>
            </BoxBordered>
          </RadioGroup>
        </Box>
      </Grid>
    </Grid>
  );
}
