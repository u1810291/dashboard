import React, { useMemo, useCallback } from 'react';
import { FormControl } from '@material-ui/core';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './GovCheckCountriesSettings.styles';
import { GovCheckCountrySettings } from '../GovCheckCountrySettings/GovCheckCountrySettings';
import { GovCheck, GovCheckConfigurations, govCheckCountriesOrder, govCheckParse, GovCheckTypesForStep } from '../../models/GovCheck.model';

export function GovCheckCountriesSettings({ verificationPatterns, onChange }: {
    verificationPatterns: VerificationPatterns;
    onChange: (value: VerificationPatterns) => void;
  }) {
  const classes = useStyles();

  const tags = useSelector(selectMerchantTags);

  const checkList = useMemo(() => {
    const checkListForCountry = (country: string) => {
      const found = GovCheckConfigurations.find((item) => item.country === country);
      if (!found) {
        return null;
      }

      return govCheckParse(found.checks, verificationPatterns, tags);
    };

    return govCheckCountriesOrder.map((country) => ({
      country,
      toggle: checkListForCountry(country),
    }));
  }, [tags, verificationPatterns]);

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
          <GovCheckCountrySettings key={country} country={country} checkList={toggle} onChange={handleSwitch} onChangeOption={handleSwitchOption} />
        );
      })}
    </FormControl>
  );
}
