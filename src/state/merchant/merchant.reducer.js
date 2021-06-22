import { LoadableAdapter } from 'lib/Loadable.adapter';
import { DEFAULT_LOCALE } from 'models/Intl.model';
import { createReducer } from 'state/store.utils';
import { types } from './merchant.actions';
import { MerchantActionGroups, SliceNames } from './merchant.store';

const initialState = {
  [SliceNames.Merchant]: LoadableAdapter.createState({
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
  [SliceNames.Configuration]: LoadableAdapter.createState({
    dashboard: {
      language: DEFAULT_LOCALE,
    },
  }),
  [SliceNames.Flows]: LoadableAdapter.createState([]),
  [SliceNames.App]: LoadableAdapter.createState([
    // {
    //   clientId: string;
    //   clientSecret: string;
    // }
  ]),
  currentFlow: null,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Merchant, SliceNames.Merchant),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Configuration, SliceNames.Configuration),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.App, SliceNames.App),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Flows, SliceNames.Flows),

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
});
