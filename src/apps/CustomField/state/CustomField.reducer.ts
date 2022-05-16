import { createReducer } from 'state/store.utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { ActionGroupName, CustomFieldStore, SliceNameTypes, types } from './CustomField.store';
import { CustomFieldModalTypes } from '../models/CustomField.model';

const initialState: CustomFieldStore = {
  [SliceNameTypes.CustomFieldModalType]: LoadableAdapter.createState(CustomFieldModalTypes.ConfigureField),
  [SliceNameTypes.CustomFieldEditedField]: LoadableAdapter.createState(null),
  [SliceNameTypes.CustomFieldFlattenListFields]: LoadableAdapter.createState([]),
  [SliceNameTypes.CustomFieldListFields]: LoadableAdapter.createState([]),
  [SliceNameTypes.CustomFieldEditedIndex]: LoadableAdapter.createState(null),
  [SliceNameTypes.CustomFieldEditedParent]: LoadableAdapter.createState(null),
  [SliceNameTypes.CustomFieldUploadingThumbnail]: LoadableAdapter.createState(false),
  [SliceNameTypes.CustomFieldEditedSystemName]: LoadableAdapter.createState(null),
  [SliceNameTypes.CustomFieldUpdate]: LoadableAdapter.createState(null),
};

export const customFieldReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldModalStep, SliceNameTypes.CustomFieldModalType),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldFlattenListFields, SliceNameTypes.CustomFieldFlattenListFields),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldListFields, SliceNameTypes.CustomFieldListFields),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedField, SliceNameTypes.CustomFieldEditedField),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedIndex, SliceNameTypes.CustomFieldEditedIndex),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedParent, SliceNameTypes.CustomFieldEditedParent),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldUploadingThumbnail, SliceNameTypes.CustomFieldUploadingThumbnail),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedSystemName, SliceNameTypes.CustomFieldEditedSystemName),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldUpdate, SliceNameTypes.CustomFieldUpdate),
  [types.CUSTOM_FIELD_EDITED_FIELD_MAPPING_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNameTypes.CustomFieldEditedField].value };
    value.atomicFieldParams.mapping = payload;
    return {
      ...state,
      [SliceNameTypes.CustomFieldEditedField]: {
        ...state[SliceNameTypes.CustomFieldEditedField],
        value,
      },
    };
  },
  [types.CUSTOM_FIELD_EDITED_FIELD_SELECT_OPTIONS_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNameTypes.CustomFieldEditedField].value };
    value.atomicFieldParams.selectOptions = payload;
    return {
      ...state,
      [SliceNameTypes.CustomFieldEditedField]: {
        ...state[SliceNameTypes.CustomFieldEditedField],
        value,
      },
    };
  },
  [types.CUSTOM_FIELD_EDITED_FIELD_THUMBNAIL_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNameTypes.CustomFieldEditedField].value };
    value.thumbnail = payload;
    return {
      ...state,
      [SliceNameTypes.CustomFieldEditedField]: {
        ...state[SliceNameTypes.CustomFieldEditedField],
        value,
      },
    };
  },
});
