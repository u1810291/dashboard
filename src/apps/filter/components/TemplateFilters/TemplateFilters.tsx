import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useFormatMessage } from 'apps/intl';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import FilterListIcon from '@material-ui/icons/FilterList';
import { TempalteFilterProps, TemplateFilterOptions } from 'apps/SolutionCatalog';
import { useStyles, FilterButton } from './TemplateFilters.style';

export function TemplateFilters({ title, filterData, currentFilters, setCurrentFilters }: TempalteFilterProps) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formatMessage = useFormatMessage();
  const toggle = () => setIsOpen(!isOpen);
  const handleClickAway = () => setIsOpen(false);
  const buttonTitle = `${formatMessage('TemplateFilter.button')} ${title}`;

  function activeFilters(event, item: TemplateFilterOptions) {
    const currentActiveFilters = currentFilters[title];
    return event.target.checked
      ? setCurrentFilters({ ...currentFilters, [title]: [...currentActiveFilters, item] })
      : setCurrentFilters({ ...currentFilters, [title]: currentActiveFilters.filter((value) => value.name !== item.name) });
  }

  function isCheckboxChecked(item: TemplateFilterOptions) {
    if (!currentFilters[title].length) return false;
    return !!currentFilters[title].find((filter) => filter.name === item.name);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box mb={2} className={classes.filterContainer}>
        <FilterButton
          onClick={toggle}
          variant="contained"
          startIcon={<FilterListIcon />}
        >
          <Box component="span" className={classes.buttonName}>{buttonTitle}</Box>
        </FilterButton>
        {isOpen
        && (
          <Paper className={classes.filterOptions}>
            <FormControlLabel
              className={classes.filterOption}
              value="All"
              control={(
                <Checkbox
                  color="primary"
                  checked={!currentFilters[title].length}
                  checkedIcon={<CheckboxOn />}
                  icon={<CheckboxOff />}
                />
              )}
              label="All"
              onChange={() => setCurrentFilters({ ...currentFilters, [title]: [] })}
            />
            {filterData.length > 0 && filterData.map((item) => (
              <FormControlLabel
                className={classes.filterOption}
                key={item._id}
                value={item.name}
                control={(
                  <Checkbox
                    color="primary"
                    checked={isCheckboxChecked(item)}
                    checkedIcon={<CheckboxOn />}
                    icon={<CheckboxOff />}
                  />
                )}
                label={item.name}
                onChange={(event) => activeFilters(event, item)}
              />
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
