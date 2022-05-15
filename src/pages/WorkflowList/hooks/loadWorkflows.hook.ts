import { selectMerchantModel } from 'state/merchant/merchant.selectors';
import { useQuery } from 'lib/url';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectWorkflowsModel } from '../state/workflow.selectors';
import { workflowsLoad } from '../state/workflow.actions';

export function useWorkflowListLoad() {
  const dispatch = useDispatch();
  const flowListModel = useSelector(selectWorkflowsModel);
  const merchantModel = useSelector(selectMerchantModel);
  const { asMerchantId } = useQuery();

  useEffect(() => {
    (async () => {
      if (merchantModel.isLoaded && LoadableAdapter.isPristine(flowListModel)) {
        try {
          await dispatch(workflowsLoad(asMerchantId));
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [asMerchantId, dispatch, flowListModel, merchantModel]);

  return flowListModel;
}
