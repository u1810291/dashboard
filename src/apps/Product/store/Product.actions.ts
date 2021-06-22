import { documentVerificationInit } from 'apps/documentVerification/state/DocumentVerification.actions';
import { ipCheckInit } from 'apps/ipCheck/state/IpCheck.actions';
import { compact } from 'lodash';
import { storeAction } from 'state/store.utils';
import { ProductTypes } from 'models/Product.model';
import { ProductActionTypes } from './Product.store';

export const productIsInitedUpdate = storeAction<boolean>(ProductActionTypes.ProductIsInitedUpdate);
export const productRegisteredUpdate = storeAction<string[]>(ProductActionTypes.ProductRegistered);

export const productInit = () => (dispatch) => {
  const registered: ProductTypes[] = [
    dispatch(ipCheckInit()),
    dispatch(documentVerificationInit()),
  ];
  dispatch(productRegisteredUpdate(compact(registered)));
  dispatch(productIsInitedUpdate(true));
};
