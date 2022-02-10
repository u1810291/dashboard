import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { formatDate } from 'lib/date';
import { isNil } from 'lib/isNil';
import { AtomicCustomFieldType, CustomField, MainCustomFieldType } from '../../models/CustomField.model';
import { CustomFieldVerificationAtomicList } from '../CustomFieldVerificationList/CustomFieldVerificationList';
import { useStyles } from './CustomFieldVerificationInfo.styles';

export function CustomFieldVerificationInfo({ field, value }: {
  field: CustomField;
  value: string;
}) {
  const classes = useStyles();
  return (
    <Box className={classes.infoWrapper} key={field.name}>
      <Typography className={classes.infoValue}>
        {
          field.type === MainCustomFieldType.Atomic && field.atomicFieldParams.type === AtomicCustomFieldType.Date
            ? value ? formatDate(value) : ''
            : !isNil(value) ? `${value}` : '-'
        }
      </Typography>
      <InputLabel className={classes.label}>
        {field.label}
      </InputLabel>
    </Box>
  );
}

export function CustomFieldVerificationSectionInfo({ selection }: {
  selection: CustomField;
}) {
  const selectedGroup: CustomField = useMemo(() => selection?.children?.find((option) => option.name === selection.selectedGroup), [selection?.children, selection.selectedGroup]);
  return (
    <>
      <CustomFieldVerificationInfo field={selection} value={selectedGroup?.label} />
      {selectedGroup && (<CustomFieldVerificationAtomicList fields={selectedGroup?.children} itemContainer={CustomFieldVerificationInfo} />)}
    </>
  );
}
