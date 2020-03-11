import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useIntl } from 'react-intl';
import { IconButton, InputAdornment } from '@material-ui/core';
import { FiX } from 'react-icons/fi';
import { TextFieldSearch } from './VerificationSearch.styles';

export function VerificationSearch({ value, onChange }) {
  const intl = useIntl();
  const [search, setSearch] = useState('');
  const [adornment, setAdornment] = useState(null);

  useEffect(() => {
    setSearch(value || '');
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    setSearch('');
    onChange({ search: '' });
  }, [onChange]);

  useEffect(() => {
    setAdornment(search.length === 0
      ? null
      : {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear}>
              <FiX />
            </IconButton>
          </InputAdornment>
        ),
      });
  }, [search, handleClear]);

  const onChangeDebounced = useCallback(debounce((newValue) => {
    onChange({ search: newValue });
  }, 300), [onChange]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    return onChangeDebounced(e.target.value);
  }, [onChangeDebounced]);

  return (
    <TextFieldSearch
      value={search}
      fullWidth
      margin="dense"
      color="primary"
      variant="outlined"
      placeholder={intl.formatMessage({ id: 'VerificationSearch.placeholder' })}
      onChange={handleSearchChange}
      InputProps={adornment}
    />
  );
}
