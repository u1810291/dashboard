import { get } from 'lodash';
import { getStepStatus, StepStatus } from './Step.model';
import { MerchantTags } from './Merchant.model';

export const BiometricTypes = {
  liveness: 'liveness',
  selfie: 'selfie',
  none: 'none',
  voice: 'voice',
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
        tag: MerchantTags.CanUseVoiceLiveness,
      },
    ],
  },
];

export function getBiometricParentSetting(value) {
  return BiometricSettings.find((item) => item.options && item.options.find((option) => option.id === value));
}

export const BiometricSteps = [
  BiometricTypes.liveness,
  BiometricTypes.selfie,
  BiometricTypes.voice,
];

export function getBiometricExtras(steps) {
  return steps
    .filter((item) => BiometricSteps.includes(item.id))
    .map((item) => ({
      ...item,
      checkStatus: getStepStatus(item),
      videoUrl: get(item, 'data.videoUrl'),
      selfieUrl: get(item, 'data.selfiePhotoUrl') || get(item, 'data.selfieUrl'),
    }));
}

export function getBiometricStatus(steps) {
  let status;

  const voice = steps.find((item) => item.id === BiometricTypes.voice);

  if (voice) {
    const liveness = steps.find((item) => item.id === BiometricTypes.liveness);
    const movement = steps.find((item) => item.id === BiometricTypes.liveness);
    const livenessError = steps.find((item) => item.checkStatus !== StepStatus.Success);

    status = {
      ...liveness,
      checkStatus: livenessError ? livenessError.checkStatus : liveness.checkStatus,
      sub: [
        {
          ...voice,
          labelExtra: 'SecurityCheckStep.voice.numbers',
          labelExtraData: {
            numbers: get(voice, 'data.numbers'),
          },
        },
        {
          ...movement,
          id: 'movement',
        },
      ],
    };
  } else {
    // eslint-disable-next-line prefer-destructuring
    status = steps[0];
  }

  return status;
}
