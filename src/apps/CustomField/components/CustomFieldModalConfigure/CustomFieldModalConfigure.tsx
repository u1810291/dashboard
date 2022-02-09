import React, { useCallback } from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'lib/isNil';
import cloneDeep from 'lodash/cloneDeep';
import { overlayClose } from 'apps/overlay';
import { InfoTooltip } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { InfoIcon, TextFieldInput } from './CustomFieldModalConfigure.styles';
import { updateCustomFieldEditedField } from '../../state/CustomField.actions';
import { CUSTOM_FIELD_SELECTION_SECOND_OPTION_NAME, CUSTOM_FIELD_SELECTION_SECOND_OPTION_PREFIX, mutableFindChildren, HandleUpdateFields, MainCustomFieldType, prepareCustomField, CustomField, CustomFieldModalTypes, prepareEmptyGroupToSection, fieldIsValid, isValidFieldSystemName } from '../../models/CustomField.model';
import { CustomFieldModalFooter } from '../CustomFieldModalFooter/CustomFieldModalFooter';
import { selectCustomFieldEditedCustomField, selectCustomFieldEditedIndex, selectCustomFieldEditedParent, selectCustomFieldEditedSystemName, selectCustomFieldFlattenListFields, selectCustomFieldListFields, selectCustomFieldModalType, selectCustomFieldUploadingThumbnail } from '../../state/CustomField.selectors';
import { CustomFieldUploadButton } from '../CustomFieldUploadButton/CustomFieldUploadButton';

export function CustomFieldModalConfigure({ handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();

  const isUploadingThumbnail = useSelector<any, boolean>(selectCustomFieldUploadingThumbnail);
  const selectedCustomField = useSelector<any, CustomField>(selectCustomFieldEditedCustomField);
  const listFields = useSelector<any, CustomField[]>(selectCustomFieldListFields);
  const listFlattenFields = useSelector<any, CustomField[]>(selectCustomFieldFlattenListFields);
  const editedParent = useSelector<any, string>(selectCustomFieldEditedParent);
  const editedIndex = useSelector<any, number>(selectCustomFieldEditedIndex);
  const type = useSelector<any, CustomFieldModalTypes>(selectCustomFieldModalType);
  const oldName = useSelector<any, string>(selectCustomFieldEditedSystemName);

  const isValid: boolean = fieldIsValid(isUploadingThumbnail, selectedCustomField, listFlattenFields, oldName);

  const handleUpdateSystemName = ({ target: { value, name } }) => {
    if (!isValidFieldSystemName(value)) {
      return;
    }
    dispatch(updateCustomFieldEditedField({ ...selectedCustomField, [name]: value }));
  };

  const handleUpdateField = ({ target: { value, name } }) => {
    dispatch(updateCustomFieldEditedField({
      ...selectedCustomField,
      [name]: value,
    }));
  };

  const handleChangeSelectionIsMandatory = () => {
    dispatch(updateCustomFieldEditedField({
      ...selectedCustomField,
      isMandatory: !selectedCustomField.isMandatory,
    }));
  };

  const onAdd = useCallback(() => {
    const preparedCustomField = prepareCustomField(selectedCustomField);
    if (selectedCustomField.type === MainCustomFieldType.Select) {
      preparedCustomField.children.push(prepareEmptyGroupToSection(selectedCustomField.name));
      preparedCustomField.children.push(prepareEmptyGroupToSection(selectedCustomField.name, CUSTOM_FIELD_SELECTION_SECOND_OPTION_PREFIX, CUSTOM_FIELD_SELECTION_SECOND_OPTION_NAME));
    }
    const copy = cloneDeep(listFields);
    const child = mutableFindChildren(copy, editedParent);
    child.push(preparedCustomField);
    handleUpdateFields(copy);
  }, [editedParent, listFields, handleUpdateFields, selectedCustomField]);

  const onEdit = useCallback(() => {
    const preparedCustomField = prepareCustomField(selectedCustomField);
    const copy = cloneDeep(listFields);
    const child = mutableFindChildren(copy, editedParent);
    child[editedIndex] = preparedCustomField;
    handleUpdateFields(copy);
  }, [editedIndex, editedParent, listFields, handleUpdateFields, selectedCustomField]);

  const onForward = useCallback(() => {
    if (isNil(editedIndex)) {
      onAdd();
    } else {
      onEdit();
    }
    dispatch(overlayClose());
  }, [dispatch, editedIndex, onAdd, onEdit]);

  const onBack = useCallback(() => {
    dispatch(overlayClose());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h3">
            {formatMessage(`CustomField.settings.modal.configure${type}.title`)}
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle2">
              {formatMessage(`CustomField.settings.${type.toLowerCase()}SystemName`)}
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
              placeholder={formatMessage(`CustomField.settings.${type.toLowerCase()}SystemName.placeholder`)}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="subtitle2">
              {formatMessage(`CustomField.settings.${type.toLowerCase()}DisplayName`)}
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
              placeholder={formatMessage(`CustomField.settings.${type.toLowerCase()}DisplayName.placeholder`)}
            />
          </Grid>
        </Grid>
        {selectedCustomField.type === MainCustomFieldType.Group && (
          <CustomFieldUploadButton />
        )}
        {selectedCustomField.type === MainCustomFieldType.Select && (
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="body1">
                {formatMessage('CustomField.settings.selectionMandatory')}
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
        )}
      </Grid>
      <CustomFieldModalFooter
        backTitle="Back"
        forwardTitle="Done"
        onForward={onForward}
        onBack={onBack}
        canMoveForward={isValid}
      />
    </>
  );
}
