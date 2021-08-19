import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import { Grid, Typography, MenuItem } from '@material-ui/core';
import { appPalette } from 'apps/theme';
import { useStyles, SelectStyled } from './ValidatedInputs.styles';

interface Option {
  label: string;
  value: string;
}

export function ValidatedInput({ label, options, selectedOptions, placeholderKey, onChange }:
  {
    label: string;
    placeholderKey: string;
    options: Option[];
    selectedOptions: string[];
    onChange: (values: { value: string; name?: string; }, bool: boolean) => void; }) {
  const [value, setValue] = useState(placeholderKey);
  const classes = useStyles();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string; }>) => {
      const target = event.target;
      setValue(target.value);
      onChange(target, target !== value);
    },
    [onChange, value],
  );

  return (
    <Grid container justifyContent="space-between" alignItems="center" direction="row" className={classes.input}>
      <Grid item><Typography variant="subtitle2">{label}</Typography></Grid>
      <Grid item className={classes.selectWrap}>
        <SelectStyled
          name={label}
          variant="standard"
          fullWidth
          value={value}
          onChange={handleChange}
          IconComponent={() => <FiChevronDown size="18px" strokeWidth={3} color={appPalette.lightblue} />}
          className={classnames(classes.colorBlue, {
            [classes.placeholder]: value === placeholderKey,
          })}
        >
          {options.map((item) => {
            if (item.value === 'placeholder') {
              return (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  className={classes.placeholder}
                >
                  {item.label}
                </MenuItem>
              );
            }
            return (
              <MenuItem
                key={`${item.value}-${item.label}`}
                value={item.value}
                disabled={selectedOptions.includes(item.value)}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </SelectStyled>
      </Grid>
    </Grid>
  );
}
