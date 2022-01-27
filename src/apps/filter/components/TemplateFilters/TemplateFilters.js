import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, FilterButton } from './TemplateFilters.styles';

export function TemplateFilters({ buttonTitle, filterData }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleClickAway = () => setIsOpen(false);

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
                control={<Checkbox color="primary" defaultChecked={item === 'All' && true} checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
                label={item}
              />
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
