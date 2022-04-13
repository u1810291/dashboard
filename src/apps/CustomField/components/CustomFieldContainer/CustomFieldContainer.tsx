import Box from '@material-ui/core/Box';
import React, { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { useOverlay } from 'apps/overlay';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { ICustomField } from 'models/CustomField.model';
import { CustomFieldActions } from '../CustomFieldActions/CustomFieldActions';
import { CustomFieldModalTypes, CustomFieldProductSettingsProps, CustomFieldSettingTypes, HandleOpenModal, HandleUpdateFields, MAIN_DROPPABLE_ID } from '../../models/CustomField.model';
import { prepareDataForModal, setCustomFieldEditedIndex, setCustomFieldEditedParent, setCustomFieldFlattenListFields, setCustomFieldListFields } from '../../state/CustomField.actions';
import { CustomFieldModal } from '../CustomFieldModal/CustomFieldModal';
import { CustomFieldDragAndDrop } from '../CustomFieldDragAndDrop/CustomFieldDragAndDrop';

export function CustomFieldContainer({ onUpdate, settings }: CustomFieldProductSettingsProps) {
  const dispatch = useDispatch();
  const [createOverlay] = useOverlay();
  const merchantTags = useSelector<any, MerchantTags[]>(selectMerchantTags);
  const isCustomDocumentAvailable = merchantTags.includes(MerchantTags.CanUseCustomField);

  useLayoutEffect(() => {
    dispatch(setCustomFieldFlattenListFields(settings[CustomFieldSettingTypes.flattenedFields].value));
    dispatch(setCustomFieldListFields(settings[CustomFieldSettingTypes.fields].value));
  }, [dispatch, settings]);

  const handleUpdateFields: HandleUpdateFields = useCallback((fields: ICustomField[]) => {
    const newSettings = cloneDeep(settings);
    newSettings[CustomFieldSettingTypes.fields].value = [...fields];
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleOpenModal: HandleOpenModal = useCallback((modalType: CustomFieldModalTypes, editedField: ICustomField = null, index: number = null, parent: string = MAIN_DROPPABLE_ID) => () => {
    dispatch(setCustomFieldEditedParent(parent));
    dispatch(setCustomFieldEditedIndex(index));
    dispatch(prepareDataForModal(modalType, editedField));
    createOverlay(<CustomFieldModal handleUpdateFields={handleUpdateFields} />, { sticky: true });
  }, [createOverlay, dispatch, handleUpdateFields]);

  return (
    <Box>
      {!!isCustomDocumentAvailable && (<CustomFieldDragAndDrop handleUpdateFields={handleUpdateFields} handleOpenModal={handleOpenModal} />)}
      <CustomFieldActions handleOpenModal={handleOpenModal} />
    </Box>
  );
}
