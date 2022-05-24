import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'lib/debounce.hook';
import { useOverlay } from 'apps/overlay';
import { FixedSizeTree } from 'react-vtree';
import React, { useCallback, useState, useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { BoxBordered } from 'apps/ui';
import { AllowedRegions, Country } from 'models/Country.model';
import { treeWalker, regionsConverting, getInitialSelectedCountries, SelectedCountries, Tree, markLocationChecked } from '../../models/CountryModalSelect.model';
import { CountryModalItemSelect } from '../CountryModalItemSelect/CountryModalItemSelect';
import { useStyles, StyledButtonBase } from './CountryModalSelect.styles';

export function CountryModalSelect({ onSubmit, onCancel, initialValues, countries }: {
  onSubmit: (data: AllowedRegions[]) => void;
  onCancel: () => void;
  initialValues: AllowedRegions[] | null;
  countries: Country[];
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountries>(getInitialSelectedCountries(initialValues, countries));
  const debounced = useDebounce();

  const handleSelectCountry = useCallback(
    (checked: boolean, location: string, countryCode?: string) => {
      setSelectedCountries(markLocationChecked(selectedCountries, countries, checked, location, countryCode));
    },
    [selectedCountries, countries],
  );

  const handleSelectAll = useCallback(() => {
    setSelectedCountries(countries.reduce((memo: SelectedCountries, { id, regions }) => {
      memo[id] = regions.reduce(regionsConverting(true), {});
      return memo;
    }, {}));
  }, [countries]);

  const handleDeselectAll = useCallback(() => {
    setSelectedCountries({});
  }, []);

  const handleSubmit = useCallback(() => {
    const submittedCountries = countries
      .filter((country) => selectedCountries[country.id])
      .map((country) => ({
        country: country.id,
        regions: country.regions.filter((region) => selectedCountries[country.id]?.[region]),
      }));
    onSubmit(submittedCountries);
    closeOverlay();
  }, [onSubmit, countries, closeOverlay, selectedCountries]);

  const allRegionsSelected = useMemo(() => Object.keys(selectedCountries)?.reduce((memo, country) => {
    memo[country] = selectedCountries[country] && Object.values(selectedCountries[country]).every((value) => value !== false);
    return memo;
  }, {}), [selectedCountries]);

  const createTree = useCallback((countryList: Country[]) => (countryList.map((country, index) => ({
    // id must be unique
    id: `${country.id}-${index}`,
    location: country.code,
    label: formatMessage(`Countries.${country.code}`),
    children: country.regions.map((region) => ({
      id: region,
      location: region,
      countryCode: country.code,
      label: formatMessage(`Regions.${country.code}.${region}`),
    })).sort((a, b) => (a.label.localeCompare(b.label))),
  })).sort((a, b) => (a.label.localeCompare(b.label)))
  ), [formatMessage]);

  const [tree, setTree] = useState<Tree[]>(createTree(countries));
  const handleTreeWalker = useCallback((refresh: boolean) => treeWalker(refresh, tree), [tree]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    debounced(() => {
      const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(query));
      setTree(createTree(filteredCountries));
    });
  }, [countries, createTree, debounced]);

  const listItemData = useMemo(() => ({
    handleSelectCountry,
    selectedCountries,
    allRegionsSelected,
    firstCountryId: countries?.[0]?.id || '',
  }), [allRegionsSelected, countries, handleSelectCountry, selectedCountries]);

  return (
    <>
      <Box className={classes.headerControls}>
        <Box className={classes.selectedAmount}>
          {Object.keys(selectedCountries).filter((key) => selectedCountries[key]).length}
          {formatMessage('CountryModalSelect.selectedAmount')}
        </Box>
        <Box mr={2}>
          <StyledButtonBase disableRipple onClick={handleSelectAll}>{formatMessage('CountryModalSelect.selectAll')}</StyledButtonBase>
        </Box>
        <Box>
          <StyledButtonBase disableRipple onClick={handleDeselectAll}>{formatMessage('CountryModalSelect.deselectAll')}</StyledButtonBase>
        </Box>
      </Box>
      <BoxBordered mt={1} mb={2} className={classes.formBox}>
        <OutlinedInput
          fullWidth
          className={classes.searchInput}
          type="search"
          startAdornment={<SearchIcon className={classes.searchIcon} />}
          placeholder={formatMessage('CountryModalSelect.filter')}
          onChange={handleSearchChange}
        />
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
      <Box className={classes.footer}>
        <Button variant="text" color="primary" onClick={onCancel}>
          {formatMessage('CountryModalSelect.cancel')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.submitButton}>
          {formatMessage('CountryModalSelect.submit')}
        </Button>
      </Box>
    </>
  );
}
