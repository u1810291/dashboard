import { Box, IconButton } from '@material-ui/core';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectIdentityFilter } from '../../../../state/identities/identities.selectors';
import { useOverlay } from '../../../overlay';
import { useFilterUpdate } from '../../hooks/filterUpdate.hook';
import { IconButtonSearch, InputAdornmentSearch, TextFieldSearch, useStyles } from './VerificationSearch.styles';

export function VerificationSearch({ isInOverlay }) {
  const intl = useIntl();
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [setFilter] = useFilterUpdate();
  const [adornment, setAdornment] = useState(null);
  const identityFilter = useSelector(selectIdentityFilter);
  const [createOverlay, closeOverlay] = useOverlay();

  useEffect(() => {
    setSearch(identityFilter?.search || '');
  }, [identityFilter.search]);

  const onChangeDebounced = useCallback(debounce((newValue) => {
    setFilter({ search: newValue });
  }, 300), [setFilter]);

  const handleSubmitMobileSearch = useCallback((event) => {
    event.preventDefault();
    closeOverlay();
  }, [closeOverlay]);

  const handleClear = useCallback(() => {
    setSearch('');
    onChangeDebounced('');
  }, [onChangeDebounced]);

  const handleCreateSearchOverlay = useCallback(() => {
    createOverlay(
      <VerificationSearch setFilter={setFilter} isInOverlay />,
      { additionalClasses: ['overlaySearch'] });
  }, [createOverlay, setFilter]);

  useEffect(() => {
    setAdornment(search.length === 0
      ? {
        endAdornment: (
          <InputAdornmentSearch position="end">
            <IconButtonSearch size="small">
              <FiSearch />
            </IconButtonSearch>
          </InputAdornmentSearch>
        ),
      }
      : {
        endAdornment: (
          <InputAdornmentSearch position="end">
            <IconButtonSearch size="small" onClick={handleClear}>
              <FiX />
            </IconButtonSearch>
          </InputAdornmentSearch>
        ),
      });
  }, [search, handleClear]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    return onChangeDebounced(e.target.value);
  }, [onChangeDebounced]);

  return (
    <>
      <form onSubmit={isInOverlay ? handleSubmitMobileSearch : (e) => e.preventDefault()}>
        <Box maxWidth={{ lg: 300 }} height={50} className={!isInOverlay && classes.search}>
          <TextFieldSearch
            value={search}
            fullWidth
            color="primary"
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'VerificationSearch.placeholder' })}
            onChange={handleSearchChange}
            InputProps={adornment}
          />
        </Box>
      </form>
      {!isInOverlay && (
      <IconButton onClick={handleCreateSearchOverlay} className={classes.searchButton}>
        <FiSearch />
      </IconButton>
      )}
    </>
  );
}
