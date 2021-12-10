import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantFlowsModel, selectMerchantModel } from 'state/merchant/merchant.selectors';
import { useEffect } from 'react';
import { useQuery } from 'lib/url';
import { merchantFlowsLoad } from 'state/merchant/merchant.actions';
import { LoadableAdapter } from 'lib/Loadable.adapter';

export function useFlowListLoad() {
  const dispatch = useDispatch();
  const flowListModel = useSelector(selectMerchantFlowsModel);
  const merchantModel = useSelector(selectMerchantModel);
  const { asMerchantId } = useQuery();

  useEffect(() => {
    (async () => {
      if (merchantModel.isLoaded && LoadableAdapter.isPristine(flowListModel)) {
        try {
          await dispatch(merchantFlowsLoad(asMerchantId));
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [asMerchantId, dispatch, flowListModel, merchantModel]);

  return flowListModel;
}
