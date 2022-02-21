import { amlCheckInit } from 'apps/Aml/state/Aml.actions';
import { biometricVerificationOldInit } from 'apps/BiometricVerificationOld';
import { documentVerificationOldInit } from 'apps/DocumentVerificationOld';
import { govCheckOldInit } from 'apps/GovCheckOld';
import { ipCheckOldInit } from 'apps/IpCheckOld/state/IpCheck.actions';
import { customWatchlistInit } from 'apps/CustomWatchlist/state/CustomWatchlist.actions';
import { EmailCheckInit } from 'apps/EmailCheck/state/EmailCheck.actions';
import { PhoneCheckInit } from 'apps/PhoneCheck/state/PhoneCheck.actions';
import { reVerificationInit } from 'apps/reverification/state/ReVerification.actions';
import { bankAccountDataInit } from 'apps/BankAccountData';
import { workAccountDataInit } from 'apps/WorkAccountData';
import { payrollAccountDataInit } from 'apps/PayrollAccountData';
import { compact } from 'lodash';
import { storeAction } from 'state/store.utils';
import { ProductTypes } from 'models/Product.model';
import { creditCheckInit } from 'apps/CreditCheck/state/CreditCheck.actions';
import { backgroundCheckInit } from 'apps/BackgroundCheck/state/BackgroundCheck.actions';
import { deviceFingerprintInit } from 'apps/DeviceFingerPrint/state/deviceFingerprint.actions';
import { customDocumentInit } from 'apps/customDocument/state/customDocument.actions';
import { FacematchInit } from 'apps/FacematchService/state/Facematch.actions';
import { eSignatureInit } from 'apps/ESignature';
import { CustomFieldInit } from 'apps/CustomField';
import { metadataInit } from 'apps/metadata/state/Metadata.actions';
import { certifiedTimestampInit } from 'apps/CertifiedTimestamp/state/CertifiedTimestamp.actions';
import { ipCheckInit } from 'apps/IpCheck/state/IpCheck.actions';
import { documentVerificationInit } from 'apps/documentVerification/state/DocumentVerification.actions';
import { biometricVerificationInit } from 'apps/biometricVerification/state/BiometricVerification.actions';
import { govCheckInit } from 'apps/GovCheck/state/GovCheck.actions';
import { ProductActionTypes } from './Product.store';

export const productIsInitedUpdate = storeAction<boolean>(ProductActionTypes.ProductIsInitedUpdate);
export const productRegisteredUpdate = storeAction<string[]>(ProductActionTypes.ProductRegistered);

export const productFlowbuilderInit = () => (dispatch) => {
  const registered: ProductTypes[] = [
    dispatch(ipCheckOldInit()),
    dispatch(EmailCheckInit()),
    dispatch(PhoneCheckInit()),
    dispatch(documentVerificationOldInit()),
    dispatch(reVerificationInit()),
    dispatch(amlCheckInit()),
    dispatch(biometricVerificationOldInit()),
    dispatch(govCheckOldInit()),
    dispatch(FacematchInit()),
    dispatch(creditCheckInit()),
    dispatch(deviceFingerprintInit()),
    dispatch(bankAccountDataInit()),
    dispatch(workAccountDataInit()),
    dispatch(payrollAccountDataInit()),
    dispatch(metadataInit()),
    dispatch(customDocumentInit()),
    dispatch(certifiedTimestampInit()),
    dispatch(backgroundCheckInit()),
    dispatch(customWatchlistInit()),
    dispatch(eSignatureInit()),
    dispatch(CustomFieldInit()),
  ];
  dispatch(productRegisteredUpdate(compact(registered)));
  dispatch(productIsInitedUpdate(true));
};

export const productWorkflowBuilderInit = () => (dispatch) => {
  const registered: ProductTypes[] = [
    dispatch(ipCheckInit()),
    dispatch(documentVerificationInit()),
    dispatch(biometricVerificationInit()),
    dispatch(govCheckInit()),
  ];
  dispatch(productRegisteredUpdate(compact(registered)));
  dispatch(productIsInitedUpdate(true));
};
