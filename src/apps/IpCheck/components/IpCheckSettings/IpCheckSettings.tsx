import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { BoxBordered } from 'apps/ui';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useOverlay } from 'apps/overlay';
import { CountryModalSelect } from 'apps/CountryModalSelect';
import { AllowedRegions, IpCheckSettingsTypes, IpCheckValidationTypes } from '../../models/IpCheck.model';

export function IpCheckSettings({ settings, onUpdate }: ProductSettingsProps<IpCheckSettingsTypes>) {
  const intl = useIntl();
  const [createOverlay] = useOverlay();
  const [currentMethod, setCurrentMethod] = useState<IpCheckValidationTypes>(IpCheckValidationTypes.None);
  const [isVpnRestricted, setIsVpnRestricted] = useState<boolean>(false);
  const [allowedRegions, setAllowedRegions] = useState<AllowedRegions[]>([]);

  useEffect(() => {
    setCurrentMethod(settings?.[IpCheckSettingsTypes.IpValidation].value);
    setIsVpnRestricted(settings?.[IpCheckSettingsTypes.VpnDetection].value);
    setAllowedRegions(settings?.[IpCheckSettingsTypes.AllowedRegions].value);
  }, [settings]);

  const handleChangeMode = useCallback((modeOn: IpCheckValidationTypes, modeOff?: IpCheckValidationTypes) => async ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    newSettings[IpCheckSettingsTypes.IpValidation].value = checked ? modeOn : modeOff;
    if (modeOff === IpCheckValidationTypes.Basic) {
      newSettings[IpCheckSettingsTypes.VpnDetection].value = false;
    }
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleVpnRestricted = useCallback(({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = cloneDeep(settings);
    newSettings[IpCheckSettingsTypes.VpnDetection].value = checked;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const openCountryModal = useCallback(() => {
    createOverlay(
      <CountryModalSelect
        initialValues={allowedRegions}
        onSubmit={(data) => {
          const newSettings = cloneDeep(settings);
          newSettings[IpCheckSettingsTypes.AllowedRegions].value = data;
          onUpdate(newSettings);
        }}
      />,
    );
  }, [allowedRegions, createOverlay, onUpdate, settings]);

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12}>
        <Box>
          <Grid container direction="row" justify="space-between" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h4">
                {intl.formatMessage({ id: 'Product.configuration.ipCheck' })}
              </Typography>
              <Box color="common.black75" mt={1}>
                <Typography variant="body1">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.subtitle' })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="ipCheck"
                color="primary"
                size="small"
                checked={currentMethod !== IpCheckValidationTypes.None}
                onChange={handleChangeMode(IpCheckValidationTypes.Basic, IpCheckValidationTypes.None)}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2}>
          <Grid container direction="row" justify="space-between" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h4">
                {intl.formatMessage({ id: 'Product.configuration.ipCheck.geoRestriction.title' })}
              </Typography>
              <Box color="common.black75" mt={1}>
                <Typography variant="body1">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.geoRestriction.subtitle' })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="geoRestriction"
                color="primary"
                size="small"
                checked={[IpCheckValidationTypes.RestrictionInvisible, IpCheckValidationTypes.RestrictionVisible, IpCheckValidationTypes.RestrictionBlock].includes(currentMethod)}
                onChange={handleChangeMode(IpCheckValidationTypes.RestrictionInvisible, IpCheckValidationTypes.Basic)}
              />
            </Grid>
          </Grid>
          <Box mt={1}>
            <Grid container direction="row" justify="space-between" spacing={1}>
              <Grid item xs={10}>
                <Typography variant="subtitle2">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.vpnRestriction.title' })}
                </Typography>
                <Box color="common.black75" mt={1}>
                  <Typography variant="body1">
                    {intl.formatMessage({ id: 'Product.configuration.ipCheck.vpnRestriction.subtitle' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  name="vpnRestriction"
                  color="primary"
                  size="small"
                  checked={isVpnRestricted && currentMethod !== IpCheckValidationTypes.None}
                  onChange={handleVpnRestricted}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" size="large" onClick={openCountryModal}>{intl.formatMessage({ id: 'Product.configuration.ipCheck.geoRestriction.editButton' })}</Button>
          </Box>
          <RadioGroup
            aria-label="ipCheck-configuration"
            name="ipCheck-configuration"
            value={currentMethod}
            onChange={(e, value) => handleChangeMode(value as IpCheckValidationTypes)(e)}
          >
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="default" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.invisible' })}
                    </Typography>
                  </Box>
                )}
                value={IpCheckValidationTypes.RestrictionInvisible}
                disabled={[IpCheckValidationTypes.Basic, IpCheckValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.invisible.subtitle' })}
                </Typography>
              </Box>
            </BoxBordered>
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="default" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.visible' })}
                    </Typography>
                  </Box>
                )}
                value={IpCheckValidationTypes.RestrictionVisible}
                disabled={[IpCheckValidationTypes.Basic, IpCheckValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.visible.subtitle' })}
                </Typography>
              </Box>
            </BoxBordered>
            <BoxBordered mt={2}>
              <FormControlLabel
                control={<Radio color="default" />}
                label={(
                  <Box color="common.black75">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.verificationFlowBlock' })}
                    </Typography>
                  </Box>
                )}
                value={IpCheckValidationTypes.RestrictionBlock}
                disabled={[IpCheckValidationTypes.Basic, IpCheckValidationTypes.None].includes(currentMethod)}
              />
              <Box color="common.black75" pl={3}>
                <Typography variant="body1">
                  {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.verificationFlowBlock.subtitle' })}
                </Typography>
              </Box>
            </BoxBordered>
          </RadioGroup>
        </Box>
      </Grid>
    </Grid>
  );
}
