import { Box, FormControl } from '@material-ui/core';
import { getIdentityStatusLabel, getStatusById, IdentityStatusesMap } from 'models/Identity.model';
import React, { useCallback, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { MenuItemSimple, OptionSimple, SelectSimple } from './StatusSelect.styles';

export function StatusSelect({ status, onSelect }) {
  const intl = useIntl();
  const [statuses] = useState(IdentityStatusesMap.filter((item) => item.isChangeable));
  const [current, setCurrent] = useState(() => getStatusById(status));
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback(async (e) => {
    setIsLoading(true);
    setCurrent(getStatusById(e.target.value));
    if (onSelect) {
      const newStatus = getStatusById(e.target.value);
      await onSelect(newStatus.id);
    }
    setIsLoading(false);
  }, [onSelect]);

  const getLabel = useCallback((id) => (
    <Box color="secondary.main" fontWeight="bold">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {intl.formatMessage({ id: 'identity.status' })}: {intl.formatMessage({ id: getIdentityStatusLabel(id) })}
    </Box>
  ), [intl]);

  if (!current) {
    return null;
  }

  return (
    <Box bgcolor={current.color} color="secondary.main" borderRadius={4}>
      <FormControl fullWidth disabled={isLoading}>
        <SelectSimple
          disableUnderline
          onChange={handleSelect}
          value={current.id}
          renderValue={getLabel}
          IconComponent={isLoading ? FiLoader : undefined}
        >
          {statuses.map((item) => (
            <MenuItemSimple value={item.id} key={item.id}>
              <OptionSimple
                bgcolor={item.id === current.id ? item.color : 'secondary.main'}
                color={item.id === current.id ? 'secondary.main' : item.color}
              >
                {intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
              </OptionSimple>
            </MenuItemSimple>
          ))}
        </SelectSimple>
      </FormControl>
    </Box>
  );
}
