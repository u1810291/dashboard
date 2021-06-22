import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { productManagerService, selectProductRegistered } from 'apps/Product';
import { mergeDeep } from 'lib/object';
import { cloneDeep } from 'lodash';
import { IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/store.utils';
import { FlowBuilderActionGroups } from './FlowBuilder.store';

export const types: any = {
  ...createTypesSequence(FlowBuilderActionGroups.ProductsInGraph),
  ...createTypesSequence(FlowBuilderActionGroups.ChangeableFlow),
  SET_HAVE_UNSAVED_CHANGES: 'SET_HAVE_UNSAVED_CHANGES',
  PRODUCT_SELECT: 'PRODUCT_SELECT',
};

export const flowBuilderProductSelect = (productId: ProductTypes) => (dispatch) => {
  dispatch({ type: types.PRODUCT_SELECT, payload: productId });
};

export const flowBuilderProductAdd = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectFlowBuilderProductsInGraphModel(getState());
  if (value.includes(productId)) {
    return;
  }
  const payload = [...value];
  payload.push(productId);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload: productManagerService.sortProductTypes(payload) });
};

export const flowBuilderProductListClear = () => (dispatch) => {
  dispatch({ type: types.PRODUCTS_IN_GRAPH_CLEAR, payload: [] });
};

export const flowBuilderProductListInit = (flow) => (dispatch, getState) => {
  const registered = selectProductRegistered(getState());
  const activated = registered.filter((item) => {
    const product = productManagerService.getProduct(item);
    if (!product) {
      return false;
    }
    return product.isInGraph(flow);
  });
  const sorted = productManagerService.sortProductTypes(activated);

  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, payload: sorted });
};

export const flowBuilderChangeableFlowLoad = () => (dispatch, getState) => {
  const state = getState();
  const flow = selectCurrentFlow(state);
  dispatch({ type: types.CHANGEABLE_FLOW_UPDATING });
  try {
    const changeableFlow = cloneDeep(flow);
    dispatch(flowBuilderProductListInit(flow));
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: changeableFlow });
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
    // @ts-ignore
    dispatch({ type: types.CHANGEABLE_FLOW_SUCCESS, payload: updatedFlow, isReset: true });
  } catch (error) {
    // @ts-ignore
    dispatch({ type: types.CHANGEABLE_FLOW_FAILURE, error });
    throw error;
  }
};

export const flowBuilderProductRemove = (productId: ProductTypes) => (dispatch, getState) => {
  const { value } = selectFlowBuilderProductsInGraphModel(getState());
  const payload = value.filter((item) => item !== productId);
  dispatch({ type: types.PRODUCTS_IN_GRAPH_SUCCESS, isReset: true, payload });
  dispatch(flowBuilderChangeableFlowUpdate(productManagerService.getProduct(productId).getNullishValues()));
};

export const flowBuilderSaveAndPublish = () => async (dispatch, getState) => {
  const changeableFlow = await selectFlowBuilderChangeableFlow(getState());
  const changeableFlowToPatch = {
    ...changeableFlow,
    createdAt: undefined,
    id: undefined,
    updatedAt: undefined,
    pinnedCountries: undefined,
    inputTypes: undefined,
  };
  dispatch(merchantUpdateFlow(changeableFlowToPatch));
};
