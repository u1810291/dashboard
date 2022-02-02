/* eslint-disable import/no-unresolved */
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Box, Chip } from '@material-ui/core';
import { FiX } from 'react-icons/fi';
import { TemplateFiltersProps, TemplateCardOptions } from 'models/TemplatesModal.model';
import { useStyles } from './TemplatesChosenFilters.styles';

export function TemplatesChosenFilters({ currentValue, setCurrentValue, initialData }: TemplateFiltersProps) {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatMessage = useFormatMessage();

  const chosenOptions: [] = Object.values(currentValue).reduce((a, b) => a.concat(b), []);

  function handleDelete(option: TemplateCardOptions) {
    const result = {};
    Object.entries(currentValue).forEach(([filter, array]) => {
      result[filter] = array.filter((filterItem) => filterItem.name !== option.name);
    });
    setCurrentValue(result);
  }

  return (
    <Box>
      <span className={classes.appliedFilters}>Applied filters:</span>
      <span
        role="button"
        tabIndex={0}
        className={classes.resetFilters}
        onClick={() => setCurrentValue(initialData)}
        onKeyPress={() => setCurrentValue(initialData)}
      >
        Reset filters
      </span>
      <Box mt={1.4} mb={0} className={classes.chipContainer}>
        {chosenOptions.map((option: TemplateCardOptions) => (
          <Chip
            className={classes.chip}
            key={option.id}
            label={option.name}
            onDelete={() => handleDelete(option)}
            deleteIcon={<FiX />}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
