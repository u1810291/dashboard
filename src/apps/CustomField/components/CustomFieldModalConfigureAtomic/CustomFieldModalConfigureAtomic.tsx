import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { FiCheckCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { overlayClose } from 'apps/overlay';
import { isNil } from 'lib/isNil';
import { InfoTooltip } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { InfoIcon, SmallButton, TextFieldInput, useStyles } from './CustomFieldModalConfigureAtomic.styles';
import { updateCustomFieldEditedField, updateCustomFieldModalStep } from '../../state/CustomField.actions';
import { AtomicCustomFieldType, CustomFieldModalTypes, mutableFindChildren, HandleUpdateFields, prepareCustomField, CustomField, Mapping, EMPTY_SELECT_OPTIONS, atomicFieldIsValid, isValidFieldSystemName } from '../../models/CustomField.model';
import { CustomFieldModalFooter } from '../CustomFieldModalFooter/CustomFieldModalFooter';
import { selectCustomFieldEditedCustomField, selectCustomFieldEditedIndex, selectCustomFieldEditedParent, selectCustomFieldEditedSystemName, selectCustomFieldFlattenListFields, selectCustomFieldListFields, selectCustomFieldSelectedCustomFieldMapping } from '../../state/CustomField.selectors';
import { CustomFieldSelectionOptions } from '../CustomFieldSelectionOptions/CustomFieldSelectionOptions';

export function CustomFieldModalConfigureAtomic({ handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedFieldMapping = useSelector<any, Mapping>(selectCustomFieldSelectedCustomFieldMapping);
  const selectedCustomField = useSelector<any, CustomField>(selectCustomFieldEditedCustomField);
  const listFields = useSelector<any, CustomField[]>(selectCustomFieldListFields);
  const listFlattenFields = useSelector<any, CustomField[]>(selectCustomFieldFlattenListFields);
  const editedParent = useSelector<any, string>(selectCustomFieldEditedParent);
  const editedIndex = useSelector<any, number>(selectCustomFieldEditedIndex);
  const oldName = useSelector<any, string>(selectCustomFieldEditedSystemName);

  const isValid: boolean = atomicFieldIsValid(selectedCustomField, listFlattenFields, oldName);

  const goToDocumentMapping = useCallback(() => dispatch(updateCustomFieldModalStep(CustomFieldModalTypes.MappingFieldToDocument)),
    [dispatch]);

  const handleUpdateSystemName = ({ target: { value, name } }) => {
    if (!isValidFieldSystemName(value)) {
      return;
    }
    dispatch(updateCustomFieldEditedField({ ...selectedCustomField, [name]: value }));
  };

  const handleUpdateField = ({ target: { value, name } }) => {
    dispatch(updateCustomFieldEditedField({ ...selectedCustomField, [name]: value }));
  };

  const handleAtomicFieldParamsChange = ({ target: { value, name } }) => {
    const clone = cloneDeep(selectedCustomField);
    clone.atomicFieldParams[name] = value;
    dispatch(updateCustomFieldEditedField(clone));
  };

  const handleChangeSelectionIsMandatory = () => {
    dispatch(updateCustomFieldEditedField({
      ...selectedCustomField,
      isMandatory: !selectedCustomField.isMandatory,
    }));
  };

  const handleFieldTypeChange = (type: AtomicCustomFieldType) => () => {
    const clone = cloneDeep(selectedCustomField);
    if (type === AtomicCustomFieldType.Select && !selectedCustomField.atomicFieldParams?.selectOptions) {
      clone.atomicFieldParams.selectOptions = [...EMPTY_SELECT_OPTIONS];
    }
    clone.atomicFieldParams.type = type;
    dispatch(updateCustomFieldEditedField(clone));
  };

  const onForward = useCallback(() => {
    const copy = cloneDeep(listFields);
    const preparedCustomField = prepareCustomField(selectedCustomField);
    const child = mutableFindChildren(copy, editedParent);
    if (isNil(editedIndex)) {
      child.push(preparedCustomField);
    } else {
      child[editedIndex] = preparedCustomField;
    }
    handleUpdateFields(copy);
    dispatch(overlayClose());
  }, [dispatch, editedIndex, editedParent, listFields, handleUpdateFields, selectedCustomField]);

  const onBack = useCallback(() => {
    dispatch(overlayClose());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h3">
            {formatMessage('CustomField.settings.modal.configureField.title')}
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle2">
              {formatMessage('CustomField.settings.fieldSystemName')}
              <InfoTooltip
                placement="right"
                title={formatMessage('CustomField.settings.systemName.tooltip')}
              >
                <InfoIcon />
              </InfoTooltip>
            </Typography>
          </Grid>
          <Grid item>
            <TextFieldInput
              fullWidth
              value={selectedCustomField.name}
              type="text"
              name="name"
              onChange={handleUpdateSystemName}
              placeholder={formatMessage('CustomField.settings.fieldSystemName.placeholder')}
            />
            <Link
              component="button"
              variant="body1"
              underline="always"
              onClick={goToDocumentMapping}
            >
              {selectedFieldMapping?.country && selectedFieldMapping?.key && (<FiCheckCircle className={classes.checkIcon} />)}
              {formatMessage('CustomField.settings.goToDocumentMapping')}
              <InfoTooltip
                placement="right"
                title={formatMessage('CustomField.settings.modal.mappingFieldToDocument.tooltip')}
              >
                <InfoIcon />
              </InfoTooltip>
            </Link>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle2">
              {formatMessage('CustomField.settings.fieldDisplayName')}
              <InfoTooltip
                placement="right"
                title={formatMessage('CustomField.settings.displayName.tooltip')}
              >
                <InfoIcon />
              </InfoTooltip>
            </Typography>
          </Grid>
          <Grid item>
            <TextFieldInput
              fullWidth
              type="text"
              value={selectedCustomField.label}
              name="label"
              onChange={handleUpdateField}
              placeholder={formatMessage('CustomField.settings.fieldDisplayName.placeholder')}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="body1">
              {formatMessage('CustomField.settings.fieldMandatory')}
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={selectedCustomField.isMandatory}
              color="primary"
              size="small"
              onChange={handleChangeSelectionIsMandatory}
            />
          </Grid>
        </Grid>
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
            >
              {formatMessage('CustomField.settings.fieldType.text')}
            </SmallButton>
            <SmallButton
              onClick={handleFieldTypeChange(AtomicCustomFieldType.Date)}
              color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Date ? 'primary' : 'default'}
              size="small"
              variant="outlined"
            >
              {formatMessage('CustomField.settings.fieldType.date')}
            </SmallButton>
            <SmallButton
              onClick={handleFieldTypeChange(AtomicCustomFieldType.Checkbox)}
              color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Checkbox ? 'primary' : 'default'}
              size="small"
              variant="outlined"
            >
              {formatMessage('CustomField.settings.fieldType.checkbox')}
            </SmallButton>
            <SmallButton
              onClick={handleFieldTypeChange(AtomicCustomFieldType.Select)}
              color={selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Select ? 'primary' : 'default'}
              size="small"
              variant="outlined"
            >
              {formatMessage('CustomField.settings.fieldType.selector')}
            </SmallButton>
          </Grid>
        </Grid>
        {!![AtomicCustomFieldType.Text, AtomicCustomFieldType.Date].includes(selectedCustomField.atomicFieldParams.type) && (
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="subtitle2">
                {`${formatMessage('CustomField.settings.fieldHint')}${selectedCustomField.atomicFieldParams.regex && ' *'}`}
              </Typography>
            </Grid>
            <Grid item>
              <TextFieldInput
                fullWidth
                value={selectedCustomField.atomicFieldParams.placeholder}
                type="text"
                name="placeholder"
                onChange={handleAtomicFieldParamsChange}
                placeholder={formatMessage('CustomField.settings.fieldHint.placeholder')}
              />
            </Grid>
          </Grid>
        )}
        {selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Text && (
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="subtitle2">
                {formatMessage('CustomField.settings.fieldRegex')}
              </Typography>
            </Grid>
            <Grid item>
              <TextFieldInput
                fullWidth
                value={selectedCustomField.atomicFieldParams.regex}
                type="text"
                name="regex"
                onChange={handleAtomicFieldParamsChange}
                placeholder={formatMessage('CustomField.settings.fieldRegex.placeholder')}
              />
            </Grid>
          </Grid>
        )}
        {selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Select && (
          <CustomFieldSelectionOptions />
        )}
      </Grid>
      <CustomFieldModalFooter
        backTitle="Back"
        forwardTitle="Done"
        onForward={onForward}
        canMoveForward={isValid}
        onBack={onBack}
      />
    </>
  );
}
