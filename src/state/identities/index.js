import { isEmpty, toPairs, fromPairs } from 'lodash';
import { createReducer, createTypesSequence } from 'state/utils';

import client from 'lib/client';
import { notification } from 'components/notification';
import {
  buildInitialMonthlyIdentities,
  computeMonthlyStatisticsForIdentities,
} from './analytics';

window.client = client;

export const types = {
  ...createTypesSequence('IDENTITY_LIST'),
  ...createTypesSequence('IDENTITY_COUNT'),
  ...createTypesSequence('IDENTITY_FETCH'),
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DELETE'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),
  ...createTypesSequence('IDENTITY_LIST_COUNT'),
  ...createTypesSequence('IDENTITY_DOWNLOAD'),
};

export function getIdentityListCount(token) {
  return function handle(dispatch) {
    return client.identities
      .getIdentityListCount(token)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_LIST_COUNT_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_LIST_COUNT_FAILURE });
        throw error;
      });
  };
}

export function getIdentities(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_LIST_REQUEST });
    return client.identities
      .getIdentities(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_LIST_FAILURE });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

export function getIdentitiesFile(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_DOWNLOAD_REQUEST });
    return client.identities
      .getIdentitiesFile(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_DOWNLOAD_SUCCESS });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_DOWNLOAD_FAILURE });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

export function getIdentitiesCount(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_COUNT_REQUEST });
    return client.identities
      .getIdentitiesCount(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_COUNT_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_COUNT_FAILURE });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

export function getIdentityWithNestedData(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_FETCH_REQUEST });
    return client.identities
      .getIdentityWithNestedData(token, id)
      .then((identity) => {
        dispatch({ type: types.IDENTITY_FETCH_SUCCESS, identity });
        return identity;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_FETCH_FAILURE });
        throw error;
      });
  };
}

export function getDemoVerification(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_FETCH_REQUEST });
    return client.identities
      .getVerificationData(token, id)
      .then((identity) => {
        dispatch({ type: types.IDENTITY_FETCH_SUCCESS, identity });
        return identity;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_FETCH_FAILURE });
        throw error;
      });
  };
}

export function patchIdentity(token, id, data) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_PATCH_REQUEST, payload: { id, data } });
    return client.identities
      .patchIdentity(token, id, data)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_PATCH_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_PATCH_FAILURE });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

export function deleteIdentity(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_DELETE_REQUEST, payload: { id } });
    return client.identities
      .deleteIdentity(token, id)
      .then(() => {
        dispatch({ type: types.IDENTITY_DELETE_SUCCESS, payload: { id } });
        return { payload: { id } };
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_DELETE_FAILURE, payload: { id } });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

export function patchDocument(token, identityId, id, fields) {
  return function handle(dispatch) {
    dispatch({
      type: types.DOCUMENT_PATCH_REQUEST,
      payload: { identityId, id, fields },
    });
    return client.identities
      .patchDocument(token, id, fields)
      .then((payload) => {
        dispatch({
          type: types.DOCUMENT_PATCH_SUCCESS,
          payload: { identityId, id, fields },
        });
        return payload;
      })
      .catch((error) => {
        dispatch({
          type: types.DOCUMENT_PATCH_FAILURE,
          payload: { identityId, id, fields },
        });
        notification.error('Something went wrong. Please retry');
        throw error;
      });
  };
}

const initialState = {
  isLoading: true,
  isLoadingFile: false,
  countIsLoading: true,
  patchIsLoading: false,
  patchError: false,
  patchingFields: [],
  erroredFields: [],
  deletingIdentities: [],
  identities: [],
  count: null,
  instances: {},
  monthlyIdentities: buildInitialMonthlyIdentities(12),
};

// FOR GOVCHECK DATA:
// turns `data: {key: value, ...}` to `data: {key: {value: value}, ...}`
// as we already have for document reading step
function normalizeCURPData(identity) {
  if (!identity._embedded || !identity._embedded.verification) return identity;
  return {
    ...identity,
    _embedded: {
      ...identity._embedded,
      verification: {
        ...identity._embedded.verification,
        documents: identity._embedded.verification.documents.map((doc) => ({
          ...doc,
          steps: doc.steps.map((step) => ({
            ...step,
            data:
              step.data && step.id === 'mexican-curp-validation'
                ? fromPairs(
                  toPairs(step.data).map(([key, value]) => [key, { value }]),
                )
                : step.data,
          })),
        })),
      },
    },
  };
}

