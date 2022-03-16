import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const VERIFICATION_STORE_KEY = 'verification';

export enum VerificationSliceTypes {
  Verification = 'verification',
  PassedVerifications = 'passedVerifications',
}

export enum VerificationActionGroups {
  Verification = 'VERIFICATION',
  PassedVerifications = 'VERIFICATIONS_PASSED',
}

export const VerificationActionTypes: TypesSequence = {
  ...createTypesSequence(VerificationActionGroups.Verification),
  ...createTypesSequence(VerificationActionGroups.PassedVerifications),
  VERIFICATION_REMOVE: 'VERIFICATION_REMOVE',
  VERIFICATION_PRODUCT_LIST_UPDATE: 'VERIFICATION_PRODUCT_LIST_UPDATE',
};

export interface VerificationOldStore {
  productList: ProductTypes[];
  [VerificationSliceTypes.Verification]: Loadable<any>;
  [VerificationSliceTypes.PassedVerifications]: Loadable<any[]>;
}
