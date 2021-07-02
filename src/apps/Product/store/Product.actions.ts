import { amlCheckInit } from 'apps/Aml/state/Aml.actions';
import { documentVerificationInit } from 'apps/documentVerification/state/DocumentVerification.actions';
import { ipCheckInit } from 'apps/IpCheck/state/IpCheck.actions';
import { reVerificationInit } from 'apps/reverification/state/ReVerification.actions';
import { compact } from 'lodash';
import { storeAction } from 'state/store.utils';
import { ProductTypes } from 'models/Product.model';
import { biometricVerificationInit } from 'apps/biometricVerification/state/BiometricVerification.actions';
import { govCheckInit } from 'apps/GovCheck/state/GovCheck.actions';
import { deviceFingerprintInit } from 'apps/DeviceFingerPrint/state/deviceFingerprint.actions';
import { ProductActionTypes } from './Product.store';
import { metadataInit } from '../../metadata/state/Metadata.actions';

export const productIsInitedUpdate = storeAction<boolean>(ProductActionTypes.ProductIsInitedUpdate);
export const productRegisteredUpdate = storeAction<string[]>(ProductActionTypes.ProductRegistered);

export const productInit = () => (dispatch) => {
  const registered: ProductTypes[] = [
    dispatch(ipCheckInit()),
    dispatch(documentVerificationInit()),
    dispatch(reVerificationInit()),
    dispatch(amlCheckInit()),
    dispatch(biometricVerificationInit()),
    dispatch(govCheckInit()),
    dispatch(deviceFingerprintInit()),
    dispatch(metadataInit()),
  ];
  dispatch(productRegisteredUpdate(compact(registered)));
  dispatch(productIsInitedUpdate(true));
};
