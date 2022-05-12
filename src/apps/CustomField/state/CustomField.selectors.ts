import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { Country } from 'models/Country.model';
import { ICustomField, IMapping, ISelectOptions } from 'models/CustomField.model';
import { CUSTOM_FIELD_STORE_KEY, CustomFieldStore, SliceNames } from './CustomField.store';
import { CustomFieldModalTypes, MAPPING_ALLOWED_COUNTRIES, MappingCountryTypes } from '../models/CustomField.model';

export const selectCustomFieldStore = (state: {CUSTOM_FIELD_STORE_KEY: CustomFieldStore}): CustomFieldStore => state[CUSTOM_FIELD_STORE_KEY];

export const selectCustomFieldModalType = createSelector<[typeof selectCustomFieldStore], CustomFieldModalTypes>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldModalType].value,
);

export const selectCustomFieldEditedCustomField = createSelector<[typeof selectCustomFieldStore], ICustomField | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedField].value,
);

export const selectCustomFieldSelectedCustomFieldMapping = createSelector<[typeof selectCustomFieldEditedCustomField], IMapping>(
  selectCustomFieldEditedCustomField,
  (field) => field.atomicFieldParams.mapping,
);

export const selectCustomFieldSelectedCustomFieldSelectOptions = createSelector<[typeof selectCustomFieldEditedCustomField], ISelectOptions[]>(
  selectCustomFieldEditedCustomField,
  (field) => field.atomicFieldParams.selectOptions,
);

export const selectCustomFieldEditedParent = createSelector<[typeof selectCustomFieldStore], string | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedParent].value,
);

export const selectCustomFieldEditedSystemName = createSelector<[typeof selectCustomFieldStore], string | null>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedSystemName].value,
);

export const selectCustomFieldListFields = createSelector<[typeof selectCustomFieldStore], ICustomField[]>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldListFields].value,
);

export const selectCustomFieldFlattenListFields = createSelector<[typeof selectCustomFieldStore], ICustomField[]>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldFlattenListFields].value,
);

export const selectCustomFieldEditedIndex = createSelector<[typeof selectCustomFieldStore], number>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldEditedIndex].value,
);

export const selectCustomFieldCountriesForMapping = createSelector<[typeof selectCountriesList], Country[]>(
  selectCountriesList,
  (countries) => countries?.filter(({ code }) => MAPPING_ALLOWED_COUNTRIES.includes((code as MappingCountryTypes))) || [],
);

export const selectCustomFieldUploadingThumbnail = createSelector<[typeof selectCustomFieldStore], boolean>(
  selectCustomFieldStore,
  (store) => store[SliceNames.CustomFieldUploadingThumbnail].value,
);
