import { DEFAULT_LANG } from 'components/intl-provider/IntlProvider.model';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { LoadableCollectionAdapter } from 'lib/LoadableCollection.adapter';
import { MerchantActionGroups, SliceNames } from 'state/merchant/merchant.model';
import { createReducer } from '../utils';

const initialState = {
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
    },
  },
  logoUrl: null,
  blockedAt: undefined,
  displayName: null,


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
    policyInterval: '',
    // verificationPatterns: {
    //   biometrics: string;
    // };
    // version: number;
    // computations: any[];
  }),
  [SliceNames.App]: LoadableCollectionAdapter.createState([
    // {
    //   clientId: string;
    //   clientSecret: string;
    // }
  ]),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Merchant, SliceNames.Merchant),
  ...LoadableAdapter.createHandlers(MerchantActionGroups.Configuration, SliceNames.Configuration),
  ...LoadableCollectionAdapter.createHandlers(MerchantActionGroups.App, SliceNames.App),
});
