import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { PageLoader } from 'apps/layout';
import { QATags } from 'models/QA.model';
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
    const newActiveFilters = event.target.checked
      ? { ...currentFilters, [title]: [...currentActiveFilters, item] }
      : { ...currentFilters, [title]: currentActiveFilters.filter((value) => value.name !== item.name) };
    setCurrentFilters(newActiveFilters);
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
          data-qa={QATags.TemplatesModal.Filters[title]}
          className={classes[title]}
        >
          <Box component="span" className={classes.buttonName}>{buttonTitle}</Box>
        </FilterButton>
        {isOpen
        && (
          <Paper className={classes.filterOptions}>
            { filterData ? (
              <Box>
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
              </Box>
            ) : (
              <PageLoader />
            )}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
