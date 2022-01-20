import React, { useEffect, useState, useRef } from 'react';
import { Box, Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import listenForOutsideClick from './hooks/listenForOutsideClicks.hook';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, FilterButton } from './TemplateFilters.styles';

const MOCK_DATA = [
  'All',
  'Oceania',
  'India',
  'Russia',
  'North America',
  'All',
  'Oceania',
  'India',
  'Russia',
  'North America',
  'North America',
  'All',
  'Oceania',
  'India',
  'Russia',
  'North America',
];

export function TemplateFilters({ buttonTitle }) {
  const classes = useStyles();
  const boxRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClick(listening, setListening, boxRef, setIsOpen));

  return (
    <Box mb={2} className={classes.filterContainer} ref={boxRef}>
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
          {MOCK_DATA.length > 0 && MOCK_DATA.map((item, idx) => (
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
  );
}
