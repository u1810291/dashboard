import { collectionUpsert, createReducer } from 'state/utils';
import { types } from './plans.actions';

const initialState = {
  rows: [
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
  ],
  cardDetails: null,
  // cardDetails: {
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
  // }
  planDetails: null,
  // planDetails: {
  //   activatedAt: "2019-11-07T02:23:24.810Z"
  //   invoiceAt: "2019-12-07T02:23:24.810Z"
  //   plan: "5d6690507e8061defccffde2"
  //   provider: "stripe"
  // }
  providers: [
    // {
    //   data: {
    //     defaultSource: 'card_1FddE9FXfqrqQrjER2DaMWJx',
    //     id: 'cus_G9x8epbcMV59RS',
    //   },
    //   name: 'stripe',
    // },
  ],
};

export default createReducer(initialState, {
  [types.PLANS_INIT](state, { payload }) {
    return {
      ...state,
      planDetails: payload.planDetails,
      providers: payload.providers,
    };
  },
  [types.PLAN_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      rows: collectionUpsert(state.rows, payload),
    };
  },
  [types.PLAN_SET_SUCCESS](state, { payload }) {
    return {
      ...state,
      planDetails: payload.planDetails,
      providers: payload.providers,
    };
  },
  [types.PLANS_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      rows: payload,
    };
  },
  // card
  [types.CURRENT_PLAN_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      cardDetails: payload.cardDetails,
      planDetails: payload.planDetails,
    };
  },
  [types.PLAN_DELETE_SUCCESS](state, { payload }) {
    return {
      ...state,
      planDetails: payload.planDetails,
      providers: payload.providers,
    };
  },
  // provider
  [types.PROVIDER_ADD_SUCCESS](state, { payload }) {
    return {
      ...state,
      planDetails: payload.planDetails,
      providers: payload.providers,
    };
  },
});
