import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { selectCanUsePayrollAccountDataFlow } from './PayrollAccountData.selectors';
import { PayrollAccountData } from '../services/PayrollAccountData.service';

export const payrollAccountDataInit = () => (dispatch, getState): ProductTypes | null => {
  const isCanUsePayrollAccountDataFlow = selectCanUsePayrollAccountDataFlow(getState());

  if (!isCanUsePayrollAccountDataFlow) {
    return null;
  }

  const payrollAccountData = new PayrollAccountData();
  productManagerService.register(payrollAccountData);
  return payrollAccountData.id;
};
