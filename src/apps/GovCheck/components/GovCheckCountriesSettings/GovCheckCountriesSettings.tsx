import { Box, FormControl, Grid, Switch } from '@material-ui/core';
import { flagMap } from 'assets/flags';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { ExtendedDescription } from 'apps/ui';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './GovCheckCountriesSettings.styles';
import { GovCheck, GovCheckConfigurations, govCheckCountriesOrder, govCheckParse, GovCheckTypesForStep, isGovCheckDisabled, isGovCheckOptionDisabled, isCanUseGovCheck } from '../../models/GovCheck.model';
import { GovCheckSalesToolTip } from '../GovCheckSalesToolTip/GovCheckSalesToolTip';

export function GovCheckCountriesSettings({ verificationPatterns, onChange }: {
    verificationPatterns: VerificationPatterns;
    onChange: (value: VerificationPatterns) => void;
  }) {
  const intl = useIntl();
  const classes = useStyles();

  const tags = useSelector(selectMerchantTags);

  const checkList = useMemo(() => {
    const checkListForCountry = (country: string) => {
      const found = GovCheckConfigurations.find((item) => item.country === country);
      if (!found) {
        return null;
      }

      return govCheckParse(found.checks, verificationPatterns);
    };

    return govCheckCountriesOrder.map((country) => ({
      country,
      toggle: checkListForCountry(country),
    }));
  }, [verificationPatterns]);

  const handleSwitch = useCallback((item: GovCheck) => (event) => {
    const valueChecked: boolean = event.target.checked;

    if (item?.stepTypeAlias) {
      const value = valueChecked ? item.stepTypeAlias : GovCheckTypesForStep[item.id].none;
      onChange({ [item.id]: value || valueChecked });
      return;
    }
    if (item.option) {
      onChange({ [item.id]: valueChecked, [item.option.id]: valueChecked && item.option.value });
      return;
    }

    onChange({ [item.id]: valueChecked });
  }, [onChange]);

  const handleSwitchOption = useCallback((item: GovCheck) => (event) => {
    const valueChecked: boolean = event.target.checked;

    if (item.option?.stepTypeAlias) {
      onChange({ [item.id]: valueChecked ? item.option?.stepTypeAlias : item.stepTypeAlias });
    } else {
      onChange({ [item.option.id]: item.value ? valueChecked : item.value });
    }
  }, [onChange]);

  return (
    <FormControl className={classes.control}>
      {checkList.map((item) => {
        const { country, toggle } = item;
        if (!toggle) {
          return null;
        }

        return (
          <Box key={country} className={classes.wrapper} p={1} pr={2} mt={1}>
            <Grid container alignItems="center" wrap="nowrap">
              <Box mr={1} className={classes.icon}>{flagMap[country]}</Box>
              <Box color="common.black90" fontWeight="bold">
                {intl.formatMessage({ id: `GovCheck.country.${country}` })}
              </Box>
            </Grid>
            {toggle.map((govCheck) => (
              <Box key={govCheck.id} mt={1} className={classes.check}>
                <ExtendedDescription
                  title={(
                    <>
                      {intl.formatMessage({ id: `GovCheck.check.${govCheck.id}` })}
                      {!isCanUseGovCheck(govCheck, tags) && (<GovCheckSalesToolTip />)}
                    </>
                  )}
                  titleColor="common.black75"
                  text={govCheck.description && intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.description` })}
                  textFontSize={10}
                  postfix={(
                    <Switch
                      checked={!!govCheck.value}
                      onChange={handleSwitch(govCheck)}
                      color="primary"
                      disabled={isGovCheckDisabled(govCheck, verificationPatterns, tags)}
                    />
                  )}
                />
                {govCheck.option && (
                  <Box display="flex" mt={0.3}>
                    <Box className={classes.arrow} />
                    <Box ml={0.5} width="100%">
                      <ExtendedDescription
                        title={(
                          <>
                            {govCheck.option.stepTypeAlias ? intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}` }) : intl.formatMessage({ id: `GovCheck.check.${govCheck.option.id}` })}
                            {!isCanUseGovCheck(govCheck.option, tags) && (<GovCheckSalesToolTip isGovCheckOption />)}
                          </>
                        )}
                        titleColor="common.black75"
                        text={govCheck.option.description && intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}.description` })}
                        textFontSize={10}
                        postfix={(
                          <Switch
                            checked={!!govCheck.option.value}
                            onChange={handleSwitchOption(govCheck)}
                            color="primary"
                            disabled={isGovCheckOptionDisabled(govCheck, verificationPatterns, tags)}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        );
      })}
    </FormControl>
  );
}
