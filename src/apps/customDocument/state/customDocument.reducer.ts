import { inputCustomDocumentValidationChecksDefaultValue } from 'apps/imageValidation/models/imageValidation.model';
import { OverlayActionTypes } from 'apps/overlay/state/overlay.actions';
import { CustomDocumentVerificationFlowFieldTypes } from 'models/CustomDocument.model';
import { createReducer } from 'state/store.utils';
import { SliceNames, CustomDocumentActionTypes, CustomDocumentStore } from './customDocument.store';
import { CustomDocumentWizardStepTypes } from '../models/customDocument.model';

const initialState: CustomDocumentStore = {
  [SliceNames.CustomDocumentWizardStep]: CustomDocumentWizardStepTypes.BasicInfo,
  [SliceNames.EditedCustomDocument]: null,
  [SliceNames.CustomDocument]: {
    name: null,
    isSingleFile: false,
    pages: 1,
    isSkippable: true,
    description: null,
    type: 'custom-',
    inputValidationChecks: inputCustomDocumentValidationChecksDefaultValue,
  },
  [SliceNames.CustomDocumentTemplateMatchingSettings]: {
    instructions: null,
    templates: [],
  },
  [SliceNames.CustomDocumentTemplateEditedTemplate]: null,
  [SliceNames.CustomDocumentTemplateMatchingTemplateSettings]: {
    caption: null,
    isAcceptable: false,
    image: null,
  },
  [SliceNames.CustomDocumentDocumentReadingSettings]: {
    fields: [],
    images: [],
  },
  [SliceNames.CustomDocumentEditedField]: null,
  [SliceNames.CustomDocumentDocumentReadingFieldSettings]: {
    id: '',
    type: CustomDocumentVerificationFlowFieldTypes.Text,
    label: '',
    options: [],
  },
  [SliceNames.CustomDocumentDocumentReadingEditedFieldOption]: null,
  [SliceNames.CustomDocumentDocumentReadingFieldOption]: null,
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
      [SliceNames.EditedCustomDocument]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocument]: {
        ...state[SliceNames.CustomDocument],
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
      [SliceNames.CustomDocumentUpload]: {
        ...state[SliceNames.CustomDocumentUpload],
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
      [SliceNames.CustomDocumentSettings]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_RESET](state) {
    return {
      ...state,
      [SliceNames.CustomDocumentTemplateMatchingSettings]: initialState[SliceNames.CustomDocumentTemplateMatchingSettings],
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_SETTINGS_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentTemplateMatchingSettings]: {
        ...state[SliceNames.CustomDocumentTemplateMatchingSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_EDITED_TEMPLATE_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentTemplateEditedTemplate]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_RESET](state) {
    return {
      ...state,
      [SliceNames.CustomDocumentTemplateMatchingTemplateSettings]: initialState[SliceNames.CustomDocumentTemplateMatchingTemplateSettings],
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_TEMPLATE_MATCHING_TEMPLATE_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentTemplateMatchingTemplateSettings]: {
        ...state[SliceNames.CustomDocumentTemplateMatchingTemplateSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_SETTINGS_MODAL_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingSettings]: {
        ...state[SliceNames.CustomDocumentDocumentReadingSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_EDITED_READING_FIELD_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentEditedField]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingFieldSettings]: {
        ...state[SliceNames.CustomDocumentDocumentReadingFieldSettings],
        ...payload,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_RESET](state) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingFieldSettings]: {
        ...initialState.CustomDocumentDocumentReadingFieldSettings,
      },
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_RESET](state) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingFieldOption]: initialState.CustomDocumentDocumentReadingFieldOption,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_FIELD_OPTION_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingFieldOption]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_READING_EDITED_FIELD_OPTION_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentDocumentReadingEditedFieldOption]: payload,
    };
  },
  [CustomDocumentActionTypes.CUSTOM_DOCUMENT_DOCUMENT_WIZARD_STEP_UPDATE](state, { payload }) {
    return {
      ...state,
      [SliceNames.CustomDocumentWizardStep]: payload,
    };
  },
});
