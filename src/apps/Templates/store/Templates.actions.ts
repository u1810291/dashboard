import { flowBuilderProductListInit, types as flowBuilderTypes, selectFlowBuilderChangeableFlow } from 'apps/flowBuilder';
import { types as merchantActionTypes } from 'state/merchant/merchant.actions';
import { selectMerchantFlowList, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { selectCurrentTemplateModelValue } from './Templates.selectors';
import { types } from './Templates.store';
import { createTemplateRequest, getMetadataRequest, getTemplateRequest, updateTemplateRequest, getTemplatesRequest, blockTemplateRequest } from '../api/Templates.client';

export const clearCurrentTemplate = () => ({ type: types.GET_TEMPLATE_CLEAR, payload: null });

export const prepareTemplateToEdit = () => (dispatch, getState) => {
  const template = selectCurrentTemplateModelValue(getState());
  dispatch(flowBuilderProductListInit(template.flow));
  dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: template.flow });
};

export const getTemplates = () => async (dispatch) => {
  dispatch({ type: types.GET_TEMPLATES_UPDATING });

  try {
    const { data } = await getTemplatesRequest();
    console.log(data);
    dispatch({ type: types.GET_TEMPLATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATES_FAILURE, error });
    throw error;
  }
};

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

export const createTemplate = (title, name, description, metadata) => async (dispatch, getState) => {
  dispatch({ type: types.CREATE_TEMPLATE_UPDATING });
  try {
    const state = getState();
    const flow = selectFlowBuilderChangeableFlow(state);
    const { value } = selectMerchantFlowsModel(state);
    const { data } = await createTemplateRequest(title, description, metadata, { ...flow, name });
    dispatch({ type: types.CREATE_TEMPLATE_SUCCESS, payload: data });
    dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
    // @ts-ignore
    dispatch({ type: merchantActionTypes.FLOWS_SUCCESS, payload: [...value, data.flow], isReset: true });
  } catch (error) {
    dispatch({ type: types.CREATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const updateTemplate = (title?, name?, description?, metadata?) => async (dispatch, getState) => {
  dispatch({ type: types.UPDATE_TEMPLATE_UPDATING });

  try {
    const state = getState();
    const flow = selectFlowBuilderChangeableFlow(state);
    const { _id } = selectCurrentTemplateModelValue(state);
    const changedFlow = title ? { ...flow, name: title } : flow;
    const { data } = await updateTemplateRequest({ id: _id, name, description, flow: changedFlow, metadata });
    dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
    dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: data.flow });
    dispatch({ type: types.UPDATE_TEMPLATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const getTemplate = (id: string) => async (dispatch) => {
  dispatch({ type: types.GET_TEMPLATE_UPDATING });
  try {
    const { data } = await getTemplateRequest(id);
    dispatch({ type: types.GET_TEMPLATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const blockTemplate = (id: string) => async (dispatch, getState) => {
  dispatch({ type: types.BLOCK_TEMPLATE_UPDATING });

  try {
    const { data: { _id } } = await blockTemplateRequest(id);
    const flowList = selectMerchantFlowList(getState());
    const newTemplatesList = flowList.filter((flow) => flow.id !== _id);
    // @ts-ignore
    dispatch({ type: merchantActionTypes.FLOWS_SUCCESS, payload: newTemplatesList, isReset: true });
  } catch (error) {
    dispatch({ type: types.BLOCK_TEMPLATE_FAILURE, payload: error });
  }
};
