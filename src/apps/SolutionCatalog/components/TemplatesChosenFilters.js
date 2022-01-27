/* eslint-disable import/no-unresolved */
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Box, Chip } from '@material-ui/core';
import { useStyles } from './TemplatesModal/TemplatesModal.styles';

export function TemplatesChosenFilters({ currentValue, setCurrentValue }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  const chosenOptions = Object.values(currentValue).reduce((a, b) => a.concat(b), []);

  function handleDelete(option) {
    const result = {};
    Object.entries(currentValue).forEach(([filter, array]) => {
      result[filter] = array.filter((item) => item !== option);
    });
    setCurrentValue(result);
  }

  return (
    <Box>
      <span className={classes.appliedFilters}>Applied filters:</span>
      <span
        role="button"
        tabIndex="0"
        className={classes.resetFilters}
        onClick={() => setCurrentValue({ Industry: [], Country: [] })}
        onKeyPress={() => setCurrentValue({ Industry: [], Country: [] })}
      >
        Reset filters
      </span>
      <Box mt={1.4} mb={0} className={classes.chipContainer}>
        { chosenOptions.map((option, idx) => (
          <Chip
            className={classes.chip}
            key={idx}
            label={option}
            onDelete={() => handleDelete(option)}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
