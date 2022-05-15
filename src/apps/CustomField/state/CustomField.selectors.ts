import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { Country } from 'models/Country.model';
import { ICustomField, IMapping, ISelectOptions } from 'models/CustomField.model';
import { CUSTOM_FIELD_STORE_KEY, CustomFieldStore, SliceNames } from './CustomField.store';
import { CustomFieldModalTypes, MAPPING_ALLOWED_COUNTRIES, MappingCountryTypes } from '../models/CustomField.model';

export const selectCustomFieldStore = (state): CustomFieldStore => state[CUSTOM_FIELD_STORE_KEY];

export const selectCustomFieldModalType = createSelector<any, CustomFieldStore, CustomFieldModalTypes>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldModalType].value,
);

export const selectCustomFieldEditedCustomField = createSelector<any, CustomFieldStore, ICustomField | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedField].value,
);

export const selectCustomFieldSelectedCustomFieldMapping = createSelector<any, ICustomField, IMapping>(
  selectCustomFieldEditedCustomField,
  (field) => field.atomicFieldParams.mapping,
);

export const selectCustomFieldSelectedCustomFieldSelectOptions = createSelector<any, ICustomField, ISelectOptions[]>(
  selectCustomFieldEditedCustomField,
  (field) => field.atomicFieldParams.selectOptions,
);

export const selectCustomFieldEditedParent = createSelector<any, CustomFieldStore, string | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedParent].value,
);

export const selectCustomFieldEditedSystemName = createSelector<any, CustomFieldStore, string | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedSystemName].value,
);

export const selectCustomFieldListFields = createSelector<any, CustomFieldStore, ICustomField[]>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldListFields].value,
);

export const selectCustomFieldFlattenListFields = createSelector<any, CustomFieldStore, ICustomField[]>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldFlattenListFields].value,
);

export const selectCustomFieldEditedIndex = createSelector<any, CustomFieldStore, number>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedIndex].value,
);

export const selectCustomFieldCountriesForMapping = createSelector<any, Country[], Country[]>(
  selectCountriesList,
  (countries) => countries?.filter(({ code }) => MAPPING_ALLOWED_COUNTRIES.includes((code as MappingCountryTypes))) || [],
);

export const selectCustomFieldUploadingThumbnail = createSelector<any, CustomFieldStore, boolean>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldUploadingThumbnail].value,
);
