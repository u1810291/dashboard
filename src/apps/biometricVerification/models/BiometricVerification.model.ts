import { BiometricTypes } from 'models/Biometric.model';
import { MeritId } from 'models/Product.model';

export enum BiometricVerificationCheckTypes {
  Liveness = 'liveness',
  VoiceLiveness = 'voice+liveness'
}

export enum BiometricVerificationSettingsTypes {
  Biometrics = 'biometrics',
  DuplicateFaceDetection = 'duplicateFaceDetection',
}

export enum BiometricVerificationTypes {
  SelfiePhoto = 'selfiePhoto',
  SelfieVideo = 'selfieVideo',
}

export const BiometricVerificationId: MeritId = 'biometric-verification';

export function getVerificationType(value: string): BiometricVerificationTypes {
  if (BiometricTypes.selfie === value) {
    return BiometricVerificationTypes.SelfiePhoto;
  }

  return BiometricVerificationTypes.SelfieVideo;
}

export function hasVoiceVerification(value: string) {
  return value === BiometricTypes.voiceLiveness;
}

export function getBiometricType(verificationType: BiometricVerificationTypes, hasVoiceCheck: boolean): string {
  if (verificationType === BiometricVerificationTypes.SelfiePhoto) {
    return BiometricTypes.selfie;
  }

  if (hasVoiceCheck) {
    return BiometricTypes.voiceLiveness;
  }

  return BiometricTypes.liveness;
}
