import { CustomDocumentResponse, CustomDocumentTemplateMatching, CustomDocumentTemplate, CustomDocumentDocumentReading, CustomDocumentReadingField } from 'models/CustomDocument.model';
import { createSelector } from 'reselect';
import { CUSTOM_DOCUMENT_STORE_KEY, SliceNames, CustomDocumentStore } from './customDocument.store';
import { CustomDocumentWizardStepTypes } from '../models/customDocument.model';

export const selectCustomDocumentStore = (state: any) => state[CUSTOM_DOCUMENT_STORE_KEY];

export const selectCustomDocumentModal = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): Partial<CustomDocumentResponse> => store[SliceNames.CustomDocument],
);

export const selectCustomDocumentWizardStep = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentWizardStepTypes => store[SliceNames.CustomDocumentWizardStep],
);

export const selectEditedCustomDocument = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number | null => store[SliceNames.EditedCustomDocument],
);

export const selectCustomDocumentUpload = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore) => store[SliceNames.CustomDocumentUpload],
);

export const selectCustomDocumentSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore) => store[SliceNames.CustomDocumentSettings],
);

export const selectCustomDocumentTemplateMatchingSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentTemplateMatching => store[SliceNames.CustomDocumentTemplateMatchingSettings],
);

export const selectCustomDocumentTemplateMatchingEditedTemplate = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number => store[SliceNames.CustomDocumentTemplateEditedTemplate],
);

export const selectCustomDocumentTemplateMatchingTemplateSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentTemplate => store[SliceNames.CustomDocumentTemplateMatchingTemplateSettings],
);

export const selectCustomDocumentDocumentReadingSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentDocumentReading => store[SliceNames.CustomDocumentDocumentReadingSettings],
);

export const selectCustomDocumentDocumentReadingFieldSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentReadingField => store[SliceNames.CustomDocumentDocumentReadingFieldSettings],
);

export const selectCustomDocumentEditedField = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number => store[SliceNames.CustomDocumentEditedField],
);

export const selectCustomDocumentDocumentReadingFieldOption = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): string => store[SliceNames.CustomDocumentDocumentReadingFieldOption],
);

export const selectCustomDocumentDocumentEditedReadingFieldOption = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number | null => store[SliceNames.CustomDocumentDocumentReadingEditedFieldOption],
);
