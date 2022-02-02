import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, FilterButton } from './TemplateFilters.styles';

export function TemplateFilters({ title, filterData, currentFilters, setCurrentFilters }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleClickAway = () => setIsOpen(false);
  const buttonTitle = `Filter by ${title}`;

  function activeFilters(ev, item) {
    const currentActiveFilters = currentFilters[title];
    return ev.target.checked
      ? setCurrentFilters({ ...currentFilters, [title]: [...currentActiveFilters, item] })
      : setCurrentFilters({ ...currentFilters, [title]: currentActiveFilters.filter((value) => value.name !== item.name) });
  }

  function isCheckboxChecked(item) {
    if (!currentFilters[title].length) return false;
    return !!currentFilters[title].find((filter) => filter.name === item.name) && true;
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
                key={item.id}
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
                onChange={(ev) => activeFilters(ev, item)}
              />
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
