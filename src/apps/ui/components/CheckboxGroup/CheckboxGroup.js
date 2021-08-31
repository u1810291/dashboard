import React, { useCallback } from 'react';
import { FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { useStyles } from './CheckboxGroup.styles';

export function CheckboxGroup({
  items = [],
  values = [],
  onChange,
  label = '',
  name = '',
}) {
  const classes = useStyles();

  const handleCheckboxChange = useCallback(({ target }) => {
    if (!onChange) {
      return;
    }

    if (target.checked) {
      onChange([...(values || []), target.value]);
    } else {
      onChange(values.filter((value) => value !== target.value));
    }
  }, [onChange, values]);

  return (
    <fieldset className={classes.checkboxGroup}>
      {label && <legend className={classes.checkboxGroupLabel}>{label}</legend>}
      {items.map((item) => (
        <Box>
          <FormControlLabel
            className={classes.checkbox}
            control={(
              <Checkbox
                checked={values.includes(item.value)}
                name={name}
                value={item.value}
                onChange={handleCheckboxChange}
                checkedIcon={<CheckboxOn />}
                icon={<CheckboxOff />}
                color="primary"
                size="small"
              />
            )}
            label={item.label}
          />
        </Box>
      ))}
    </fieldset>
  );
}
