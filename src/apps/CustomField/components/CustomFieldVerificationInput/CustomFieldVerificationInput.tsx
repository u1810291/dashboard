import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import React from 'react';
import LocaleUtils, { formatDate, parseDate } from 'apps/ui/models/ReactDayPicker.model';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { dateToFormatString, getLocaleFormat } from 'lib/date';
import { useFormatMessage } from 'apps/intl';
import { AtomicCustomFieldType, CustomField, validateDateInput } from '../../models/CustomField.model';
import { useStyles } from './CustomFieldVerificationInput.styles';

function CustomFieldVerificationInputMapping({ field }: {
  field: CustomField;
}) {
  const currentLocale = useSelector<any, string>(selectLanguage);
  const formatMessage = useFormatMessage();
  const { control } = useFormContext();
  switch (field.atomicFieldParams.type) {
    case AtomicCustomFieldType.Text:
      return (
        <Controller
          defaultValue={field?.atomicFieldParams?.value}
          name={field.name}
          control={control}
          rules={{
            required: { value: field?.isMandatory, message: formatMessage('CustomField.verification.input.required') },
            pattern: {
              value: new RegExp(field?.atomicFieldParams?.regex),
              message: formatMessage('CustomField.verification.patternInfo', {
                messageValues: {
                  format: field?.atomicFieldParams?.regex,
                },
              }),
            },
          }}
          render={({ field: props, fieldState: { invalid, error } }) => (
            <TextField
              placeholder={field?.atomicFieldParams?.placeholder || field.label}
              fullWidth
              error={invalid}
              helperText={error?.message || ' '}
              variant="outlined"
              {...props}
            />
          )}
        />
      );
    case AtomicCustomFieldType.Checkbox:
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.atomicFieldParams.value}
          rules={{
            required: { value: field?.isMandatory, message: formatMessage('CustomField.verification.checkbox.required') },
          }}
          render={({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
            <>
              <Checkbox
                onChange={(e) => onChange(!!e.target.checked)}
                checked={value}
                color="primary"
                checkedIcon={<CheckboxOn />}
                icon={<CheckboxOff />}
                inputRef={ref}
              />
              <FormHelperText
                filled
                error={invalid}
              >
                {invalid ? error?.message : ' '}
              </FormHelperText>
            </>
          )}
        />
      );
    case AtomicCustomFieldType.Select:
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.atomicFieldParams.value}
          render={({ field: props, fieldState: { invalid, error } }) => (
            <>
              <Select
                variant="standard"
                fullWidth
                {...props}
              >
                {!field?.isMandatory && (
                  <MenuItem value="">
                    <em>&nbsp;</em>
                  </MenuItem>
                )}
                {
                  field.atomicFieldParams.selectOptions.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)
                }
              </Select>
              <FormHelperText
                filled
                error={invalid}
              >
                {invalid ? error?.message : ' '}
              </FormHelperText>
            </>
          )}
        />
      );
    case AtomicCustomFieldType.Date:
      return (
        <Controller
          name={field.name}
          control={control}
          rules={{
            validate: (str) => validateDateInput(str, field, currentLocale) || formatMessage('CustomField.verification.patternInfo', {
              messageValues: {
                format: getLocaleFormat(currentLocale),
              },
            }),
            required: { value: field?.isMandatory, message: formatMessage('CustomField.verification.input.required') },
          }}
          defaultValue={field.atomicFieldParams.value && dateToFormatString(field.atomicFieldParams.value, currentLocale)}
          render={({ field: { name, onChange, ref }, fieldState: { invalid, error } }) => (
            <>
              <DayPickerInput
                value={field.atomicFieldParams.value && dateToFormatString(field.atomicFieldParams.value, currentLocale)}
                onDayChange={(day, DayModifiers, dayPickerInput) => {
                  onChange(dayPickerInput.getInput().value);
                }}
                style={{ display: 'unset' }}
                inputProps={{ name }}
                ref={ref}
                dayPickerProps={{
                  localeUtils: LocaleUtils,
                  locale: currentLocale,
                }}
                formatDate={formatDate}
                parseDate={parseDate}
              />
              <FormHelperText
                filled
                error={invalid}
              >
                {invalid ? error?.message : ' '}
              </FormHelperText>
            </>
          )}
        />
      );
    default:
      return null;
  }
}

export function CustomFieldVerificationInput({ field }: {
  field: CustomField;
}) {
  const classes = useStyles();
  return (
    <Box className={classes.inputWrapper}>
      <Typography className={classes.label}>{field.label}</Typography>
      <CustomFieldVerificationInputMapping field={field} />
    </Box>
  );
}
