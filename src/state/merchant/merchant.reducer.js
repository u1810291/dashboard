import { DEFAULT_LANG } from 'components/intl-provider/IntlProvider.model';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { MerchantActionGroups, SliceNames } from 'state/merchant/merchant.model';
import { createReducer } from '../utils';
import { types } from './merchant.actions';

const initialState = {
  [SliceNames.Merchant]: LoadableAdapter.createState({
    // logoUrl: string;
    // id: string;
    // blockedAt: Date;
    // collaborators: any[];
    // createdAt: Date;
    // displayName: string;
    // owner: string;
    // updatedAt: Date;
  }),
  [SliceNames.Configuration]: LoadableAdapter.createState({
    flow: {
      required: [],
      optional: [],
    },
    style: {
      color: '',
      language: DEFAULT_LANG,
    },
    system: {
      watchlists: true,
      liveness: true,
    },
    supportedCountries: [],
    dashboard: {
      language: DEFAULT_LANG,
      shouldPassOnboarding: false,
      // usePlans: boolean;
      // info: ?
    },
    verificationSteps: [],
    policyInterval: null,
    // verificationPatterns: {
    //   biometrics: string;
    // };
    // version: number;
    // computations: any[];
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
});
