import { IReFacematchStep } from 'models/ReVerification.model';

export enum ReVerificationSettingTypes {
  Biometrics = 'biometrics',
  FacematchThreshold = 'facematchThreshold',
  ProofOfOwnership = 'proofOfOwnership',
}

export interface IReverificationVerification {
  reVerification: { reFacematch: IReFacematchStep },
  identity: string,
}
