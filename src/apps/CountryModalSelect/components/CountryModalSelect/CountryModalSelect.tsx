import { Button, Box, Grid, List } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { FixedSizeTree } from 'react-vtree';
import React, { useCallback, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BoxBordered } from 'apps/ui';
import { AllowedRegions } from 'models/Country.model';
import { useCountriesLoad } from 'apps/countries';
import { treeWalker, regionsConverting, getInitialSelectedCountries, SelectedCountries, Tree } from '../../models/CountryModalSelect.model';
import { CountryModalItemSelect } from '../CountryModalItemSelect/CountryModalItemSelect';
import { useStyles, StyledButtonBase } from './CountryModalSelect.styles';

export function CountryModalSelect({ onSubmit, initialValues }: {
  onSubmit: (data: AllowedRegions[]) => void;
  initialValues: AllowedRegions[] | null;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const countriesModel = useCountriesLoad();
  const countries = countriesModel.value;
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountries>(getInitialSelectedCountries(initialValues, countries));

  const updateSelectedCountries = useCallback(
    (country: string, checked: boolean, region?: string) => {
      if (region) {
        return {
          ...selectedCountries,
          [country]: {
            ...countries.find((elm) => elm.id === country).regions.reduce(regionsConverting(false), {}),
            ...selectedCountries[country],
            [region]: checked,
          },
        };
      }
      return {
        ...selectedCountries,
        [country]: checked ? countries.find(({ id }) => id === country).regions.reduce(regionsConverting(true), {}) : null,
      };
    },
    [selectedCountries, countries],
  );

  const handleSelectCountry = useCallback(
    (country: string, region?: string) => (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const payload = updateSelectedCountries(country, checked, region);
      setSelectedCountries(payload);
    },
    [updateSelectedCountries],
  );

  const handleSelectAll = useCallback(() => {
    setSelectedCountries(countries.reduce((memo, { id, regions }) => {
      memo[id] = regions.reduce(regionsConverting(true), {});
      return memo;
    }, {}));
  }, [countries]);

  const handleDeselectAll = useCallback(() => {
    setSelectedCountries({});
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(countries.filter(({ id }) => !!selectedCountries[id]).map(({ id, regions }) => ({
      country: id,
      regions: regions.filter((region) => !!selectedCountries[id]?.[region]),
    })));
    closeOverlay();
  }, [onSubmit, countries, closeOverlay, selectedCountries]);

  const allRegionsSelected = useMemo(() => Object.keys(selectedCountries)?.reduce((memo, country) => {
    memo[country] = selectedCountries[country] && Object.values(selectedCountries[country]).every((value) => value !== false);
    return memo;
  }, {}), [selectedCountries]);

  const tree = useMemo<Tree[]>(() => (countries.map((country, index) => ({
    // id must be unique
    id: `${country.id}-${index}`,
    name: country.code,
    label: intl.formatMessage({ id: `Countries.${country.code}` }),
    children: country.regions.map((region) => ({
      id: region,
      name: region,
      countryCode: country.code,
      label: intl.formatMessage({ id: `Regions.${country.code}.${region}` }),
    })).sort((a, b) => (a.label < b.label ? -1 : 1)),
  })).sort((a, b) => (a.label < b.label ? -1 : 1))
  ), [countries, intl]);
  const handleTreeWalker = useCallback((refresh: boolean) => treeWalker(refresh, tree), [tree]);

  const listItemData = useMemo(() => ({
    handleSelectCountry,
    selectedCountries,
    allRegionsSelected,
    firstCountryId: countries?.[0]?.id || '',
  }), [allRegionsSelected, countries, handleSelectCountry, selectedCountries]);

  return (
    <>
      <Grid container justify="flex-end">
        <Box mr={2}>
          <StyledButtonBase disableRipple onClick={handleSelectAll}>{intl.formatMessage({ id: 'Product.configuration.ipCheck.selectValidCountry.selectAll' })}</StyledButtonBase>
        </Box>
        <Box>
          <StyledButtonBase disableRipple onClick={handleDeselectAll}>{intl.formatMessage({ id: 'Product.configuration.ipCheck.selectValidCountry.deselectAll' })}</StyledButtonBase>
        </Box>
      </Grid>
      <BoxBordered mt={1} mb={2} className={classes.formBox}>
        <List className={classes.tree}>
          <FixedSizeTree
            treeWalker={handleTreeWalker}
            itemSize={30}
            height={340}
            width="100%"
            itemData={listItemData}
          >
            {CountryModalItemSelect}
          </FixedSizeTree>
        </List>
      </BoxBordered>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {intl.formatMessage({ id: 'Product.configuration.ipCheck.selectValidCountry.submit' })}
      </Button>
    </>
  );
}
