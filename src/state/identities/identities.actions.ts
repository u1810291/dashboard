import { notification } from 'apps/ui';
import * as api from 'lib/client/identities';
import { get } from 'lodash';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { filterSerialize } from 'models/Filter.model';
import { Dispatch } from 'redux';
import { EMAIL_REG_EXP_FOR_FORMATTING, formatFragmentWithQuotes, TEXT_WITH_DASHES } from 'lib/validations';
import { createTypesSequence, TypesSequence } from '../store.utils';
import { selectIdentityFilterSerialized, selectIdentityModel } from './identities.selectors';
import { IdentityActionGroups } from './identities.store';

export const types: TypesSequence = {
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),

  ...createTypesSequence(IdentityActionGroups.Identity),
  ...createTypesSequence(IdentityActionGroups.IdentityList),
  ...createTypesSequence(IdentityActionGroups.FilteredCount),
  ...createTypesSequence(IdentityActionGroups.PreliminaryFilteredCount),

  FILTER_UPDATE: 'identities/FILTER_UPDATE',
  IDENTITY_REMOVE: 'IDENTITY_REMOVE',
  SET_PDF_GENERATING: 'SET_PDF_GENERATING',
  PDF_DOWNLOADED: 'PDF_DOWNLOADED',
};

export const verificationsListLoad = (isReload: boolean, params?: { offset: number; asMerchantId: string }) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.IDENTITY_LIST_REQUEST : types.IDENTITY_LIST_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const formattedFilter = { ...filter, ...(filter?.search && ({ search: formatFragmentWithQuotes(filter.search as string, [TEXT_WITH_DASHES, EMAIL_REG_EXP_FOR_FORMATTING]) })) };
    const { data } = await api.getVerifications({ ...formattedFilter, ...params });
    dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload: data || [], isReset: isReload });
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationsPreliminaryCountLoad = (localFilter) => async (dispatch, getState) => {
  dispatch({ type: types.PRELIMINARY_FILTERED_COUNT_UPDATING });
  try {
    const filter = localFilter ? filterSerialize(localFilter) : selectIdentityFilterSerialized(getState());
    const { data } = await api.getVerificationsCount(filter);
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_SUCCESS,
      payload: data || 0,
    });
  } catch (error) {
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const downloadVerificationCSV = () => async (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return api.downloadVerificationCSV({
      // TODO @dkchv: review again, do we need filter here?
      ...filter,
      format: 'csv',
    });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    return null;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const downloadCSV = () => (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return api.downloadCSV({
      // TODO @dkchv: review again, do we need filter here?
      ...filter,
      format: 'csv',
    });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    return null;
  }
};

export const filterUpdate = (data) => (dispatch) => {
  dispatch({ type: types.FILTER_UPDATE, payload: data });
};

export const identityRemove = (id) => async (dispatch) => {
  try {
    await api.deleteIdentity(id);
    dispatch({ type: types.IDENTITY_REMOVE, payload: id });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// identity

export const identityListClear = () => (dispatch) => {
  dispatch({ type: types.IDENTITY_LIST_CLEAR, payload: [] });
};

export const setPDFGenerating = (flag) => ({ type: types.SET_PDF_GENERATING, payload: flag });

export const pdfDownloaded = (identityId, verificationId) => async (dispatch) => {
  try {
    await api.postPdfDownloaded(identityId, verificationId);
    dispatch({ type: types.PDF_DOWNLOADED });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    console.error('post pdfDownloaded event error', error);
  }
};

export const verificationDocumentUpdate = (verificationId: string, documentType, fields) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    await api.patchVerificationDocument(verificationId, documentType, fields);
    const identityModel = selectIdentityModel(getState());
    const documents = get(identityModel.value, '_embedded.verification.documents', []);
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    newDocuments[documentIndex].fields = { ...newDocuments[documentIndex].fields, ...fields };

    const newIdentity = {
      ...identityModel.value,
      _embedded: {
        ...identityModel.value._embedded,
        verification: {
          ...identityModel.value._embedded.verification,
          documents: newDocuments,
        },
      },
    };

    dispatch({
      type: types.IDENTITY_SUCCESS,
      payload: newIdentity,
    });
  } catch (error) {
    dispatch({
      type: types.IDENTITY_FAILURE,
      error,
    });
    if (isInReviewModeError(error)) {
      notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ErrorMessages.ERROR_COMMON);
    }
    throw error;
  }
};
