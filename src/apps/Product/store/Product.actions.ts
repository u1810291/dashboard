import { amlCheckInit } from 'apps/Aml/state/Aml.actions';
import { documentVerificationInit } from 'apps/documentVerification/state/DocumentVerification.actions';
import { ipCheckInit } from 'apps/IpCheck/state/IpCheck.actions';
import { EmailCheckInit } from 'apps/EmailCheck/state/EmailCheck.actions';
import { PhoneCheckInit } from 'apps/PhoneCheck/state/PhoneCheck.actions';
import { reVerificationInit } from 'apps/reverification/state/ReVerification.actions';
import { compact } from 'lodash';
import { storeAction } from 'state/store.utils';
import { ProductTypes } from 'models/Product.model';
import { biometricVerificationInit } from 'apps/biometricVerification/state/BiometricVerification.actions';
import { govCheckInit } from 'apps/GovCheck/state/GovCheck.actions';
import { creditCheckInit } from 'apps/CreditCheck/state/CreditCheck.actions';
import { deviceFingerprintInit } from 'apps/DeviceFingerPrint/state/deviceFingerprint.actions';
import { customDocumentInit } from 'apps/customDocument/state/customDocument.actions';
import { eSignatureInit } from 'apps/ESignature/state/eSignature.actions';
import { ProductActionTypes } from './Product.store';
import { metadataInit } from '../../metadata/state/Metadata.actions';
import { certifiedTimestampInit } from '../../CertifiedTimestamp/state/CertifiedTimestamp.actions';

export const productIsInitedUpdate = storeAction<boolean>(ProductActionTypes.ProductIsInitedUpdate);
export const productRegisteredUpdate = storeAction<string[]>(ProductActionTypes.ProductRegistered);

export const productInit = () => (dispatch) => {
  const registered: ProductTypes[] = [
    dispatch(ipCheckInit()),
    dispatch(EmailCheckInit()),
    dispatch(PhoneCheckInit()),
    dispatch(documentVerificationInit()),
    dispatch(reVerificationInit()),
    dispatch(amlCheckInit()),
    dispatch(biometricVerificationInit()),
    dispatch(govCheckInit()),
    dispatch(creditCheckInit()),
    dispatch(deviceFingerprintInit()),
    dispatch(metadataInit()),
    dispatch(customDocumentInit()),
    dispatch(certifiedTimestampInit()),
    dispatch(eSignatureInit()),
  ];
  dispatch(productRegisteredUpdate(compact(registered)));
  dispatch(productIsInitedUpdate(true));
};
