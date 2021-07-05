import { FormControl, Grid, InputLabel, Input } from '@material-ui/core';
import { DatePartTypes, AllDateParts } from 'lib/date';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './DateInputField.styles';

export interface DateInputFieldProps{
  fieldId?: string;
  dateString: string;
  onChange?: (fieldId: string, formattedString: string) => void;
  autoFocus?: boolean;
  isEditable?: boolean;
}

export function DateInputField({ fieldId, dateString, onChange, autoFocus, isEditable = true }: DateInputFieldProps) {
  const intl = useIntl();
  const classes = useStyles();

  const selectValues = useMemo(() => {
    const day = dateString ? dateString.split('-') : [];
    return {
      day: day[2] || (isEditable ? '' : '-'),
      month: day[1] || (isEditable ? '' : '-'),
      year: day[0] || (isEditable ? '' : '-'),
    };
  }, [dateString, isEditable]);

  const firstEmptyField = useMemo(() => AllDateParts.find((part) => !selectValues[part]), [selectValues]);

  const handleChange = useCallback((part) => ({ target: { value } }) => {
    if (!isEditable || ([DatePartTypes.Day, DatePartTypes.Month].includes(part) && value.length > 2) || (part === DatePartTypes.Year && value.length > 4)) {
      return;
    }

    if (!value.match(/^[0-9]*$/)) {
      return;
    }

    const newValues = {
      ...selectValues,
      [part]: value,
    };

    const formattedString = `${newValues.year}-${newValues.month}-${newValues.day}`;
    onChange(fieldId, formattedString);
  }, [fieldId, isEditable, onChange, selectValues]);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12} sm={4}>
        <FormControl disabled={!isEditable} className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Day' })}
          </InputLabel>
          <Input className={classes.select} onChange={handleChange(DatePartTypes.Day)} value={selectValues.day} autoFocus={firstEmptyField === DatePartTypes.Day && autoFocus} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl disabled={!isEditable} className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Month' })}
          </InputLabel>
          <Input className={classes.select} onChange={handleChange(DatePartTypes.Month)} value={selectValues.month} autoFocus={firstEmptyField === DatePartTypes.Month && autoFocus} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl disabled={!isEditable} className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Year' })}
          </InputLabel>
          <Input className={classes.select} onChange={handleChange(DatePartTypes.Year)} value={selectValues.year} autoFocus={firstEmptyField === DatePartTypes.Year && autoFocus} />
        </FormControl>
      </Grid>
    </Grid>
  );
}
