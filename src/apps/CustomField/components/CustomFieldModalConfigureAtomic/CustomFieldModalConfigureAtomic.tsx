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
import { KeyboardKeys } from 'models/Keyboard.model';
import { AtomicCustomFieldType, ICustomField, IMapping } from 'models/CustomField.model';
import { CustomFieldModalTypes, mutableFindChildren, HandleUpdateFields, prepareCustomField, atomicFieldIsValid, isValidFieldSystemName, REGEXP_BANNED_SYMBOLS_IN_FIELD_SYSTEM_NAME, REPLACEMENT_SYMBOL, MAX_TEXT_INPUT_LENGTH } from '../../models/CustomField.model';
import { InfoIcon, TextFieldInput, useStyles } from './CustomFieldModalConfigureAtomic.styles';
import { CustomFieldModalFooter } from '../CustomFieldModalFooter/CustomFieldModalFooter';
import { selectCustomFieldEditedCustomField, selectCustomFieldEditedIndex, selectCustomFieldEditedParent, selectCustomFieldEditedSystemName, selectCustomFieldFlattenListFields, selectCustomFieldListFields, selectCustomFieldSelectedCustomFieldMapping } from '../../state/CustomField.selectors';
import { CustomFieldSelectionOptions } from '../CustomFieldSelectionOptions/CustomFieldSelectionOptions';
import { CustomFieldTypeChanger } from '../CustomFieldTypeChanger/CustomFieldTypeChanger';
import { updateCustomFieldEditedField, updateCustomFieldModalStep } from '../../state/CustomField.actions';

export function CustomFieldModalConfigureAtomic({ handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedFieldMapping = useSelector<any, IMapping>(selectCustomFieldSelectedCustomFieldMapping);
  const selectedCustomField = useSelector<any, ICustomField>(selectCustomFieldEditedCustomField);
  const listFields = useSelector<any, ICustomField[]>(selectCustomFieldListFields);
  const listFlattenFields = useSelector<any, ICustomField[]>(selectCustomFieldFlattenListFields);
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

  const handleUpdateField = ({ target: { value } }) => {
    dispatch(updateCustomFieldEditedField({ ...selectedCustomField, label: value, name: value.replace(REGEXP_BANNED_SYMBOLS_IN_FIELD_SYSTEM_NAME, REPLACEMENT_SYMBOL) }));
  };

  const handleAtomicFieldParamsChange = ({ target: { value, name } }) => {
    const clone = cloneDeep(selectedCustomField);
    clone.atomicFieldParams[name] = value;
    dispatch(updateCustomFieldEditedField(clone));
  };

  const handleKeyDown = (event) => {
    if (![KeyboardKeys.ArrowRight, KeyboardKeys.ArrowLeft, KeyboardKeys.Delete, KeyboardKeys.Backspace].includes(event.key) && event.target.value.length > MAX_TEXT_INPUT_LENGTH) {
      event.preventDefault();
    }
  };

  const handleChangeSelectionIsMandatory = () => {
    dispatch(updateCustomFieldEditedField({
      ...selectedCustomField,
      isMandatory: !selectedCustomField.isMandatory,
    }));
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
              onKeyDown={handleKeyDown}
              placeholder={formatMessage('CustomField.settings.fieldDisplayName.placeholder')}
            />
          </Grid>
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
        <CustomFieldTypeChanger />
        {(!selectedCustomField.atomicFieldParams.type || [AtomicCustomFieldType.Text, AtomicCustomFieldType.Date].includes(selectedCustomField.atomicFieldParams.type)) && (
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
                onKeyDown={handleKeyDown}
                placeholder={formatMessage('CustomField.settings.fieldHint.placeholder')}
              />
            </Grid>
          </Grid>
        )}
        {(!selectedCustomField.atomicFieldParams.type || selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Text) && (
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
