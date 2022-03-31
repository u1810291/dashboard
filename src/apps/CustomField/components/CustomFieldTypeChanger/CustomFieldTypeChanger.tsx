import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import { SmallButton } from './CustomFieldTypeChanger.styles';
import { AtomicCustomFieldType, isTypeFromConfig, CustomField, EMPTY_SELECT_OPTIONS, Mapping } from '../../models/CustomField.model';
import { updateCustomFieldEditedField } from '../../state/CustomField.actions';
import { selectCustomFieldEditedCustomField, selectCustomFieldSelectedCustomFieldMapping } from '../../state/CustomField.selectors';

export function CustomFieldTypeChanger() {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();

  const selectedCustomField = useSelector<any, CustomField>(selectCustomFieldEditedCustomField);
  const selectedFieldMapping = useSelector<any, Mapping>(selectCustomFieldSelectedCustomFieldMapping);

  const isBlocked: boolean = isTypeFromConfig(selectedFieldMapping);

  const handleFieldTypeChange = (type: AtomicCustomFieldType) => () => {
    const clone = cloneDeep(selectedCustomField);
    if (type === AtomicCustomFieldType.Select && !selectedCustomField.atomicFieldParams?.selectOptions) {
      clone.atomicFieldParams.selectOptions = [...EMPTY_SELECT_OPTIONS];
    }
    clone.atomicFieldParams.type = type;
    dispatch(updateCustomFieldEditedField(clone));
  };

  return (
    <Grid item container direction="column">
      <Grid item>
        <Typography variant="subtitle2">
          {formatMessage('CustomField.settings.fieldType')}
        </Typography>
      </Grid>
      <Grid container item justify="space-between" xs={8}>
        <SmallButton
          onClick={handleFieldTypeChange(AtomicCustomFieldType.Text)}
          color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Text ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          disabled={isBlocked && selectedCustomField.atomicFieldParams.type !== AtomicCustomFieldType.Text}
        >
          {formatMessage('CustomField.settings.fieldType.text')}
        </SmallButton>
        <SmallButton
          onClick={handleFieldTypeChange(AtomicCustomFieldType.Date)}
          color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Date ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          disabled={isBlocked && selectedCustomField.atomicFieldParams.type !== AtomicCustomFieldType.Date}
        >
          {formatMessage('CustomField.settings.fieldType.date')}
        </SmallButton>
        <SmallButton
          onClick={handleFieldTypeChange(AtomicCustomFieldType.Checkbox)}
          color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Checkbox ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          disabled={isBlocked && selectedCustomField.atomicFieldParams.type !== AtomicCustomFieldType.Checkbox}
        >
          {formatMessage('CustomField.settings.fieldType.checkbox')}
        </SmallButton>
        <SmallButton
          onClick={handleFieldTypeChange(AtomicCustomFieldType.Select)}
          color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Select ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          disabled={isBlocked && selectedCustomField.atomicFieldParams.type !== AtomicCustomFieldType.Select}
        >
          {formatMessage('CustomField.settings.fieldType.selector')}
        </SmallButton>
      </Grid>
    </Grid>
  );
}
