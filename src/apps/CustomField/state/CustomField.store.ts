import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { Loadable } from 'models/Loadable.model';
import { ICustomField } from 'models/CustomField.model';
import { CustomFieldModalTypes } from '../models/CustomField.model';

export const CUSTOM_FIELD_STORE_KEY = 'customField';

export enum SliceNames {
  CustomFieldModalType = 'customFieldModalType',
  CustomFieldFlattenListFields = 'customFieldListFields',
  CustomFieldListFields = 'CustomFieldListFields',
  CustomFieldEditedField = 'customFieldEditedField',
  CustomFieldEditedIndex = 'customFieldEditedIndex',
  CustomFieldEditedParent = 'customFieldEditedParent',
  CustomFieldUploadingThumbnail = 'CustomFieldUploadingThumbnail',
  CustomFieldEditedSystemName = 'CustomFieldEditedSystemName',
  CustomFieldUpdate = 'CustomFieldUpdate',
}

export enum ActionGroupName {
  customFieldModalStep = 'CUSTOM_FIELD_MODAL_STEP',
  customFieldFlattenListFields = 'CUSTOM_FIELD_FLATTEN_LIST_FIELDS',
  customFieldListFields = 'CUSTOM_FIELD_LIST_FIELDS',
  customFieldEditedField = 'CUSTOM_FIELD_EDITED_FIELD',
  customFieldEditedIndex = 'CUSTOM_FIELD_EDITED_INDEX',
  customFieldEditedParent = 'CUSTOM_FIELD_EDITED_PARENT',
  customFieldUploadingThumbnail = 'CUSTOM_FIELD_UPLOADING_THUMBNAIL',
  customFieldEditedSystemName = 'CUSTOM_FIELD_EDITED_SYSTEM_NAME',
  customFieldUpdate = 'CUSTOM_FIELD_UPDATE',
}

export const types: TypesSequence = {
  ...createTypesSequence(ActionGroupName.customFieldEditedField),
  ...createTypesSequence(ActionGroupName.customFieldModalStep),
  ...createTypesSequence(ActionGroupName.customFieldFlattenListFields),
  ...createTypesSequence(ActionGroupName.customFieldListFields),
  ...createTypesSequence(ActionGroupName.customFieldEditedField),
  ...createTypesSequence(ActionGroupName.customFieldEditedIndex),
  ...createTypesSequence(ActionGroupName.customFieldEditedParent),
  ...createTypesSequence(ActionGroupName.customFieldUploadingThumbnail),
  ...createTypesSequence(ActionGroupName.customFieldEditedSystemName),
  ...createTypesSequence(ActionGroupName.customFieldUpdate),
  CUSTOM_FIELD_EDITED_FIELD_SELECT_OPTIONS_SUCCESS: 'customField/CUSTOM_FIELD_EDITED_FIELD_SELECT_OPTIONS_SUCCESS',
  CUSTOM_FIELD_EDITED_FIELD_MAPPING_SUCCESS: 'customField/CUSTOM_FIELD_EDITED_FIELD_MAPPING_SUCCESS',
  CUSTOM_FIELD_EDITED_FIELD_THUMBNAIL_SUCCESS: 'customField/CUSTOM_FIELD_EDITED_FIELD_THUMBNAIL_SUCCESS',
};

export interface CustomFieldStore {
  [SliceNames.CustomFieldModalType]: Loadable<CustomFieldModalTypes>;
  [SliceNames.CustomFieldFlattenListFields]: Loadable<ICustomField[]>;
  [SliceNames.CustomFieldListFields]: Loadable<ICustomField[]>;
  [SliceNames.CustomFieldEditedField]: Loadable<ICustomField | null>;
  [SliceNames.CustomFieldEditedIndex]: Loadable<number>;
  [SliceNames.CustomFieldEditedParent]: Loadable<string>;
  [SliceNames.CustomFieldUploadingThumbnail]: Loadable<boolean>;
  [SliceNames.CustomFieldEditedSystemName]: Loadable<string>;
  [SliceNames.CustomFieldUpdate]: Loadable<unknown>;
}
