import { LoadableAdapter } from 'lib/Loadable.adapter';
import { DEFAULT_LOCALE } from 'models/Intl.model';
import { createReducer } from 'state/store.utils';
import { types } from './merchant.actions';
import { MerchantActionGroups, SliceNameTypes, MerchantStore } from './merchant.store';

const initialState: MerchantStore = {
  [SliceNameTypes.Merchant]: LoadableAdapter.createState({
    // logoUrl: string;
    // id: string;
    // blockedAt: Date;
    // collaborators: any[];
    // createdAt: Date;
    // displayName: string;
    // businessName: string;
    // owner: string;
    // updatedAt: Date;
  }),
  [SliceNameTypes.Configuration]: LoadableAdapter.createState({
    dashboard: {
      language: DEFAULT_LOCALE,
    },
  }),
  [SliceNameTypes.CustomDocuments]: LoadableAdapter.createState([]),
  [SliceNameTypes.Flows]: LoadableAdapter.createState([]),
  [SliceNameTypes.App]: LoadableAdapter.createState([]),
  currentFlow: null,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Merchant, SliceNameTypes.Merchant),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Configuration, SliceNameTypes.Configuration),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.App, SliceNameTypes.App),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.CustomDocuments, SliceNameTypes.CustomDocuments),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Flows, SliceNameTypes.Flows),

  [types.CURRENT_FLOW_UPDATE](state, { payload }) {
    return {
      ...state,
      currentFlow: payload,
    };
  },
  [types.BUSINESS_NAME_UPDATE](state, { payload }) {
    return {
      ...state,
      merchant: {
        ...state.merchant,
        value: {
          ...state.merchant.value,
          ...payload,
        },
      },
    };
  },
  [types.ONBOARDING_STEPS_UPDATE](state, { payload }) {
    return {
      ...state,
      merchant: {
        ...state.merchant,
        value: {
          ...state.merchant.value,
          ...payload,
        },
      },
    };
  },
  [types.SETTINGS_UPDATE](state, { payload }) {
    return {
      ...state,
      merchant: {
        ...state.merchant,
        value: {
          ...state.merchant.value,
          settings: {
            ...state.merchant.value.settings,
            ...payload,
          },
        },
      },
    };
  },
});
