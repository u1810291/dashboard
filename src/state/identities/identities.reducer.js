import { isEmpty } from 'lodash';
import { createReducer } from 'state/utils';
import { types } from './identities.actions';
import { buildInitialMonthlyIdentities, computeMonthlyStatisticsForIdentities, normalizeCURPData } from './identities.helpers';

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
