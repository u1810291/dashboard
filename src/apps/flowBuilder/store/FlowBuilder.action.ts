import { productManagerService, selectProductRegistered } from 'apps/Product';
import { mergeDeep } from 'lib/object';
import { cloneDeep } from 'lodash';
import { ApiResponse } from 'models/Client.model';
import { createEmptyFlow, IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import { merchantDeleteFlow, merchantUpdateFlow, merchantUpdateFlowList } from 'state/merchant/merchant.actions';
import { selectCurrentFlow, selectMerchantId } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/store.utils';
import { subscribeToWebhook } from 'state/webhooks/webhooks.actions';
import { selectWebhook } from 'state/webhooks/webhooks.selectors';
import * as api from '../api/flowBuilder.client';
import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraphModel, selectFlowBuilderSelectedId } from './FlowBuilder.selectors';
import { FlowBuilderActionGroups } from './FlowBuilder.store';

export const types: any = {
  ...createTypesSequence(FlowBuilderActionGroups.ProductsInGraph),
  ...createTypesSequence(FlowBuilderActionGroups.ChangeableFlow),
  HAVE_UNSAVED_CHANGES_UPDATE: 'HAVE_UNSAVED_CHANGES_UPDATE',
  PRODUCT_SELECT: 'PRODUCT_SELECT',
};

export const flowBuilderProductSelect = (productId: ProductTypes) => (dispatch) => {
  dispatch({ type: types.PRODUCT_SELECT, payload: productId });
};

export const flowBuilderClearStore = () => (dispatch) => {
  dispatch({ type: types.PRODUCTS_IN_GRAPH_CLEAR, payload: [] });
  dispatch({ type: types.CHANGEABLE_FLOW_CLEAR, payload: {} });
  dispatch({ type: types.PRODUCT_SELECT, payload: null });
};

export const flowBuilderCreateEmptyFlow = (data?: Partial<IFlow>) => (dispatch) => {
  dispatch({ type: types.CHANGEABLE_FLOW_CLEAR, payload: createEmptyFlow(data) });
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, payload: [] });
};

export const flowBuilderProductListInit = (flow, isReset = false) => (dispatch, getState) => {
  const registered = selectProductRegistered(getState());
  const activated = registered.filter((item) => {
    const product = productManagerService.getProduct(item);
    if (!product) {
      return false;
    }
    return product.isInFlow(flow);
  });
  const sorted = productManagerService.sortProductTypes(activated);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, payload: sorted, isReset });
};

export const flowBuilderChangeableFlowLoad = () => (dispatch, getState) => {
  const state = getState();
  const flow = selectCurrentFlow(state);
  if (!flow) {
    return;
  }
  dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
  try {
    dispatch(flowBuilderProductListInit(flow));
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: cloneDeep(flow) });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};

export const flowBuilderChangeableFlowUpdate = (changes: Partial<IFlow>) => (dispatch, getState) => {
  const state = getState();
  const changeableFlow = selectFlowBuilderChangeableFlow(state);
  // @ts-ignore
  dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
  try {
    const updatedFlow = mergeDeep(changeableFlow, changes);
    dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: true });
    // @ts-ignore
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: updatedFlow, isReset: true });
  } catch (error) {
    // @ts-ignore
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};

export const flowBuilderProductAdd = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectFlowBuilderProductsInGraphModel(getState());
  if (value.includes(productId)) {
    return;
  }
  const payload = [...value, productId];
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload: productManagerService.sortProductTypes(payload) });
  dispatch(flowBuilderProductSelect(productId));
  dispatch(flowBuilderChangeableFlowUpdate(productManagerService.getProduct(productId).onAdd()));
};

export const flowBuilderProductRemove = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectFlowBuilderProductsInGraphModel(getState());
  const selectedId = selectFlowBuilderSelectedId(getState());
  const payload = value.filter((item) => item !== productId);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload });
  if (selectedId === productId) {
    dispatch(flowBuilderProductSelect(null));
  }
  const state = getState();
  const changeableFlow = selectFlowBuilderChangeableFlow(state);
  dispatch(flowBuilderChangeableFlowUpdate(productManagerService.getProduct(productId).onRemove(changeableFlow)));
};

export const flowBuilderGetTemporaryFlowId = () => async (dispatch, getState): Promise<string> => {
  const changeableFlow = selectFlowBuilderChangeableFlow(getState());
  const { data }: ApiResponse<{ _id: string }> = await api.changeableFlowPost({
    ...changeableFlow,
    name: `${changeableFlow.name} (preview)`,
  });
  return data?._id;
};

export const flowBuilderSubscribeToTemporaryWebhook = (temporaryFlowId: string) => async (dispatch, getState) => {
  const webhook = selectWebhook(getState());
  if (webhook.url) {
    await dispatch(subscribeToWebhook({ url: webhook.url, secret: webhook?.secret }, temporaryFlowId));
  }
};

export const flowBuilderSaveAndPublish = (name?: string) => async (dispatch, getState) => {
  const state = getState();
  const changeableFlow = await selectFlowBuilderChangeableFlow(state);
  dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
  try {
    const merchantId = selectMerchantId(state);
    const { data }: ApiResponse<IFlow> = await api.flowUpdate(merchantId, changeableFlow.id, {
      ...changeableFlow,
      name: name || changeableFlow.name,
      createdAt: undefined,
      id: undefined,
      updatedAt: undefined,
      pinnedCountries: undefined,
      inputTypes: undefined,
    });

    dispatch(merchantUpdateFlowList(changeableFlow.id, data));
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: data });
    dispatch({ type: types.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};

export const flowBuilderDelete = () => async (dispatch, getState) => {
  const state = getState();
  const flow = selectCurrentFlow(state);
  await dispatch(merchantDeleteFlow(flow.id));
};

export const flowBuilderSaveAndPublishSettings = (payload: Partial<IFlow>) => async (dispatch, getState) => {
  try {
    await dispatch(merchantUpdateFlow(payload));
    dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
    const state = getState();
    const changeableFlow = await selectFlowBuilderChangeableFlow(state);
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: { ...changeableFlow, ...payload } });
  } catch (error) {
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};
