import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from 'lib/debounce.hook';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { appPalette } from 'apps/theme';
import { useFormatMessage } from 'apps/intl';
import { RangeSlider } from 'apps/ui';
import { ValidatedInputsKeys, SelectedOptions, ValidatedInputsFieldValuesOptions } from '../../../../models/WatchlistValidatedInputs.model';
import { Option } from '../../models/WatchlistValidatedInputs.model';
import { useStyles, SelectStyled } from './ValidatedInput.styles';

export function ValidatedInput({ title, name, options, selectedOptions, disabled, placeholderKey, hasOptions, value: propValue, onChange }:
  {
    title: string;
    name: string;
    hasOptions: boolean;
    placeholderKey: string;
    options: Option[];
    disabled: boolean;
    selectedOptions: SelectedOptions;
    onChange: (values: { value: ValidatedInputsKeys; name?: string; options?: ValidatedInputsFieldValuesOptions }) => void;
    value?: string;
  }) {
  const formatMessage = useFormatMessage();
  const fuzziness = selectedOptions[name]?.options?.fuzziness;
  const [value, setValue] = useState<string>(propValue ?? placeholderKey);
  const [rangeSliderValue, setRangeSliderValue] = useState<number>(fuzziness || 50);
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

  useEffect(() => {
    if (typeof fuzziness === 'number') {
      setRangeSliderValue(fuzziness);
    }
  }, [fuzziness]);

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
            IconComponent={() => <FiChevronDown size="18px" strokeWidth={3} color={disabled ? appPalette.gray68 : appPalette.lightblue} />}
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
                {formatMessage('Watchlist.validationFields.notSelected.label')}
              </MenuItem>
            )}
          </SelectStyled>
        </Grid>
      </Grid>
      {hasOptions && (value === ValidatedInputsKeys.FullName) && (
        <Box mb={1.2} pr={1.1}>
          <RangeSlider
            value={rangeSliderValue}
            onChange={handleSliderChange(value, name)}
          />
        </Box>
      )}
    </>
  );
}
