import { createReducer } from 'state/store.utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { ActionGroupName, CustomFieldStore, SliceNames, types } from './CustomField.store';
import { CustomFieldModalTypes } from '../models/CustomField.model';

const initialState: CustomFieldStore = {
  [SliceNames.CustomFieldModalType]: LoadableAdapter.createState(CustomFieldModalTypes.ConfigureField),
  [SliceNames.CustomFieldEditedField]: LoadableAdapter.createState(null),
  [SliceNames.CustomFieldFlattenListFields]: LoadableAdapter.createState([]),
  [SliceNames.CustomFieldListFields]: LoadableAdapter.createState([]),
  [SliceNames.CustomFieldEditedIndex]: LoadableAdapter.createState(null),
  [SliceNames.CustomFieldEditedParent]: LoadableAdapter.createState(null),
  [SliceNames.CustomFieldUploadingThumbnail]: LoadableAdapter.createState(false),
  [SliceNames.CustomFieldEditedSystemName]: LoadableAdapter.createState(null),
};

export const customFieldReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldModalStep, SliceNames.CustomFieldModalType),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldFlattenListFields, SliceNames.CustomFieldFlattenListFields),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldListFields, SliceNames.CustomFieldListFields),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedField, SliceNames.CustomFieldEditedField),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedIndex, SliceNames.CustomFieldEditedIndex),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedParent, SliceNames.CustomFieldEditedParent),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldUploadingThumbnail, SliceNames.CustomFieldUploadingThumbnail),
  ...LoadableAdapter.createHandlers(ActionGroupName.customFieldEditedSystemName, SliceNames.CustomFieldEditedSystemName),
  [types.CUSTOM_FIELD_EDITED_FIELD_MAPPING_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNames.CustomFieldEditedField].value };
    value.atomicFieldParams.mapping = payload;
    return {
      ...state,
      [SliceNames.CustomFieldEditedField]: {
        ...state[SliceNames.CustomFieldEditedField],
        value,
      },
    };
  },
  [types.CUSTOM_FIELD_EDITED_FIELD_SELECT_OPTIONS_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNames.CustomFieldEditedField].value };
    value.atomicFieldParams.selectOptions = payload;
    return {
      ...state,
      [SliceNames.CustomFieldEditedField]: {
        ...state[SliceNames.CustomFieldEditedField],
        value,
      },
    };
  },
  [types.CUSTOM_FIELD_EDITED_FIELD_THUMBNAIL_SUCCESS](state, { payload }) {
    const value = { ...state[SliceNames.CustomFieldEditedField].value };
    value.thumbnail = payload;
    return {
      ...state,
      [SliceNames.CustomFieldEditedField]: {
        ...state[SliceNames.CustomFieldEditedField],
        value,
      },
    };
  },
});
