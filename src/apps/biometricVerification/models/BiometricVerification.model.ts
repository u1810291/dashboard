import { BiometricTypes } from 'models/Biometric.model';
import { MeritId } from 'models/Product.model';

export const DEFAULT_DUPLICATE_FACE_DETECTION_THRESHOLD = 99;
export const MIN_DUPLICATE_FACE_DETECTION_THRESHOLD = 40;
export const MAX_DUPLICATE_FACE_DETECTION_THRESHOLD = 100;
export const MAX_DUPLICATE_FACE_DETECTION_THRESHOLD_FRACTION = 3;

export enum BiometricVerificationCheckTypes {
  Liveness = 'liveness',
  VoiceLiveness = 'voice+liveness'
}

export enum BiometricVerificationSettingsTypes {
  Biometrics = 'biometrics',
  DuplicateFaceDetection = 'duplicateFaceDetection',
  DuplicateFaceDetectionThreshold = 'duplicateFaceMatchThreshold',
}

export enum BiometricVerificationTypes {
  SelfiePhoto = 'selfiePhoto',
  SelfieVideo = 'selfieVideo',
}

export enum BiometricVerificationThresholdErrorTypes {
  OutOfRange = 'outOfRange',
}

export const BiometricVerificationId: MeritId = 'biometric-verification';

export function getVerificationType(value: string): BiometricVerificationTypes {
  if (BiometricTypes.selfie === value) {
    return BiometricVerificationTypes.SelfiePhoto;
  }

  return BiometricVerificationTypes.SelfieVideo;
}

export function hasVoiceVerification(value: string): boolean {
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

export function hasDuplicateFaceDetectionThresholdError(threshold: number) {
  return threshold < MIN_DUPLICATE_FACE_DETECTION_THRESHOLD || threshold > MAX_DUPLICATE_FACE_DETECTION_THRESHOLD;
}
