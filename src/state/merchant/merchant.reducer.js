import { DEFAULT_LANG } from 'components/intl-provider/IntlProvider.model';
import { get, last } from 'lodash';
import { createReducer } from '../utils';
import { types } from './merchant.actions';

const initialState = {
  apps: [],
  lastApplication: {},
  billing: {
    providers: [],
    planDetails: {},
  },
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

  isLoading: false,
  isLoaded: false,
  isFailed: false,
  error: null,
};

export const reducer = createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },

  [types.GET_MERCHANT_APPS_SUCCESS](state, { payload }) {
    return {
      ...state,
      apps: payload.data.apps,
      lastApplication: last(payload.data.apps) || {},
    };
  },

  [types.ADD_MERCHANT_PROVIDER_SUCCESS](state, { payload }) {
    const providers = get(payload.data, 'data.merchant.billing.providers');
    return {
      ...state,
      billing: {
        ...state.billing,
        providers,
      },
    };
  },

  [types.SET_MERCHANT_PLAN_SUCCESS](state, { payload }) {
    return {
      ...state,
      billing: {
        ...state.billing,
        ...payload.data.billing,
      },
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
