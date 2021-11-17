import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { selectCanUseBankAccountDataFlow } from './BankAccountData.selectors';
import { BankAccountData } from '../services/BankAccountData.service';

export const bankAccountDataInit = () => (dispatch, getState): ProductTypes | null => {
  const isCanUseBankAccountDataFlow = selectCanUseBankAccountDataFlow(getState());

  if (!isCanUseBankAccountDataFlow) {
    return null;
  }

  const bankAccountData = new BankAccountData();
  productManagerService.register(bankAccountData);
  return bankAccountData.id;
};
