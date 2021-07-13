import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { BoxBordered, notification } from 'apps/ui';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { CountryModalSelect } from 'apps/CountryModalSelect';
import { IpCheckValidationTypes } from 'apps/IpCheck/models/IpCheck.model';
import { selectAllowedRegions, selectIpCheckMode, selectVpnRestriction } from '../../state/IpChecks.selectors';
import { useStyles } from './IpChecksConfiguration.styles';

export function IpChecksConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay] = useOverlay();
  const [currentMethod, setCurrentMethod] = useState(useSelector(selectIpCheckMode));
  const [isVpnRestricted, setIsVpnRestricted] = useState(useSelector(selectVpnRestriction));
  const [allowedRegions, setAllowedRegions] = useState(useSelector(selectAllowedRegions));
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeMode = useCallback((modeOn: IpCheckValidationTypes, modeOff?: IpCheckValidationTypes) => async ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const value = checked ? modeOn : modeOff;
    setCurrentMethod(value);
    if (modeOn === IpCheckValidationTypes.RestrictionBlock) {
      setIsVpnRestricted(true);
    }

    if (modeOff === IpCheckValidationTypes.Basic) {
      setIsVpnRestricted(false);
    }

    if (modeOn === IpCheckValidationTypes.RestrictionInvisible && (allowedRegions || []).length === 0) {
      setAllowedRegions(null);
    }
  }, [allowedRegions]);

  const handleVpnRestricted = useCallback(({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => setIsVpnRestricted(checked), []);

  const handleSubmit = useCallback(() => {
    setIsLoading(true);
    try {
      dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.IpValidation]: currentMethod,
          [VerificationPatternTypes.VpnDetection]: isVpnRestricted,
        },
        ipValidation: { allowedRegions },
      }));
    } catch (error) {
      console.error('error', error.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  },
  [dispatch, currentMethod, isVpnRestricted, allowedRegions, intl]);

  const openCountryModal = useCallback(() => {
    createOverlay(
      <CountryModalSelect
        initialValues={allowedRegions}
        onSubmit={(data) => {
          setAllowedRegions(data);
        }}
      />,
    );
  }, [allowedRegions, createOverlay]);

  return (
    <FormControl component="fieldset" className={classes.root}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <BoxBordered>
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
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </BoxBordered>
        </Grid>
        <Grid item xs={12}>
          <BoxBordered mt={2}>
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
                  checked={currentMethod === IpCheckValidationTypes.RestrictionInvisible || currentMethod === IpCheckValidationTypes.RestrictionVisible || currentMethod === IpCheckValidationTypes.RestrictionBlock}
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
                    disabled={currentMethod === IpCheckValidationTypes.None || currentMethod === IpCheckValidationTypes.Basic}
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
                disabled={currentMethod === IpCheckValidationTypes.None || currentMethod === IpCheckValidationTypes.Basic}
              >
                {intl.formatMessage({ id: 'Product.configuration.ipCheck.geoRestriction.editButton' })}
              </Button>
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
                  disabled={currentMethod === IpCheckValidationTypes.None || currentMethod === IpCheckValidationTypes.Basic}
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
                  disabled={currentMethod === IpCheckValidationTypes.None || currentMethod === IpCheckValidationTypes.Basic}
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
                  disabled={currentMethod === IpCheckValidationTypes.None || currentMethod === IpCheckValidationTypes.Basic}
                />
                <Box color="common.black75" pl={3}>
                  <Typography variant="body1">
                    {intl.formatMessage({ id: 'Product.configuration.ipCheck.checks.verificationFlowBlock.subtitle' })}
                  </Typography>
                </Box>
              </BoxBordered>
            </RadioGroup>
          </BoxBordered>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {intl.formatMessage({ id: 'Product.configuration.ipCheck.submit' })}
        </Button>
      </Box>
    </FormControl>
  );
}
