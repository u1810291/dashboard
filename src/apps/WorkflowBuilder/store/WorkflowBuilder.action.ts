import { productManagerService, selectProductRegistered } from 'apps/Product';
import { mergeDeep } from 'lib/object';
import { cloneDeep } from 'lodash';
import { ApiResponse } from 'models/Client.model';
import { ProductTypes } from 'models/Product.model';
import { merchantDeleteFlow, merchantUpdateFlow, merchantUpdateFlowList } from 'state/merchant/merchant.actions';
import { createTypesSequence } from 'state/store.utils';
import { subscribeToWebhook } from 'state/webhooks/webhooks.actions';
import { selectWebhook } from 'state/webhooks/webhooks.selectors';
import { IWorkflow, WorkflowId } from 'models/Workflow.model';
import { selectCurrentFlowId, selectCurrentWorkflow } from 'pages/WorkflowList/state/workflow.selectors';
import * as api from '../api/workflowBuilder.client';
import { WorkFlowBuilderActionGroups } from './WorkflowBuilder.store';
import { selectWorkflowBuilderChangeableFlow, selectWorkflowBuilderLoadedWorkflow, selectWorkflowBuilderProductsInGraphModel } from './WorkflowBuilder.selectors';

export const types: any = {
  ...createTypesSequence(WorkFlowBuilderActionGroups.ProductsInGraph),
  ...createTypesSequence(WorkFlowBuilderActionGroups.ChangeableWorkflow),
  ...createTypesSequence(WorkFlowBuilderActionGroups.LoadedWorkflow),
  HAVE_UNSAVED_CHANGES_UPDATE: 'HAVE_UNSAVED_CHANGES_UPDATE',
  PRODUCT_SELECT: 'PRODUCT_SELECT',
};

export const workflowBuilderProductSelect = (productId: ProductTypes) => (dispatch) => {
  dispatch({ type: types.PRODUCT_SELECT, payload: productId });
};

export const workflowBuilderClearStore = () => (dispatch) => {
  dispatch({ type: types.PRODUCTS_IN_GRAPH_CLEAR, payload: [] });
  dispatch({ type: types.CHANGEABLE_WORKFLOW_CLEAR, payload: {} });
  dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
  dispatch({ type: types.PRODUCT_SELECT, payload: null });
};

export const workflowBuilderProductListInit = (flow) => (dispatch, getState) => {
  const registered = selectProductRegistered(getState());
  const activated = registered.filter((item) => {
    const product = productManagerService.getProduct(item);
    if (!product) {
      return false;
    }
    return product.isInFlow(flow);
  });
  const sorted = productManagerService.sortProductTypes(activated);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, payload: sorted });
};

export const workflowBuilderLoadWorkflow = (payload: WorkflowId) => async (dispatch) => {
  try {
    dispatch({ type: types.LOADED_WORKFLOW_REQUEST });
    const { data: workflow } = await api.getWorkflow(payload);
    dispatch({ type: types.LOADED_WORKFLOW_SUCCESS, payload: workflow });
  } catch (error) {
    dispatch({ type: types.LOADED_WORKFLOW_FAILURE, error });
    throw error;
  }
};

export const workflowBuilderChangeableFlowLoad = () => (dispatch, getState) => {
  const state = getState();
  const { workflow } = selectWorkflowBuilderLoadedWorkflow(state);
  if (!workflow) {
    return;
  }
  dispatch({ type: types.CHANGEABLE_WORKFLOW_UPDATING });
  try {
    dispatch(workflowBuilderProductListInit(workflow));
    dispatch({ type: types.CHANGEABLE_WORKFLOW_SUCCESS, payload: cloneDeep(workflow) });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_WORKFLOW_FAILURE, error });
    throw error;
  }
};

export const workflowBuilderChangeableFlowUpdate = (changes: Partial<IWorkflow>) => (dispatch, getState) => {
  const state = getState();
  const changeableFlow = selectWorkflowBuilderChangeableFlow(state);
  dispatch({ type: types.CHANGEABLE_WORKFLOW_UPDATING });
  try {
    const updatedFlow = mergeDeep(changeableFlow, changes);
    dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: true });
    dispatch({ type: types.CHANGEABLE_WORKFLOW_SUCCESS, payload: updatedFlow, isReset: true });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_WORKFLOW_FAILURE, error });
    throw error;
  }
};

export const workflowBuilderProductAdd = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectWorkflowBuilderProductsInGraphModel(getState());
  const changeableFlow = selectWorkflowBuilderChangeableFlow(getState());
  if (value.includes(productId)) {
    return;
  }
  const payload = [...value, productId];
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload: productManagerService.sortProductTypes(payload) });
  dispatch(workflowBuilderProductSelect(productId));
  dispatch(workflowBuilderChangeableFlowUpdate(productManagerService.getProduct(productId).onAdd(changeableFlow)));
};

export const workflowBuilderProductRemove = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectWorkflowBuilderProductsInGraphModel(getState());
  const selectedId = selectCurrentFlowId(getState());
  const payload = value.filter((item) => item !== productId);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload });
  if (selectedId === productId) {
    dispatch(workflowBuilderProductSelect(null));
  }
  const state = getState();
  const changeableFlow = selectWorkflowBuilderChangeableFlow(state);
  dispatch(workflowBuilderChangeableFlowUpdate(productManagerService.getProduct(productId).onRemove(changeableFlow)));
};

export const workflowBuilderGetTemporaryFlowId = () => async (dispatch, getState): Promise<string> => {
  const changeableFlow = selectWorkflowBuilderChangeableFlow(getState());
  const { data }: ApiResponse<{ _id: string }> = await api.changeableFlowPost({
    ...changeableFlow,
    name: `${changeableFlow.name} (preview)`,
  });
  return data?._id;
};

export const workflowBuilderSubscribeToTemporaryWebhook = (temporaryFlowId: string) => async (dispatch, getState) => {
  const webhook = selectWebhook(getState());
  if (webhook.url) {
    await dispatch(subscribeToWebhook({ url: webhook.url, secret: webhook?.secret }, temporaryFlowId));
  }
};

export const workflowBuilderSaveAndPublish = () => async (dispatch, getState) => {
  const state = getState();
  const changeableFlow = await selectWorkflowBuilderChangeableFlow(state);
  dispatch({ type: types.CHANGEABLE_WORKFLOW_UPDATING });
  try {
    const { data }: ApiResponse<IWorkflow> = await api.flowUpdate(changeableFlow.id, {
      ...changeableFlow,
      createdDate: undefined,
      id: undefined,
      updatedDate: undefined,
    });

    dispatch(merchantUpdateFlowList(changeableFlow.id, data));
    dispatch({ type: types.CHANGEABLE_WORKFLOW_SUCCESS, payload: data });
    dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_WORKFLOW_FAILURE, error });
    throw error;
  }
};

export const workflowBuilderDelete = () => async (dispatch, getState) => {
  const state = getState();
  const flow = selectCurrentWorkflow(state);
  await dispatch(merchantDeleteFlow(flow.id));
};

export const workflowBuilderSaveAndPublishSettings = (payload: Partial<IWorkflow>) => async (dispatch, getState) => {
  try {
    await dispatch(merchantUpdateFlow(payload));
    dispatch({ type: types.CHANGEABLE_WORKFLOW_UPDATING });
    const state = getState();
    const changeableFlow = await selectWorkflowBuilderChangeableFlow(state);
    dispatch({ type: types.CHANGEABLE_WORKFLOW_SUCCESS, payload: { ...changeableFlow, ...payload } });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_WORKFLOW_FAILURE, error });
    throw error;
  }
};
