import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import cloneDeep from 'lodash/cloneDeep';
import * as api from 'lib/client/merchant';
import { CustomFieldService } from '../services/CustomField.service';
import { types } from './CustomField.store';
import { CustomField, CustomFieldModalTypes, EMPTY_CUSTOM_ATOMIC_FIELD, EMPTY_CUSTOM_GROUP_FIELD, EMPTY_CUSTOM_SELECT_FIELD, Mapping, SelectOptions } from '../models/CustomField.model';

export const CustomFieldInit = () => (_, getState): ProductTypes => {
  const customField = new CustomFieldService(selectMerchantTags(getState()));
  productManagerService.register(customField);
  return customField.id;
};

export const updateCustomFieldModalStep = (data: CustomFieldModalTypes) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_MODAL_STEP_SUCCESS, payload: data, isReset: true });
};

export const updateCustomUploadingThumbnail = (data: boolean) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_UPLOADING_THUMBNAIL_SUCCESS, payload: data, isReset: true });
};

export const updateCustomFieldEditedField = (data: CustomField) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_FIELD_SUCCESS, payload: data, isReset: true });
};

export const updateCustomFieldEditedFieldMapping = (data: Mapping) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_FIELD_MAPPING_SUCCESS, payload: data, isReset: true });
};

export const updateCustomFieldEditedFieldSelectOptions = (data: SelectOptions[]) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_FIELD_SELECT_OPTIONS_SUCCESS, payload: data, isReset: true });
};

export const updateCustomFieldEditedFieldThumbnail = (data: any) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_FIELD_THUMBNAIL_SUCCESS, payload: data, isReset: true });
};

export const setCustomFieldEditedIndex = (data: number) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_INDEX_SUCCESS, payload: data, isReset: true });
};

export const setCustomFieldEditedSystemName = (data: string) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_SYSTEM_NAME_SUCCESS, payload: data, isReset: true });
};

export const setCustomFieldEditedParent = (data: string) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_EDITED_PARENT_SUCCESS, payload: data, isReset: true });
};

export const setCustomFieldFlattenListFields = (data: CustomField[]) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_FLATTEN_LIST_FIELDS_SUCCESS, payload: data, isReset: true });
};

export const setCustomFieldListFields = (data: CustomField[]) => (dispatch) => {
  dispatch({ type: types.CUSTOM_FIELD_LIST_FIELDS_SUCCESS, payload: data, isReset: true });
};

export const setEmptyField = (modalType: CustomFieldModalTypes) => (dispatch) => {
  switch (modalType) {
    case CustomFieldModalTypes.ConfigureField:
      dispatch(updateCustomFieldEditedField(cloneDeep(EMPTY_CUSTOM_ATOMIC_FIELD)));
      break;
    case CustomFieldModalTypes.ConfigureGroup:
    case CustomFieldModalTypes.ConfigureOption:
      dispatch(updateCustomFieldEditedField(cloneDeep(EMPTY_CUSTOM_GROUP_FIELD)));
      break;
    case CustomFieldModalTypes.ConfigureSelection:
      dispatch(updateCustomFieldEditedField(cloneDeep(EMPTY_CUSTOM_SELECT_FIELD)));
      break;
    default:
      break;
  }
  dispatch(setCustomFieldEditedSystemName(null));
};

export const prepareDataForModal = (modalType: CustomFieldModalTypes, editedField: CustomField = null) => (dispatch) => {
  if (!editedField) {
    dispatch(setEmptyField(modalType));
  } else {
    dispatch(setCustomFieldEditedSystemName(editedField.name));
    dispatch(updateCustomFieldEditedField(editedField));
  }
  dispatch(updateCustomFieldModalStep(modalType));
};

export const uploadCustomFieldGroupThumbnail = (form: FormData) => async (dispatch) => {
  dispatch(updateCustomUploadingThumbnail(true));

  try {
    const { data } = await api.uploadMerchantMedia(form);
    dispatch(updateCustomFieldEditedFieldThumbnail(data));
    dispatch(updateCustomUploadingThumbnail(false));
  } catch (error) {
    dispatch(updateCustomUploadingThumbnail(false));
    throw error;
  }
};
