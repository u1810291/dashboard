import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { ICustomField, formatedValue } from 'models/CustomField.model';
import { CustomFieldVerificationAtomicList } from '../CustomFieldVerificationList/CustomFieldVerificationList';
import { useStyles } from './CustomFieldVerificationInfo.styles';

export function CustomFieldVerificationInfo({ field, value }: {
  field: ICustomField;
  value: string;
}) {
  const classes = useStyles();
  return (
    <Box className={classes.infoWrapper} key={field.name}>
      <Typography className={classes.infoValue}>
        {formatedValue(field, value)}
      </Typography>
      <InputLabel className={classes.label}>
        {field.label}
      </InputLabel>
    </Box>
  );
}

export function CustomFieldVerificationSectionInfo({ selection, country }: {
  selection: ICustomField;
  country: string;
}) {
  const selectedGroup = useMemo<ICustomField>(() => selection?.children?.find((option: ICustomField) => option.name === selection.selectedGroup), [selection?.children, selection.selectedGroup]);
  return (
    <>
      <CustomFieldVerificationInfo field={selection} value={selectedGroup?.label} />
      {selectedGroup && <CustomFieldVerificationAtomicList country={country} fields={selectedGroup?.children} itemContainer={CustomFieldVerificationInfo} />}
    </>
  );
}
