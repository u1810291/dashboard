import { CustomDocumentResponse, CustomDocumentTemplateMatching, CustomDocumentTemplate, CustomDocumentDocumentReading, CustomDocumentReadingField } from 'models/CustomDocument.model';
import { createSelector } from 'reselect';
import { CUSTOM_DOCUMENT_STORE_KEY, SliceNameTypes, CustomDocumentStore } from './customDocument.store';
import { CustomDocumentWizardStepTypes } from '../models/CustomDocument.model';

export const selectCustomDocumentStore = (state: any) => state[CUSTOM_DOCUMENT_STORE_KEY];

export const selectCustomDocumentModal = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): Partial<CustomDocumentResponse> => store[SliceNameTypes.CustomDocument],
);

export const selectCustomDocumentWizardStep = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentWizardStepTypes => store[SliceNameTypes.CustomDocumentWizardStep],
);

export const selectEditedCustomDocument = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number | null => store[SliceNameTypes.EditedCustomDocument],
);

export const selectCustomDocumentUpload = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore) => store[SliceNameTypes.CustomDocumentUpload],
);

export const selectCustomDocumentSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore) => store[SliceNameTypes.CustomDocumentSettings],
);

export const selectCustomDocumentTemplateMatchingSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentTemplateMatching => store[SliceNameTypes.CustomDocumentTemplateMatchingSettings],
);

export const selectCustomDocumentTemplateMatchingEditedTemplate = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number => store[SliceNameTypes.CustomDocumentTemplateEditedTemplate],
);

export const selectCustomDocumentTemplateMatchingTemplateSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentTemplate => store[SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings],
);

export const selectCustomDocumentDocumentReadingSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentDocumentReading => store[SliceNameTypes.CustomDocumentDocumentReadingSettings],
);

export const selectCustomDocumentDocumentReadingFieldSettings = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): CustomDocumentReadingField => store[SliceNameTypes.CustomDocumentDocumentReadingFieldSettings],
);

export const selectCustomDocumentEditedField = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number => store[SliceNameTypes.CustomDocumentEditedField],
);

export const selectCustomDocumentDocumentReadingFieldOption = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): string => store[SliceNameTypes.CustomDocumentDocumentReadingFieldOption],
);

export const selectCustomDocumentDocumentEditedReadingFieldOption = createSelector(
  selectCustomDocumentStore,
  (store: CustomDocumentStore): number | null => store[SliceNameTypes.CustomDocumentDocumentReadingEditedFieldOption],
);
