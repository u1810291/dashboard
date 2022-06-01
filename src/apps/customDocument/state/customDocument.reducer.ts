import { inputCustomDocumentValidationChecksDefaultValue } from 'models/ImageValidation.model';
import { OverlayActionTypes } from 'apps/overlay/state/overlay.actions';
import { CustomDocumentVerificationFlowFieldTypes } from 'models/CustomDocument.model';
import { createReducer } from 'state/store.utils';
import { SliceNameTypes, CustomDocumentActionTypes, CustomDocumentStore } from './customDocument.store';
import { CustomDocumentWizardStepTypes, CUSTOM_DOCUMENT_PREFIX } from '../models/CustomDocument.model';

const initialState: CustomDocumentStore = {
  [SliceNameTypes.CustomDocumentWizardStep]: CustomDocumentWizardStepTypes.BasicInfo,
  [SliceNameTypes.EditedCustomDocument]: null,
  [SliceNameTypes.CustomDocument]: {
    name: null,
    isSingleFile: false,
    pages: 1,
    isSkippable: true,
    description: null,
    type: CUSTOM_DOCUMENT_PREFIX,
    inputValidationChecks: inputCustomDocumentValidationChecksDefaultValue,
  },
  [SliceNameTypes.CustomDocumentTemplateMatchingSettings]: {
    instructions: null,
    templates: [],
  },
  [SliceNameTypes.CustomDocumentTemplateEditedTemplate]: null,
  [SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings]: {
    caption: null,
    isAcceptable: false,
    image: null,
  },
  [SliceNameTypes.CustomDocumentDocumentReadingSettings]: {
    fields: [],
    images: [],
  },
  [SliceNameTypes.CustomDocumentEditedField]: null,
  [SliceNameTypes.CustomDocumentDocumentReadingFieldSettings]: {
    id: '',
    type: CustomDocumentVerificationFlowFieldTypes.Text,
    label: '',
    options: [],
  },
  [SliceNameTypes.CustomDocumentDocumentReadingEditedFieldOption]: null,
  [SliceNameTypes.CustomDocumentDocumentReadingFieldOption]: null,
};

export default createReducer(initialState, {
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TOTAL_RESET]() {
    return {
      ...initialState,
    };
  },
  [OverlayActionTypes.CLOSE_OVERLAY]() {
    return {
      ...initialState,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_EDITED_DOCUMENT_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.EditedCustomDocument]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocument]: {
        ...state[SliceNameTypes.CustomDocument],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_MODAL_RESET]() {
    return {
      ...initialState,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_UPLOAD_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentUpload]: {
        ...state[SliceNameTypes.CustomDocumentUpload],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_UPLOAD_MODAL_RESET]() {
    return {
      ...initialState,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_SETTINGS_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentSettings]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_RESET](state) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentTemplateMatchingSettings]: initialState[SliceNameTypes.CustomDocumentTemplateMatchingSettings],
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentTemplateMatchingSettings]: {
        ...state[SliceNameTypes.CustomDocumentTemplateMatchingSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_EDITED_TEMPLATE_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentTemplateEditedTemplate]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_RESET](state) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings]: initialState[SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings],
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings]: {
        ...state[SliceNameTypes.CustomDocumentTemplateMatchingTemplateSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingSettings]: {
        ...state[SliceNameTypes.CustomDocumentDocumentReadingSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_EDITED_READING_FIELD_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentEditedField]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingFieldSettings]: {
        ...state[SliceNameTypes.CustomDocumentDocumentReadingFieldSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_RESET](state) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingFieldSettings]: {
        ...initialState.CustomDocumentDocumentReadingFieldSettings,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_RESET](state) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingFieldOption]: initialState.CustomDocumentDocumentReadingFieldOption,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingFieldOption]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_EDITED_FIELD_OPTION_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentDocumentReadingEditedFieldOption]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_WIZARD_STEP_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNameTypes.CustomDocumentWizardStep]: payload,
    };
  },
});
