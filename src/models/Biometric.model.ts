import { get } from 'lodash';
import { getStepStatus, IStep, StepStatus, StepTypes } from 'models/Step.model';
import { IdentityStatuses } from './Status.model';

export interface BiometricStep extends IStep {
  checkStatus: StepStatus;
  videoUrl?: string;
  selfieUrl?: string;
}

export interface IDuplicateSelfie {
  verificationUrl: string;
  createdAt: string;
  facematchScore: number;
  verificationStatus: IdentityStatuses;
}

export interface IDuplicateSelfieStepData {
  duplicates: IDuplicateSelfie[];
}

export enum SelfieStepTypes {
  DuplicateSelfieValidation = 'duplicate-selfie-step',
}

export const BiometricTypes = {
  liveness: StepTypes.LivenessMovement,
  selfie: StepTypes.Selfie,
  voice: StepTypes.Voice,
  voiceLiveness: StepTypes.LivenessVoice,
  none: 'none',
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
  return BiometricSettings.find((item) => item?.options?.find((option) => option.id === value));
}

export const BiometricSteps = [
  BiometricTypes.liveness,
  BiometricTypes.selfie,
  BiometricTypes.voice,
];

export enum LivenessStepStatus {
  FewData = 'fewData',
  Disabled = 'disabled',
}

export function getBiometricExtras(steps: IStep<any>[]) {
  const prepared: BiometricStep[] = steps.map((item) => ({
    ...item,
    checkStatus: getStepStatus(item),
    videoUrl: get(item, 'data.videoUrl'),
    selfieUrl: get(item, 'data.selfiePhotoUrl') || get(item, 'data.selfieUrl'),
  }));

  const voice = prepared.find((item) => item.id === BiometricTypes.voice);

  if (!voice) {
    return prepared;
  }

  const liveness = prepared.find((item) => item.id === BiometricTypes.liveness);

  const numbers = get(voice, 'data.text') || '1-2-3';
  const label = numbers
    ? {
      labelExtra: `SecurityCheckStep.voice.${voice.checkStatus}.withNumbers`,
      labelExtraData: {
        numbers,
      },
    }
    : {
      labelExtra: `SecurityCheckStep.voice.${voice.checkStatus}.withoutNumbers`,
    };

  return [
    liveness,
    {
      ...voice,
      ...label,
    },
  ];
}

export function getBiometricStatus(steps) {
  const voice = steps.find((item) => item.id === BiometricTypes.voice);

  if (!voice) {
    return steps[0];
  }

  const liveness = steps.find((item) => item.id === BiometricTypes.liveness);
  const livenessError = steps.find((item) => item.checkStatus !== StepStatus.Success);

  return {
    ...liveness,
    checkStatus: livenessError ? livenessError.checkStatus : liveness.checkStatus,
  };
}

export function getBiometricCheckStatus(steps) {
  if (!steps || steps.length === 0) {
    return LivenessStepStatus.Disabled;
  }

  const { id, checkStatus } = getBiometricStatus(steps);
  if (!checkStatus || !id) {
    return LivenessStepStatus.Disabled;
  }

  if (checkStatus === StepStatus.Success && id === StepTypes.Selfie) {
    return LivenessStepStatus.FewData;
  }

  return checkStatus;
}
