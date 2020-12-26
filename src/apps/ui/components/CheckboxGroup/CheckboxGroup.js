import React from 'react';
import { FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { useStyles } from './CheckboxGroup.styles';

export function CheckboxGroup({
  items = [],
  values = [],
  onChange = () => {},
  label = '',
  name = '',
}) {
  const classes = useStyles();

  function handleCheckboxChange({ target }) {
    if (target.checked) {
      onChange([...(values || []), target.value]);
    } else {
      onChange(values.filter((value) => value !== target.value));
    }
  }

  return (
    <fieldset className={classes.checkboxGroup}>
      {label && <legend className={classes.checkboxGroupLabel}>{label}</legend>}
      {/* eslint-disable-next-line no-shadow */}
      {items.map(({ label, value }) => (
        <Box>
          <FormControlLabel
            className={classes.checkbox}
            control={(
              <Checkbox
                checked={values.includes(value)}
                name={name}
                value={value}
                onChange={handleCheckboxChange}
                checkedIcon={<CheckboxOn />}
                icon={<CheckboxOff />}
                color="primary"
                size="small"
              />
            )}
            label={label}
          />
        </Box>
      ))}
    </fieldset>
  );
}
