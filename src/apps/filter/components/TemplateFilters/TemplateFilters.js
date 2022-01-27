import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, FilterButton } from './TemplateFilters.styles';

export function TemplateFilters({ title, filterData, currentValue, setCurrentValue }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleClickAway = () => setIsOpen(false);
  const buttonTitle = `Filter by ${title}`;

  function activeFilters(ev, item) {
    const currentActiveFilters = currentValue[title];
    if (item === 'All') { return setCurrentValue({ ...currentValue, [title]: [] }); }
    return ev.target.checked
      ? setCurrentValue({ ...currentValue, [title]: [...currentActiveFilters, item] })
      : setCurrentValue({ ...currentValue, [title]: currentActiveFilters.filter((value) => value !== item) });
  }

  function isCheckboxChecked(item) {
    if (item === 'All' && !currentValue[title].length) return true;
    return currentValue[title].includes(item) && true;
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
            {filterData.length > 0 && filterData.map((item, idx) => (
              <FormControlLabel
                className={classes.filterOption}
                key={idx}
                value={item}
                control={(
                  <Checkbox
                    color="primary"
                    checked={isCheckboxChecked(item)}
                    checkedIcon={<CheckboxOn />}
                    icon={<CheckboxOff />}
                  />
                )}
                label={item}
                onChange={(ev) => activeFilters(ev, item)}
              />
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
