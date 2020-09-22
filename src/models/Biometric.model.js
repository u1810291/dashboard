import { get } from 'lodash';

export const BiometricTypes = {
  liveness: 'liveness',
  selfie: 'selfie',
  none: 'none',
  voiceLiveness: 'voice+liveness',
};

export const BiometricSettings = [
  {
    id: BiometricTypes.none,
  },
  {
    id: BiometricTypes.selfie,
  },
  {
    id: BiometricTypes.liveness,
    options: [
      {
        id: BiometricTypes.voiceLiveness,
      },
    ],
  },
];

export function getBiometricParentSetting(value) {
  return BiometricSettings.find((item) => item.options && item.options.find((option) => option.id === value));
}

export const BiometricLivenessSteps = [
  BiometricTypes.liveness,
  BiometricTypes.selfie,
];

export const BiometricLivenessStatus = {
  Skipped: 'skipped',
  InProgress: 'inProgress',
  Success: 'success',
  Error: 'error',
};

export function getStatusByCode({ status, error }) {
  switch (status) {
    case 0:
      return BiometricLivenessStatus.Skipped;
    case 100:
      return BiometricLivenessStatus.InProgress;
    case 200:
      return error
        ? BiometricLivenessStatus.Error
        : BiometricLivenessStatus.Success;
    default: {
      console.warn('liveness code: status not found, status: ', status, 'error: ', error);
      return null;
    }
  }
}

export function getLivenessExtras(identity) {
  const steps = get(identity, '_embedded.verification.steps') || [];
  const liveness = steps.find((item) => BiometricLivenessSteps.includes(item.id));

  if (!liveness) {
    return null;
  }

  return {
    status: getStatusByCode(liveness),
    videoUrl: get(liveness, 'data.videoUrl'),
    selfieUrl: get(liveness, 'data.selfiePhotoUrl') || get(liveness, 'data.selfieUrl'),
  };
}
