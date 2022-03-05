import { flowBuilderProductListInit, types as flowBuilderTypes, selectFlowBuilderChangeableFlow } from 'apps/flowBuilder';
import { merchantCreateFlow, merchantFlowsLoad, types as merchantTypes } from 'state/merchant/merchant.actions';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { IFlow } from 'models/Flow.model';
import { ApiResponse } from 'models/Client.model';
import { flowUpdate } from 'apps/flowBuilder/api/flowBuilder.client';
import { mergeDeep } from 'lib/object';
import { FormatMessage } from 'apps/intl';
import { types as flowBuilderActionTypes } from 'apps/flowBuilder/store/FlowBuilder.action';
import { notification } from 'apps/ui';
import { DRAFT_INITIAL_STATE } from '../model/Templates.model';
import {
  selectCurrentTemplateModelValue,
  selectTemplatesListModel,
  selectTemplatesListModelValues,
} from './Templates.selectors';
import { types } from './Templates.store';
import {
  createTemplateRequest,
  getMetadataRequest,
  getTemplateRequest,
  updateTemplateRequest,
  getTemplatesRequest,
  blockTemplateRequest,
  getTemplatesListRequest,
  toggleTemplateRequest,
} from '../api/Templates.client';

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
    dispatch({ type: types.GET_TEMPLATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATES_FAILURE, error });
    throw error;
  }
};

export const getTemplatesList = () => async (dispatch) => {
  dispatch({ type: types.GET_TEMPLATES_LIST_UPDATING });

  try {
    const { data } = await getTemplatesListRequest();
    dispatch({ type: types.GET_TEMPLATES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATES_LIST_FAILURE, error });
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
    const { value } = selectTemplatesListModel(state);
    const { data } = await createTemplateRequest(title, description, metadata, { ...flow, name });
    dispatch({ type: types.CREATE_TEMPLATE_SUCCESS, payload: data });
    // @ts-ignore
    dispatch({ type: types.GET_TEMPLATES_LIST_SUCCESS, payload: { ...value, rows: [data, ...value.rows] } });
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
    const templatesList = selectTemplatesListModelValues(getState());
    const newTemplatesListRows = templatesList.rows.filter((template) => template._id !== _id);
    const newTemplatesList = { ...templatesList, rows: newTemplatesListRows };
    dispatch({ type: types.GET_TEMPLATES_LIST_SUCCESS, payload: newTemplatesList });
  } catch (error) {
    dispatch({ type: types.BLOCK_TEMPLATE_FAILURE, payload: error });
  }
};

// @ts-ignore
export const toggleTemplate = (id: string, blocked?: boolean, formatMessage: FormatMessage) => async (dispatch, getState) => {
  dispatch({ type: types.TOGGLE_TEMPLATE_UPDATING });
  const toggle = blocked ? 'unblock' : 'block';

  try {
    const { data } = await toggleTemplateRequest(id, toggle);
    const templatesList = selectTemplatesListModelValues(getState());
    const toggleTemplateIndex = templatesList.rows.findIndex((template) => template._id === data._id);
    if (toggleTemplateIndex >= 0) templatesList.rows[toggleTemplateIndex] = data;
    dispatch({ type: types.GET_TEMPLATES_LIST_SUCCESS, payload: templatesList });
    notification.info(formatMessage('Template.templateList.changeStatus'));
  } catch (error) {
    dispatch({ type: types.TOGGLE_TEMPLATE_FAILURE, payload: error });
    notification.error(formatMessage(`Settings.teamSettings.submit.${error.response?.data?.name}`, { defaultMessage: formatMessage('Error.common') }));
  }
};

export const createDraftFromTemplate = () => async (dispatch, getState) => {
  const template = await selectCurrentTemplateModelValue(getState());
  dispatch(flowBuilderProductListInit(template.flow));
  dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: { ...template.flow, ...DRAFT_INITIAL_STATE } });
};

export const createFlowFromTemplate = (name: string, asMerchantId) => async (dispatch, getState): Promise<IFlow> => {
  try {
    const merchantId = selectMerchantId(getState());
    const newFlow = await dispatch(merchantCreateFlow({ name })) as IFlow;
    const changeableFlow = selectFlowBuilderChangeableFlow(getState());
    const { data }: ApiResponse<IFlow> = await flowUpdate(merchantId, newFlow.id, {
      ...{ ...changeableFlow, name },
      _id: undefined,
      createdAt: undefined,
      id: undefined,
      updatedAt: undefined,
      pinnedCountries: undefined,
      inputTypes: undefined,
    });

    const updatedFlow = mergeDeep(changeableFlow, data);
    await dispatch({ type: flowBuilderActionTypes.CHANGEABLE_FLOW_SUCCESS, payload: data, isReset: true });
    await dispatch({ type: flowBuilderActionTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
    await dispatch({ type: merchantTypes.FLOWS_SUCCESS, payload: [], isReset: true });
    await dispatch(merchantFlowsLoad(asMerchantId));
    return updatedFlow;
  } catch (error) {
    return error;
  }
};
