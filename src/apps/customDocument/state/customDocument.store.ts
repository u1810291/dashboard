import { CustomDocumentResponse, CustomDocumentTemplateMatching, CustomDocumentTemplate, CustomDocumentDocumentReading, CustomDocumentReadingField } from 'models/CustomDocument.model';
import { CustomDocumentWizardStepTypes } from '../models/CustomDocument.model';

export const CUSTOM_DOCUMENT_STORE_KEY = 'customDocument';

export enum SliceNames {
  CustomDocumentWizardStep = 'customDocumentWizardStep',
  CustomDocument ='customDocument',
  EditedCustomDocument ='editedCustomDocument',
  CustomDocumentUpload = 'customDocumentUpload',
  CustomDocumentSettings = 'customDocumentSettings',
  CustomDocumentTemplateMatchingSettings = 'CustomDocumentTemplateMatchingSettings',
  CustomDocumentTemplateEditedTemplate = 'CustomDocumentTemplateEditedTemplate',
  CustomDocumentTemplateMatchingTemplateSettings = 'CustomDocumentTemplateMatchingTemplateSettings',
  CustomDocumentDocumentReadingSettings = 'CustomDocumentDocumentReadingSettings',
  CustomDocumentEditedField = 'CustomDocumentEditedField',
  CustomDocumentDocumentReadingFieldSettings = 'CustomDocumentDocumentReadingFieldSettings',
  CustomDocumentDocumentReadingEditedFieldOption = 'CustomDocumentDocumentReadingEditedFieldOption',
  CustomDocumentDocumentReadingFieldOption = 'CustomDocumentDocumentReadingFieldOption',
}

export enum CustomDocumentActionTypes {
  CUSTOM_DOCUMENT_TOTAL_RESET = 'customDocument/CUSTOM_DOCUMENT_TOTAL_RESET',
  CUSTOM_DOCUMENT_EDITED_DOCUMENT_UPDATE = 'customDocument/CUSTOM_DOCUMENT_EDITED_DOCUMENT_UPDATE',
  CUSTOM_DOCUMENT_MODAL_UPDATE = 'customDocument/CUSTOM_DOCUMENT_MODAL_UPDATE',
  CUSTOM_DOCUMENT_MODAL_RESET = 'customDocument/CUSTOM_DOCUMENT_MODAL_RESET',
  CUSTOM_DOCUMENT_UPLOAD_MODAL_UPDATE = 'customDocument/CUSTOM_DOCUMENT_UPLOAD_MODAL_UPDATE',
  CUSTOM_DOCUMENT_UPLOAD_MODAL_RESET = 'customDocument/CUSTOM_DOCUMENT_UPLOAD_MODAL_RESET',
  CUSTOM_DOCUMENT_SETTINGS_MODAL_UPDATE = 'customDocument/CUSTOM_DOCUMENT_SETTINGS_MODAL_UPDATE',
  CUSTOM_DOCUMENT_SETTINGS_MODAL_RESET = 'customDocument/CUSTOM_DOCUMENT_SETTINGS_MODAL_RESET',
  CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_UPDATE = 'customDocument/CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_UPDATE',
  CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_RESET = 'customDocument/CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_RESET',
  CUSTOM_DOCUMENT_TEMPLATE_MATCHING_EDITED_TEMPLATE_UPDATE = 'customDocument/CUSTOM_DOCUMENT_TEMPLATE_MATCHING_EDITED_TEMPLATE_UPDATE',
  CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_RESET = 'customDocument/CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_RESET',
  CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_UPDATE = 'customDocument/CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_RESET = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_RESET',
  CUSTOM_DOCUMENT_DOCUMENT_EDITED_READING_FIELD_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_EDITED_READING_FIELD_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_RESET = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_RESET',
  CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_RESET = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_RESET',
  CUSTOM_DOCUMENT_DOCUMENT_READING_EDITED_FIELD_OPTION_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_READING_EDITED_FIELD_OPTION_UPDATE',
  CUSTOM_DOCUMENT_DOCUMENT_WIZARD_STEP_UPDATE = 'customDocument/CUSTOM_DOCUMENT_DOCUMENT_WIZARD_STEP_UPDATE',
}

export interface CustomDocumentStore {
  [SliceNames.CustomDocumentWizardStep]: CustomDocumentWizardStepTypes;
  [SliceNames.EditedCustomDocument]: number | null;
  [SliceNames.CustomDocument]: Partial<CustomDocumentResponse>;
  [SliceNames.CustomDocumentTemplateMatchingSettings]: CustomDocumentTemplateMatching;
  [SliceNames.CustomDocumentTemplateMatchingTemplateSettings]: CustomDocumentTemplate;
  [SliceNames.CustomDocumentTemplateEditedTemplate]: number | null;
  [SliceNames.CustomDocumentDocumentReadingSettings]: CustomDocumentDocumentReading;
  [SliceNames.CustomDocumentEditedField]: number | null;
  [SliceNames.CustomDocumentDocumentReadingFieldSettings]: CustomDocumentReadingField;
  [SliceNames.CustomDocumentDocumentReadingEditedFieldOption]: number | null;
  [SliceNames.CustomDocumentDocumentReadingFieldOption]: string | null;
}
