import { DEFAULT_LANG } from 'components/intl-provider/IntlProvider.model';
import { last } from 'lodash';
import { createReducer } from '../utils';
import { types } from './merchant.actions';

const initialState = {
  apps: [],
  lastApplication: {},
  configurations: {
    flow: {
      required: [],
      optional: [],
    },
    style: {
      color: undefined,
      language: DEFAULT_LANG,
    },
    system: {
      watchlists: true,
      liveness: true,
    },
    verificationSteps: [],
    supportedCountries: [],
    dashboard: {
      language: DEFAULT_LANG,
      shouldPassOnboarding: false,
    },
  },
  integrationCode: undefined,
  logoUrl: null,
  blockedAt: undefined,
  displayName: null,
};

export default createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
      configurations: {
        ...state.configurations,
        ...payload.data.configurations,
      },
    };
  },

  [types.GET_MERCHANT_APPS_SUCCESS](state, { payload }) {
    return {
      ...state,
      apps: payload.data.apps,
      lastApplication: last(payload.data.apps) || {},
    };
  },

  [types.MERCHANTS_PUT_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },

  [types.UPLOAD_MERCHANT_MEDIA_SUCCESS](state, { payload }) {
    return {
      ...state,
      logoUrl: payload.data.publicUrl,
    };
  },

  [types.INTEGRATION_CODE_SUCCESS](state, { payload }) {
    return {
      ...state,
      integrationCode: payload.data,
    };
  },

  [types.CONFIGURATION_SAVE_REQUEST](state, { configurations }) {
    return {
      ...state,
      configurations,
    };
  },

  [types.CONFIGURATION_SAVE_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },

});
