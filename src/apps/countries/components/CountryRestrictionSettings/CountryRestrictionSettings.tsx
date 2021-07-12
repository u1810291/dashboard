import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAllCountriesModel } from 'state/countries/countries.selectors';
import { MultiSelect } from 'apps/ui';
import { useStyles } from './CountryRestrictionSettings.styles';

export interface CountryRestrictionSettingsProps {
  onUpdate: (countries: string[]) => void;
  countries: string[];
}

export function CountryRestrictionSettings({ onUpdate, countries = [] }: CountryRestrictionSettingsProps) {
  const countriesModel = useSelector(selectAllCountriesModel);
  const [value, setValue] = useState([]);
  const classes = useStyles();

  const mapCountries = useCallback((item) => ({
    value: item.code,
    label: item.name,
  }), []);

  const mapValues = useCallback((item) => {
    const country = countriesModel.value.find(({ code }) => code === item);
    return {
      value: item,
      label: country?.name,
    };
  }, [countriesModel]);

  const supportedCountries = useMemo(() => countries?.map(mapValues), [countries, mapValues]);
  const countriesFormatted = useMemo(() => countriesModel.value.map(mapCountries), [countriesModel, mapCountries]);

  const handleChange = useCallback((val) => {
    const newValue = val || [];
    setValue(newValue);
    const result = newValue.map((country) => country?.value);
    onUpdate(result);
  }, [onUpdate]);

  useEffect(() => {
    setValue(supportedCountries);
  }, [supportedCountries]);

  return (
    <Box className={classes.wrapper}>
      <MultiSelect
        range={value}
        options={countriesFormatted}
        onChange={handleChange}
      />
    </Box>
  );
}
