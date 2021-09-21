import React, { useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import { Grid, Typography, MenuItem, Box } from '@material-ui/core';
import { appPalette } from 'apps/theme';
import { ValidatedInputsKeys } from 'models/CustomWatchlist.model';
import { RangeSlider } from 'apps/ui/components/RangeSlider/RangeSlider';
import { useStyles, SelectStyled } from './ValidatedInputs.styles';
import { SelectedOptions } from './ValidatedInputs';

interface Option {
  label: string;
  value: string;
}

export function ValidatedInput({ title, name, options, selectedOptions, placeholderKey, value: propValue, onChange }:
  {
    title: string;
    name: string;
    placeholderKey: string;
    options: Option[];
    selectedOptions: SelectedOptions;
    onChange: (values: { value: string; name?: string }) => void;
    value?: string;
  }) {
  const [value, setValue] = useState(propValue || placeholderKey);
  const [rangeSliderValue, setRangeSliderValue] = useState<number>(selectedOptions[name]?.options?.fuzziness || 20);
  const classes = useStyles();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const target = event.target;
      setValue(target.value);
      onChange(target);
    },
    [onChange],
  );

  const handleSliderChange = useCallback(
    (_: React.ChangeEvent<{}>, val: number | number[]) => {
      setRangeSliderValue(val as number);
    },
    [rangeSliderValue],
  );

  const localOptions = useMemo(() => options.filter((option) => !Object.values(selectedOptions).map((x) => x.value).includes(option.value)), [options, selectedOptions]);

  console.log('value', value);
  return (
    <div>
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
      {value === ValidatedInputsKeys.FullName && (
        <Box mb={1.2}>
          <RangeSlider
            defaultValue={rangeSliderValue}
            value={rangeSliderValue}
            onChange={handleSliderChange}
          />
        </Box>
      )}
    </div>
  );
}
