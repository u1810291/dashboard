import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from 'lib/debounce.hook';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import { Grid, Typography, MenuItem, Box } from '@material-ui/core';
import { appPalette } from 'apps/theme';
import { RangeSlider } from 'apps/ui/components/RangeSlider/RangeSlider';
import { useFormatMessage } from 'apps/intl';
import { SelectedOptions } from '../ValidatedInputs/ValidatedInputs';
import { useStyles, SelectStyled } from './ValidatedInput.styles';
import { ValidatedInputsKeys, WatchlistMappingOptions } from '../../models/CustomWatchlist.models';

interface Option {
  label: string;
  value: string;
}

export function ValidatedInput({ title, name, options, selectedOptions, disabled, placeholderKey, value: propValue, onChange }:
  {
    title: string;
    name: string;
    placeholderKey: string;
    options: Option[];
    disabled: boolean;
    selectedOptions: SelectedOptions;
    onChange: (values: { value: ValidatedInputsKeys; name?: string; options?: WatchlistMappingOptions }) => void;
    value?: string;
  }) {
  const formatMessage = useFormatMessage();
  const [value, setValue] = useState<string>(propValue ?? placeholderKey);
  const [rangeSliderValue, setRangeSliderValue] = useState<number>(selectedOptions[name]?.options?.fuzziness || 50);
  const debounced = useDebounce();
  const classes = useStyles();

  const handleChange = useCallback((event: React.ChangeEvent<{ value: any; name?: string }>) => {
    const target = event.target;
    const newValue = target.value === ValidatedInputsKeys.FullName ? {
      ...target,
      options: {
        fuzziness: rangeSliderValue,
      },
    } : target;

    setValue(target.value);
    onChange(newValue);
  }, [rangeSliderValue, onChange]);

  const handleSliderChange = useCallback((fieldValue: ValidatedInputsKeys, fieldName: string) => (_: React.ChangeEvent<{}>, val: number | number[]) => {
    setRangeSliderValue(val as number);
    debounced(() => onChange({
      value: fieldValue,
      name: fieldName,
      options: {
        fuzziness: val as number,
      },
    }));
  }, [onChange, debounced]);

  const localOptions = useMemo(() => options.filter((option) => option.value !== ValidatedInputsKeys.NotSelected && Object.values(selectedOptions).every((x) => x.value !== option.value)), [options, selectedOptions]);
  const currentOption = useMemo(() => options.find((option) => option.value === value), [value, options]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" direction="row" className={classes.input}>
        <Grid item className={classes.headerWrap}><Typography variant="subtitle2" className={classes.headerItem}>{title}</Typography></Grid>
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
            disabled={disabled}
          >
            {selectedOptions[name] && (
              <MenuItem
                key={`${selectedOptions[name].value}-${selectedOptions[name].label}`}
                value={selectedOptions[name].value}
                disabled
              >
                {currentOption.label}
              </MenuItem>
            )}
            {localOptions.map((item) => (
              <MenuItem
                key={`${item.value}-${item.label}`}
                value={item.value}
                className={classnames({ [classes.placeholder]: item.value === placeholderKey })}
              >
                {item.label}
              </MenuItem>
            ))}
            {selectedOptions[name].value !== placeholderKey && (
              <MenuItem
                key={`${placeholderKey}-`}
                value={placeholderKey}
                className={classnames(classes.placeholder)}
              >
                {formatMessage('CustomWatchlist.settings.modal.validationFields.notSelected.label')}
              </MenuItem>
            )}
          </SelectStyled>
        </Grid>
      </Grid>
      {(!disabled && value === ValidatedInputsKeys.FullName) && (
        <Box mb={1.2}>
          <RangeSlider
            defaultValue={rangeSliderValue}
            value={rangeSliderValue}
            onChange={handleSliderChange(value, name)}
          />
        </Box>
      )}
    </>
  );
}
