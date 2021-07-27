import { Box, IconButton } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { useDebounce } from 'lib/debounce.hook';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectIdentityFilter } from 'state/identities/identities.selectors';
import classNames from 'classnames';
import { KeyboardKeys } from 'models/Keyboard.model';
import { IconButtonSearch, InputAdornmentSearch, TextFieldSearch, useStyles } from './VerificationSearch.styles';

export function VerificationSearch({ isInOverlay, onSetFilter }) {
  const intl = useIntl();
  const classes = useStyles();
  const debounced = useDebounce();
  const identityFilter = useSelector(selectIdentityFilter);
  const [search, setSearch] = useState('');
  const [adornment, setAdornment] = useState(null);
  const [createOverlay, closeOverlay] = useOverlay();

  useEffect(() => {
    setSearch(identityFilter?.search || '');
  }, [identityFilter]);

  const handleChange = useCallback((newValue) => {
    onSetFilter({ search: newValue });
  }, [onSetFilter]);

  const handleSubmitMobileSearch = useCallback((event) => {
    event.preventDefault();
    closeOverlay();
  }, [closeOverlay]);

  const handleClear = useCallback(() => {
    setSearch('');
    debounced(() => handleChange(''));
  }, [debounced, handleChange]);

  const handleCreateSearchOverlay = useCallback(() => {
    createOverlay(<VerificationSearch onSetFilter={onSetFilter} isInOverlay />, {
      additionalClasses: ['overlaySearch'],
    });
  }, [createOverlay, onSetFilter]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
  }, []);

  const handleSearchExecute = useCallback((e) => {
    if (e.key === KeyboardKeys.Enter) {
      handleChange(e.target.value);
    }
  }, [handleChange]);

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

  return (
    <>
      <form onSubmit={isInOverlay ? handleSubmitMobileSearch : (e) => e.preventDefault()}>
        <Box maxWidth={{ lg: 300 }} height={50} className={classNames({ [classes.search]: !isInOverlay })}>
          <TextFieldSearch
            value={search}
            fullWidth
            color="primary"
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'VerificationSearch.placeholder' })}
            onChange={handleSearchChange}
            onKeyDown={handleSearchExecute}
            InputProps={{ ...adornment, 'data-qa': QATags.VerificationList.Search }}
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
