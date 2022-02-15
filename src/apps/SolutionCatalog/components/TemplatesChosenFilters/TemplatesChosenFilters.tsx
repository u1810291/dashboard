import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { FiX } from 'react-icons/fi';
import { TemplateChosenFiltersProps, TemplateFilterOptions, loadTemplates } from 'apps/SolutionCatalog';
import { useStyles } from './TemplatesChosenFilters.styles';

export function TemplatesChosenFilters({ currentValue, setCurrentValue, initialData }: TemplateChosenFiltersProps) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  const chosenOptions: TemplateFilterOptions[] = Object.values(currentValue).reduce((result, current) => result.concat(current), []);

  function handleDelete(option: TemplateFilterOptions) {
    const resultAfterDelete = initialData;
    Object.entries(currentValue).forEach(([filter, array]) => {
      resultAfterDelete[filter] = array.filter((filterItem) => filterItem.name !== option.name);
    });
    const resultArray = Object.values(resultAfterDelete).reduce((sum: TemplateFilterOptions[], current: TemplateFilterOptions[]) => sum.concat(current), []);
    dispatch(loadTemplates(resultArray));
    setCurrentValue(resultAfterDelete);
  }

  return (
    <Box>
      <span className={classes.appliedFilters}>
        {formatMessage('TemplateChosenFilters.title')}
      </span>
      <span
        role="button"
        tabIndex={0}
        className={classes.resetFilters}
        onClick={() => {
          dispatch(loadTemplates([]));
          setCurrentValue(initialData);
        }}
        onKeyPress={() => {
          setCurrentValue(initialData);
        }}
      >
        {formatMessage('TemplateChosenFilters.resetButton')}
      </span>
      <Box mt={1.4} mb={0} className={classes.chipContainer}>
        {chosenOptions.map((option) => (
          <Chip
            className={classes.chip}
            key={option._id}
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
