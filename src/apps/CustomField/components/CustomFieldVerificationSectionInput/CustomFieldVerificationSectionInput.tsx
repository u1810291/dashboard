import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { CustomField } from '../../models/CustomField.model';
import { CustomFieldVerificationInput } from '../CustomFieldVerificationInput/CustomFieldVerificationInput';
import { CustomFieldVerificationAtomicList } from '../CustomFieldVerificationList/CustomFieldVerificationList';
import { useStyles } from './CustomFieldVerificationSectionInput.styles';

export function CustomFieldVerificationSectionInput({ selection }: {
  selection: CustomField;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const { watch, control } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<CustomField>(null);
  const watchGroupSelected = watch(selection.name);
  const options: { label: string; value: string }[] = useMemo(() => selection.children.map((child) => ({
    value: child.name,
    label: child.label,
  })), [selection.children]);
  useEffect(() => setSelectedOption(selection?.children.find((({ name }) => name === watchGroupSelected))), [selection, watchGroupSelected]);
  return (
    <>
      <Box className={classes.inputWrapper}>
        <Typography className={classes.label}>{selection.label}</Typography>
        <Controller
          name={selection.name}
          control={control}
          defaultValue={selection?.selectedGroup}
          rules={{
            required: { value: selection?.isMandatory, message: formatMessage('CustomField.verification.select.required') },
          }}
          render={({ field: props, fieldState: { invalid, error } }) => (
            <>
              <Select fullWidth {...props}>
                {!selection?.isMandatory && (
                  <MenuItem value="">
                    <em>&nbsp;</em>
                  </MenuItem>
                )}
                {
                  options.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)
                }
              </Select>
              <FormHelperText
                filled
                error={invalid}
              >
                {invalid ? error : ' '}
              </FormHelperText>
            </>
          )}
        />
      </Box>
      {selectedOption && (<CustomFieldVerificationAtomicList fields={selectedOption?.children} itemContainer={CustomFieldVerificationInput} />)}
    </>
  );
}