const reducer = createReducer(initialState, {
  [types.IDENTITY_FETCH_SUCCESS](state, { identity }) {
    return {
      ...state,
      instances: {
        ...state.instances,
        [identity.id]: normalizeCURPData(identity),
      },
    };
  },

  [types.IDENTITY_LIST_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
    };
  },

  [types.IDENTITY_LIST_SUCCESS](state, { payload }) {
    const monthlyIdentities = isEmpty(payload.data)
      ? buildInitialMonthlyIdentities(12)
      : computeMonthlyStatisticsForIdentities(payload.data);

    return {
      ...state,
      isLoading: false,
      identities: payload.data,
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
  [types.IDENTITY_PATCH_REQUEST](state) {
    return {
      ...state,
      patchError: false,
      patchIsLoading: true,
    };
  },
  [types.IDENTITY_PATCH_SUCCESS](state, { payload }) {
    const identities = [].concat(state.identities);
    const instances = { ...state.instances };
    if (instances[payload.id]) {
      instances[payload.id].status = payload.data.status;
    }
    const identityToEdit = identities.find((identity) => identity.id === payload.id);
    if (identityToEdit) {
      identityToEdit.status = payload.data.status;
    }
    return {
      ...state,
      identities,
      patchIsLoading: false,
    };
  },
  [types.IDENTITY_PATCH_FAILURE](state) {
    return {
      ...state,
      patchIsLoading: false,
      patchError: true,
    };
  },
  [types.DOCUMENT_PATCH_REQUEST](state) {
    // let instances = { ...state.instances };
    const patchingFields = [].concat(state.patchingFields);
    const erroredFields = [].concat(state.erroredFields);

    // patchingFields.push({ docId: payload.id, id: payload.fields })
    // erroredFields = erroredFields.filter(erroredField => {
    //   return !(
    //     erroredField.docId === payload.id &&
    //     erroredField.id === payload.fields[0].id
    //   )
    // })
    return {
      ...state,
      patchingFields,
      erroredFields,
    };
  },
  [types.DOCUMENT_PATCH_SUCCESS](state) {
    const instances = { ...state.instances };
    const patchingFields = [].concat(state.patchingFields);
    // if (!instances[payload.identityId]) {
    //   return state;
    // }
    // let documentToEdit = instances[payload.identityId].documents.find(doc => {
    //   return doc.id === payload.id;
    // });
    // if (!documentToEdit) {
    //   return state;
    // }
    // documentToEdit.fields.forEach(docField => {
    //   payload.fields.forEach(fieldToEdit => {
    //     if (docField.id === fieldToEdit.id) {
    //       docField.value = fieldToEdit.value;
    //     }
    //   })
    // })
    // patchingFields = patchingFields.filter(patchingField => {
    //   return !(
    //     patchingField.docId === payload.id &&
    //     patchingField.id === payload.fields[0].id
    //   )
    // })
    return {
      ...state,
      instances,
      patchingFields,
    };
  },
  [types.DOCUMENT_PATCH_FAILURE](state) {
    // let instances = { ...state.instances }
    const erroredFields = [].concat(state.erroredFields);
    const patchingFields = [].concat(state.patchingFields);
    // if (!instances[payload.identityId]) return state
    // let documentToEdit = instances[payload.identityId].documents.find(doc => {
    //   return doc.id === payload.id
    // })
    // patchingFields = patchingFields.filter(patchingField => {
    //   return !(
    //     patchingField.docId === payload.id &&
    //     patchingField.id === payload.fields[0].id
    //   )
    // })
    // erroredFields.push({ docId: documentToEdit.id, id: payload.fields[0].id })
    return {
      ...state,
      patchingFields,
      erroredFields,
    };
  },
  [types.IDENTITY_DELETE_REQUEST](state, { payload }) {
    const deletingIdentities = [].concat(state.deletingIdentities);
    deletingIdentities.push(payload.id);
    return {
      ...state,
      deletingIdentities,
    };
  },
  [types.IDENTITY_DELETE_SUCCESS](state, { payload }) {
    let identities = [].concat(state.identities);
    let deletingIdentities = [].concat(state.deletingIdentities);
    identities = identities.filter(
      (identity) => identity.identity.id !== payload.id,
    );
    deletingIdentities = deletingIdentities.filter((id) => id !== payload.id);
    return {
      ...state,
      identities,
      deletingIdentities,
    };
  },
  [types.IDENTITY_DELETE_FAILURE](state, { payload }) {
    let deletingIdentities = [].concat(state.deletingIdentities);
    deletingIdentities = deletingIdentities.filter((id) => id !== payload.id);
    return {
      ...state,
      deletingIdentities,
    };
  },
  [types.IDENTITY_LIST_COUNT_SUCCESS](state, { payload }) {
    return {
      ...state,
      count: payload.data,
    };
  },
  [types.IDENTITY_DOWNLOAD_REQUEST](state) {
    return {
      ...state,
      isLoadingFile: true,
    };
  },
  [types.IDENTITY_DOWNLOAD_SUCCESS](state) {
    return {
      ...state,
      isLoadingFile: false,
    };
  },
  [types.IDENTITY_DOWNLOAD_FAILURE](state) {
    return {
      ...state,
      isLoadingFile: false,
    };
  },
});

export default reducer;
