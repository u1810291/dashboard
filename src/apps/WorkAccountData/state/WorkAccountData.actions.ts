import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { selectCanUseWorkAccountDataFlow } from './WorkAccountData.selectors';
import { WorkAccountData } from '../services/WorkAccountData.service';

export const workAccountDataInit = () => (dispatch, getState): ProductTypes | null => {
  const isCanUseWorkAccountDataFlow = selectCanUseWorkAccountDataFlow(getState());

  if (!isCanUseWorkAccountDataFlow) {
    return null;
  }

  const workAccountData = new WorkAccountData();
  productManagerService.register(workAccountData);
  return workAccountData.id;
};
