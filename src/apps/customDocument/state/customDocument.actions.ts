import * as api from 'lib/client/merchant';
import { notification } from 'apps/ui';
import { isNil } from 'lib/isNil';
import compact from 'lodash/compact';
import { ErrorMessages } from 'models/Error.model';
import { productManagerService } from 'apps/Product';
import { CustomDocumentResponse, CustomDocumentTemplateMatching, CustomDocumentTemplate, CustomDocumentReadingField, CustomDocumentDocumentReading } from 'models/CustomDocument.model';
import { DocumentSides } from 'models/Document.model';
import { ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { merchantCreateCustomDocument, merchantUpdateCustomDocument, merchantDeleteCustomDocument } from 'state/merchant/merchant.actions';
import { CustomDocumentActionTypes } from './customDocument.store';
import { selectCustomDocumentModal, selectCustomDocumentDocumentReadingFieldSettings, selectEditedCustomDocument } from './customDocument.selectors';
import { CustomDocumentWizardStepTypes, TEXT_DETECTION_RELEASE } from '../models/customDocument.model';
import { CustomDocument } from '../services/customDocument.service';

export const customDocumentTotalReset = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TOTAL_RESET });
};

export const updateEditedCustomDocument = (data: number | null) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_EDITED_DOCUMENT_UPDATE, payload: data });
};

export const updateCustomDocumentModal = (data: Partial<CustomDocumentResponse>) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_MODAL_UPDATE, payload: data });
};

export const resetCustomDocumentModal = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_MODAL_RESET });
};

export const updateCustomDocumentUploadModal = (data) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_UPLOAD_MODAL_UPDATE, payload: data });
};

export const resetCustomDocumentUploadModal = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_UPLOAD_MODAL_RESET });
};

export const updateCustomDocumentSettingsModal = (data) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_SETTINGS_MODAL_UPDATE, payload: data });
};

export const resetCustomDocumentSettingsModal = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_SETTINGS_MODAL_RESET });
};

export const updateCustomDocumentTemplateMatchingSettings = (data: Partial<CustomDocumentTemplateMatching>) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_UPDATE, payload: data });
};

export const resetCustomDocumentTemplateMatchingSettings = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_RESET });
};

export const updateCustomDocumentTemplateMatchingEditedTemplate = (data: number) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_EDITED_TEMPLATE_UPDATE, payload: data });
};

export const updateCustomDocumentTemplateMatchingTemplateSettings = (data: Partial<CustomDocumentTemplate>) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_UPDATE, payload: data });
};

export const resetCustomDocumentTemplateMatchingTemplateSettings = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_RESET });
};

export const updateCustomDocumentDocumentReading = (data: Partial<CustomDocumentDocumentReading>) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_UPDATE, payload: data });
};

export const updateCustomDocumentDocumentEditedReadingField = (data: number | null) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_EDITED_READING_FIELD_UPDATE, payload: data });
};

export const updateCustomDocumentDocumentReadingField = (data: Partial<CustomDocumentReadingField>) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_UPDATE, payload: data });
};

export const resetCustomDocumentDocumentReadingField = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_RESET });
};

export const resetCustomDocumentDocumentReadingFieldOption = () => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_RESET });
};

export const updateCustomDocumentDocumentReadingFieldOption = (value: string) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_UPDATE, payload: value });
};

export const updateCustomDocumentDocumentReadingEditedFieldOption = (data: number | null) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_EDITED_FIELD_OPTION_UPDATE, payload: data });
};

export const updateCustomDocumentWizardStep = (data: CustomDocumentWizardStepTypes) => (dispatch) => {
  dispatch({ type: CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_WIZARD_STEP_UPDATE, payload: data });
};

