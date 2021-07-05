import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { selectCanUseReverificationFlow } from './ReVerification.selectors';
import { ReVerification } from '../services/ReVerification.service';

export const reVerificationInit = () => (dispatch, getState): ProductTypes | null => {
  const isCanUseReverificationFlow = selectCanUseReverificationFlow(getState());

  if (!isCanUseReverificationFlow) {
    return null;
  }

  const reVerification = new ReVerification();
  productManagerService.register(reVerification);
  return reVerification.id;
};
