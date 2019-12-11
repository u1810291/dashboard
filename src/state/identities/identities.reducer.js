import { isEmpty } from 'lodash';
import { collectionUpsert, createReducer } from 'state/utils';
import { types } from './identities.actions';
import { buildInitialMonthlyIdentities, computeMonthlyStatisticsForIdentities, normalizeCURPData } from './identities.helpers';

const initialState = {
  isLoading: true,
  isLoadingFile: false,
  countIsLoading: true,
  deletingIdentities: [],
  identities: [],
  count: null,
  monthlyIdentities: buildInitialMonthlyIdentities(12),
};

const reducer = createReducer(initialState, {
  [types.IDENTITY_FETCH_SUCCESS](state, { payload }) {
    return {
      ...state,
      identities: collectionUpsert(state.identities, normalizeCURPData(payload), 'id'),
    };
  },

  [types.IDENTITY_LIST_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
    };
  },

  [types.IDENTITY_LIST_SUCCESS](state, { payload }) {
    const monthlyIdentities = isEmpty(payload)
      ? buildInitialMonthlyIdentities(12)
      : computeMonthlyStatisticsForIdentities(payload);

    return {
      ...state,
      isLoading: false,
      identities: payload,
      monthlyIdentities,
    };
  },
  [types.IDENTITY_LIST_FAILURE](state) {
    return {
      ...state,
      isLoading: false,
    };
  },
  [types.IDENTITY_COUNT_REQUEST](state) {
    return {
      ...state,
      countIsLoading: true,
    };
  },
  [types.IDENTITY_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      countIsLoading: false,
      count: payload.data.count,
    };
  },
  [types.IDENTITY_COUNT_FAILURE](state) {
    return {
      ...state,
      countIsLoading: false,
    };
  },
  [types.IDENTITY_PATCH_SUCCESS](state, { payload }) {
    return {
      ...state,
      identities: (state.identities || []).map((item) => {
        if (item.id !== payload.id) {
          return item;
        }
        return {
          ...item,
          status: payload.data.status,
        };
      }),
    };
  },
  [types.DOCUMENT_PATCH_SUCCESS](state, { payload }) {
    return {
      ...state,
      identities: collectionUpsert(state.identities, payload, 'id'),
    };
  },
  [types.IDENTITY_DELETE_REQUEST](state, { payload }) {
    return {
      ...state,
      deletingIdentities: [
        ...state.deletingIdentities,
        payload.id,
      ],
    };
  },
  [types.IDENTITY_DELETE_SUCCESS](state, { payload }) {
    return {
      ...state,
      identities: state.identities.filter((item) => item.id !== payload.id),
      deletingIdentities: state.deletingIdentities.filter((id) => id !== payload.id),
    };
  },
  [types.IDENTITY_DELETE_FAILURE](state, { payload }) {
    return {
      ...state,
      deletingIdentities: state.deletingIdentities.filter((id) => id !== payload.id),
    };
  },
  [types.IDENTITY_LIST_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      count: payload.data,
    };
  },
  [types.IDENTITY_LIST_DOWNLOAD_REQUEST](state) {
    return {
      ...state,
      isLoadingFile: true,
    };
  },
  [types.IDENTITY_LIST_DOWNLOAD_SUCCESS](state) {
    return {
      ...state,
      isLoadingFile: false,
    };
  },
  [types.IDENTITY_LIST_DOWNLOAD_FAILURE](state) {
    return {
      ...state,
      isLoadingFile: false,
    };
  },
});

export default reducer;