export const customDocumentUpdateMedia = (form, side: DocumentSides) => async (dispatch, getState) => {
  try {
    const { data } = await api.uploadMerchantMedia(form);
    const customDocument = selectCustomDocumentModal(getState());
    dispatch(updateCustomDocumentModal({
      example: {
        ...(customDocument?.example || {}),
        [side]: data,
      },
    }));
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const customDocumentRemoveMedia = (side: DocumentSides) => (dispatch, getState) => {
  const customDocument = selectCustomDocumentModal(getState());
  dispatch(updateCustomDocumentModal({
    example: {
      ...(customDocument?.example || {}),
      [side]: null,
    },
  }));
};

export const customDocumentUpdateTemplateMedia = (form) => async (dispatch) => {
  try {
    const { data } = await api.uploadMerchantMedia(form);
    dispatch(updateCustomDocumentTemplateMatchingTemplateSettings({
      image: data,
    }));
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const editCustomDocumentTemplateMatchingTemplate = (index: number | null, template: CustomDocumentTemplate) => (dispatch, getState) => {
  const customDocument: Partial<CustomDocumentResponse> = selectCustomDocumentModal(getState());
  const verificationPatterns = customDocument?.flow?.verificationPatterns || {};
  const templateMatching: CustomDocumentTemplateMatching = verificationPatterns?.[VerificationPatternTypes.TemplateMatching] || {};
  if (isNil(index)) {
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.TemplateMatching]: {
            ...templateMatching,
            templates: [
              ...(templateMatching.templates || []),
              template,
            ],
          },
        },
      },
    }));
  } else {
    const updatedTemplates = [...templateMatching.templates];
    updatedTemplates.splice(index, 1, template);
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.TemplateMatching]: {
            ...templateMatching,
            templates: updatedTemplates,
          },
        },
      },
    }));
  }
};

export const customDocumentUpdateReadingMedia = (form, index: number) => async (dispatch, getState) => {
  try {
    const { data } = await api.uploadMerchantMedia(form);
    const customDocument = selectCustomDocumentModal(getState());
    const verificationPatterns = customDocument?.flow?.verificationPatterns || {};
    const documentReading = verificationPatterns?.[VerificationPatternTypes.DocumentReading] || {};
    const updatedImages = [...documentReading.images || []];
    updatedImages[index] = data;
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            images: compact(updatedImages),
          },
        },
      },
    }));
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const editCustomDocumentDocumentReadingField = (index: number | null, field: CustomDocumentReadingField) => (dispatch, getState) => {
  const customDocument: Partial<CustomDocumentResponse> = selectCustomDocumentModal(getState());
  const verificationPatterns = customDocument?.flow?.verificationPatterns || {};
  const documentReading: CustomDocumentDocumentReading = verificationPatterns?.[VerificationPatternTypes.DocumentReading] || {};
  if (isNil(index)) {
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            fields: [
              ...(documentReading.fields || []),
              field,
            ],
          },
        },
      },
    }));
  } else {
    const updatedFields = [...documentReading.fields || []];
    updatedFields.splice(index, 1, field);
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            fields: updatedFields,
          },
        },
      },
    }));
  }
};

export const editCustomDocumentDocumentReadingFieldOption = (index: number | null, option: string) => (dispatch, getState) => {
  const field: CustomDocumentReadingField = selectCustomDocumentDocumentReadingFieldSettings(getState());
  if (isNil(index)) {
    dispatch(updateCustomDocumentDocumentReadingField({
      options: [
        ...field.options,
        option,
      ],
    }));
  } else {
    const updatedOptions = [...field.options];
    updatedOptions.splice(index, 1, option);
    dispatch(updateCustomDocumentDocumentReadingField({
      options: updatedOptions,
    }));
  }
};

export const saveCustomDocument = (customDocument: Partial<CustomDocumentResponse>) => async (dispatch, getState) => {
  try {
    const edited: number | null = selectEditedCustomDocument(getState());
    if (isNil(edited)) {
      await dispatch(merchantCreateCustomDocument({
        ...customDocument,
        inputValidationChecks: TEXT_DETECTION_RELEASE ? customDocument.inputValidationChecks : undefined,
      }));
    } else {
      await dispatch(merchantUpdateCustomDocument(customDocument?.type, {
        ...customDocument,
        inputValidationChecks: TEXT_DETECTION_RELEASE ? customDocument.inputValidationChecks : undefined,
        type: undefined,
      }));
    }
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const deleteCustomDocument = (documentType: string) => async (dispatch) => {
  try {
    await dispatch(merchantDeleteCustomDocument(documentType));
  } catch (error) {
    throw (error as any)?.response?.data;
  }
};

export const customDocumentInit = () => (): ProductTypes => {
  const customDocument = new CustomDocument();
  productManagerService.register(customDocument);
  return customDocument.id;
};
