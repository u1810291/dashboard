import * as api from 'lib/client/merchant';
import { createTypesSequence } from 'state/store.utils';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';

export const types: any = {
  ...createTypesSequence('FLOW_BUILDER_SDK_LOGO'),
};

export const flowBuilderSDKMediaUpdate = (form: FormData) => async (dispatch) => {
  dispatch({ type: types.FLOW_BUILDER_SDK_LOGO_UPDATING });

  try {
    const { data } = await api.uploadMerchantMedia(form);
    dispatch(flowBuilderChangeableFlowUpdate({ logo: data }));
  } catch (error) {
    dispatch({ type: types.FLOW_BUILDER_SDK_LOGO_FAILURE, error });
    throw error;
  }
};
