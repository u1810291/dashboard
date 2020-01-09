import { LoadableAdapter } from 'lib/Loadable.adapter';
import { LoadableCollectionAdapter } from 'lib/LoadableCollection.adapter';
import { createReducer } from 'state/utils';
import { BillingActionGroups, SliceNames } from './billing.model';

const initialState = {
  [SliceNames.PlanList]: LoadableCollectionAdapter.createState([
    // {
    //   billingCycle: 'P30D',
    //   createdAt: '2019-09-06T13:14:31.497Z',
    //   extraPrice: 250,
    //   includedVerifications: 0,
    //   isCustom: false,
    //   name: 'Pay as you go',
    //   order: 0,
    //   subscriptionPrice: 0,
    //   supportLevel: 0,
    //   updatedAt: '2019-09-06T13:14:31.497Z',
    //   _id: '5d725bb77e8061defcebe014',
    // },
  ]),
  [SliceNames.PlanDetails]: LoadableAdapter.createState({
    //   activatedAt: "2019-11-07T02:23:24.810Z"
    //   invoiceAt: "2019-12-07T02:23:24.810Z"
    //   plan: "5d6690507e8061defccffde2"
    //   provider: "stripe"
  }),
  [SliceNames.ProviderList]: LoadableCollectionAdapter.createState([
    // {
    //   data: {
    //     defaultSource: 'card_1FddE9FXfqrqQrjER2DaMWJx',
    //     id: 'cus_G9x8epbcMV59RS',
    //   },
    //   name: 'stripe',
    // },
  ]),
  [SliceNames.Card]: LoadableAdapter.createState({
    //   address_city: null
    //   address_country: null
    //   address_line1: null
    //   address_line1_check: null
    //   address_line2: null
    //   address_state: null
    //   address_zip: null
    //   address_zip_check: null
    //   brand: "Visa"
    //   country: "US"
    //   customer: "cus_FbtH0Ix051L0T2"
    //   cvc_check: "pass"
    //   dynamic_last4: null
    //   exp_month: 2
    //   exp_year: 2020
    //   fingerprint: "GRlY1GVkrQmfEuiI"
    //   funding: "credit"
    //   id: "card_1F6fV9FXfqrqQrjEt65L4bKp"
    //   last4: "4242"
    //   metadata: {}
    //   name: "Starter"
    //   object: "card"
    //   tokenization_method: null
  }),
};

export default createReducer(initialState, {
  ...LoadableCollectionAdapter.createHandlers(BillingActionGroups.PlanList, SliceNames.PlanList),
  ...LoadableAdapter.createHandlers(BillingActionGroups.PlanDetails, SliceNames.PlanDetails),
  ...LoadableAdapter.createHandlers(BillingActionGroups.Card, SliceNames.Card),
  ...LoadableCollectionAdapter.createHandlers(BillingActionGroups.ProviderList, SliceNames.ProviderList),
});
