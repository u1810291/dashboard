import React, { useMemo, useCallback } from 'react';
import { FormControl } from '@material-ui/core';
import { IVerificationPatterns } from 'models/VerificationPatterns.model';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './GovCheckCountriesSettings.styles';
import { GovCheck, GovCheckConfigurations, govCheckCountriesOrder, govCheckParse, handleGovCheckSwitch } from '../../models/GovCheck.model';
import { GovCheckCountrySettings } from '../GovCheckCountrySettings/GovCheckCountrySettings';

export function GovCheckCountriesSettings({ verificationPatterns, onChange }: {
    verificationPatterns: IVerificationPatterns;
    onChange: (value: IVerificationPatterns) => void;
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
    let changeableItems = {};
    if (valueChecked && item?.canNotUsedWith?.length) {
      checkList.forEach(({ toggle }) => {
        toggle.forEach((govCheck) => {
          if (item.canNotUsedWith.includes(govCheck.id)) {
            changeableItems = { ...changeableItems, ...handleGovCheckSwitch(govCheck, false) };
          }
        });
      });
    }
    changeableItems = { ...changeableItems, ...handleGovCheckSwitch(item, valueChecked) };
    onChange(changeableItems);
  }, [checkList, onChange]);

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
