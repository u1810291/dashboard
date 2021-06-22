import { Box, IconButton } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { debounce } from 'lodash';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectIdentityFilter } from 'state/identities/identities.selectors';
import classNames from 'classnames';
import { IconButtonSearch, InputAdornmentSearch, TextFieldSearch, useStyles } from './VerificationSearch.styles';

export function VerificationSearch({ isInOverlay, onSetFilter }) {
  const intl = useIntl();
  const classes = useStyles();
  const identityFilter = useSelector(selectIdentityFilter);
  const [search, setSearch] = useState('');
  const [adornment, setAdornment] = useState(null);
  const [createOverlay, closeOverlay] = useOverlay();

  useEffect(() => {
    setSearch(identityFilter?.search || '');
  }, [identityFilter]);

  const onChangeDebounced = useCallback(debounce((newValue) => {
    onSetFilter({ search: newValue });
  }, 300), [onSetFilter]);

  const handleSubmitMobileSearch = useCallback((event) => {
    event.preventDefault();
    closeOverlay();
  }, [closeOverlay]);

  const handleClear = useCallback(() => {
    setSearch('');
    onChangeDebounced('');
  }, [onChangeDebounced]);

  const handleCreateSearchOverlay = useCallback(() => {
    createOverlay(<VerificationSearch onSetFilter={onSetFilter} isInOverlay />, {
      additionalClasses: ['overlaySearch'],
    });
  }, [createOverlay, onSetFilter]);

  useEffect(() => {
    setAdornment(search.length === 0
      ? {
        endadornment: (
          <InputAdornmentSearch position="end">
            <IconButtonSearch size="small">
              <FiSearch />
            </IconButtonSearch>
          </InputAdornmentSearch>
        ),
      }
      : {
        endadornment: (
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
        <Box maxWidth={{ lg: 300 }} height={50} className={classNames({ [classes.search]: !isInOverlay })}>
          <TextFieldSearch
            value={search}
            fullWidth
            color="primary"
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'VerificationSearch.placeholder' })}
            onChange={handleSearchChange}
            inputProps={{ ...adornment, 'data-qa': QATags.VerificationList.Search }}
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
