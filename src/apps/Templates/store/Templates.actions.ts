import { types } from './Templates.store';
import { getMetadataRequest } from '../api/Templates.client';

export const clearCurrentTemplate = () => ({ type: types.GET_TEMPLATE_CLEAR, payload: null });

export const getMetadata = () => async (dispatch) => {
  dispatch({ type: types.GET_METADATA_LIST_UPDATING });

  try {
    const response = await getMetadataRequest();
    dispatch({ type: types.GET_METADATA_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_METADATA_LIST_FAILURE, error });
    throw error;
  }
};
