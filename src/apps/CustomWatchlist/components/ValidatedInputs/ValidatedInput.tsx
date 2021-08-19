import React, { useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import { Grid, Typography, MenuItem } from '@material-ui/core';
import { appPalette } from 'apps/theme';
import { useStyles, SelectStyled } from './ValidatedInputs.styles';
import { SelectedOptions } from './ValidatedInputs';

interface Option {
  label: string;
  value: string;
}

export function ValidatedInput({ title, name, options, selectedOptions, placeholderKey, onChange }:
  {
    title: string;
    name: string;
    placeholderKey: string;
    options: Option[];
    selectedOptions: SelectedOptions;
    onChange: (values: { value: string; name?: string }) => void; }) {
  const [value, setValue] = useState(placeholderKey);
  const classes = useStyles();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const target = event.target;
      setValue(target.value);
      onChange(target);
    },
    [onChange],
  );

  const localOptions = useMemo(() => options.filter((option) => !Object.values(selectedOptions).map((x) => x.value).includes(option.value)), [options, selectedOptions]);

  return (
    <Grid container justifyContent="space-between" alignItems="center" direction="row" className={classes.input}>
      <Grid item><Typography variant="subtitle2">{title}</Typography></Grid>
      <Grid item className={classes.selectWrap}>
        <SelectStyled
          name={name}
          variant="standard"
          fullWidth
          value={value}
          onChange={handleChange}
          IconComponent={() => <FiChevronDown size="18px" strokeWidth={3} color={appPalette.lightblue} />}
          className={classnames(classes.colorBlue, {
            [classes.placeholder]: value === placeholderKey,
          })}
        >
          {selectedOptions[name] && (
            <MenuItem
              key={selectedOptions[name].value}
              value={selectedOptions[name].value}
              disabled
            >
              {selectedOptions[name].label}
            </MenuItem>
          )}
          {localOptions.map((item) => {
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
