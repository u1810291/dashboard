import React, { useCallback, useMemo } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { GovCheckCountrySettings, GovCheck, GovCheckConfigurations, govCheckCountriesOrder, GovCheckParsed, isCanUseGovCheck, GovCheckCountryTypes } from 'apps/GovCheck';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import cloneDeep from 'lodash/cloneDeep';
import { DocumentStepTypes } from 'models/Step.model';
import { useStyles } from './FacematchGovCheckSettings.styles';

export function FacematchGovCheckSettings({ onChange, checkedFacematchGovChecks }: {
  checkedFacematchGovChecks: string[];
  onChange: (item: GovCheck) => (event: any) => void;
}) {
  const classes = useStyles();
  const tags = useSelector<any, MerchantTags[]>(selectMerchantTags);

  const countryList = useCallback(() => {
    const checkListForCountry = (country: GovCheckCountryTypes): GovCheckParsed[] => {
      const found = GovCheckConfigurations.find((item) => item.country === country);
      if (!found) {
        return null;
      }
      const config = cloneDeep(found);
      if (country === GovCheckCountryTypes.Nigeria) {
        config.checks = [{
          id: VerificationPatternTypes.NigerianLegal,
          default: false,
          isSupportFacematch: true,
        }];
      }

      const checks = config.checks
        .filter(({ isSupportFacematch, option }) => isSupportFacematch || option?.isSupportFacematch)
        .map((check) => {
          const { id, option } = check;
          let { description } = check;

          let isCanUse: boolean;

          if (id === DocumentStepTypes.ArgentinianRenaperFacematch) {
            description = false;
          }

          if (option?.isSupportFacematch) {
            isCanUse = isCanUseGovCheck(option, tags);
          } else {
            isCanUse = isCanUseGovCheck(check, tags);
          }

          return { ...check, description, value: checkedFacematchGovChecks.includes(id), isDisabled: !isCanUse, isCanUse };
        });

      return checks;
    };
    return govCheckCountriesOrder.map((country) => ({
      country,
      checkList: checkListForCountry(country),
    }));
  }, [checkedFacematchGovChecks, tags]);

  const govCheckCountries = useMemo(() => countryList().map((item) => {
    const { country, checkList } = item;
    if (!checkList.length) {
      return null;
    }

    return (
      <GovCheckCountrySettings key={country} country={country} checkList={checkList} onChange={onChange} hideOptions />
    );
  }), [countryList, onChange]);

  return (
    <FormControl className={classes.control}>
      {govCheckCountries}
    </FormControl>
  );
}
