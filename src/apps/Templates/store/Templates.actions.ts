import { flowBuilderProductListInit, types as flowBuilderTypes, selectFlowBuilderChangeableFlow, flowUpdate, changeableFlowPost } from 'apps/flowBuilder';
import { merchantCreateFlow, merchantFlowsLoad, types as merchantTypes } from 'state/merchant/merchant.actions';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { createEmptyFlow, IFlow } from 'models/Flow.model';
import { ApiResponse } from 'models/Client.model';
import { mergeDeep } from 'lib/object';
import { FormatMessage } from 'apps/intl';
import { notification } from 'apps/ui';
import { Routes } from 'models/Router.model';
import { DRAFT_INITIAL_STATE } from '../model/Templates.model';
import {
  selectCurrentTemplateModelValue,
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

export const toggleTemplateApplying = (payload) => (dispatch) => {
  dispatch({ type: types.TOGGLE_TEMPLATE_APPLYING, payload });
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
    const { data } = await createTemplateRequest(title, description, metadata, { ...flow, name });
    dispatch({ type: types.CREATE_TEMPLATE_SUCCESS, payload: data });
    dispatch(getTemplatesList());
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
    await dispatch(getTemplatesList());
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

export const toggleUnsavedChanges = (value: boolean) => (dispatch) => {
  dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: value });
};

export const templateChoose = (id: string) => async (dispatch, closeOverlay, history) => {
  try {
    await dispatch(getTemplate(id));
    dispatch(toggleUnsavedChanges(true));
    history.push(Routes.templates.draftFlow);
    closeOverlay();
  } catch (error) {
    console.warn(error);
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

export const toggleTemplate = (id: string, blocked: boolean, formatMessage: FormatMessage) => async (dispatch, getState) => {
  dispatch({ type: types.TOGGLE_TEMPLATE_UPDATING });
  const toggle = blocked ? 'unblock' : 'block';

  try {
    const { data } = await toggleTemplateRequest(id, toggle);
    const templatesList = selectTemplatesListModelValues(getState());
    const toggleTemplateIndex = templatesList.rows.findIndex((template) => template._id === data._id);
    if (toggleTemplateIndex >= 0) templatesList.rows[toggleTemplateIndex] = data;
    dispatch({ type: types.GET_TEMPLATES_LIST_SUCCESS, payload: templatesList });
    notification.info(formatMessage('Template.templateList.changeStatus'));
  } catch (error: any) {
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
  await dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: data, isReset: true });
  await dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
  await dispatch({ type: merchantTypes.FLOWS_SUCCESS, payload: [], isReset: true });
  await dispatch(merchantFlowsLoad(asMerchantId));
  return updatedFlow;
};

export const templateBuilderGetTemporaryFlowId = () => async (_, getState): Promise<string> => {
  const changeableFlow = selectFlowBuilderChangeableFlow(getState());
  const { data }: ApiResponse<{ _id: string }> = await changeableFlowPost({
    ...changeableFlow,
    id: changeableFlow._id,
    name: `${changeableFlow.name} (preview)`,
  });
  return data?._id;
};

export const templateBuilderSaveAndPublishSettings = (payload) => async (dispatch, getState) => {
  const state = getState();
  const flow = selectFlowBuilderChangeableFlow(state);
  const { _id } = selectCurrentTemplateModelValue(state);
  const { data } = await updateTemplateRequest({ id: _id, flow: { ...flow, ...payload } });
  dispatch({ type: types.UPDATE_TEMPLATE_SUCCESS, payload: data });
};

export const flowBuilderApplyTemplate = (changes: Partial<IFlow>) => (dispatch, getState) => {
  const state = getState();
  const changeableFlow = selectFlowBuilderChangeableFlow(state);
  dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
  try {
    const updatedFlow = mergeDeep(changeableFlow, changes);
    dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: true });
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: updatedFlow, isReset: true });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};

export const loadAndApplyTemplateToMetamap = (templateId: string) => async (dispatch) => {
  try {
    dispatch(toggleTemplateApplying(true));
    const { flow } = await dispatch(getTemplate(templateId));
    const { _id, name, ...fixedTemplateFlow } = flow;
    dispatch(flowBuilderProductListInit(createEmptyFlow(), true));
    dispatch(flowBuilderProductListInit(fixedTemplateFlow, true));
    dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: fixedTemplateFlow });
    dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: true });
  } finally {
    dispatch(toggleTemplateApplying(false));
  }
};
