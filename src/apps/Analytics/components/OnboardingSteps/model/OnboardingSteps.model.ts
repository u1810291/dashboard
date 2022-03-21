export interface StepsOptions {
  stepId: string;
  completed: boolean;
}

export enum OnboardingNames {
  'docs' = 'read-our-docs',
  'teammate' = 'invite-teammate',
  'metamap' = 'make-metamap',
}

export const ONBOARDING = {
  [OnboardingNames.docs]: 'Onboarding.readDocs',
  [OnboardingNames.teammate]: 'Onboarding.inviteTeammate',
  [OnboardingNames.metamap]: 'Onboarding.makeMeta',
};

export const ONBOARDINGQA = {
  [OnboardingNames.docs]: 'Docs',
  [OnboardingNames.teammate]: 'Invite',
  [OnboardingNames.metamap]: 'Meta',
};

export function AllStepsCompleted(stepsProgress: StepsOptions[]): boolean {
  return !stepsProgress.find((item) => item.completed === false);
}

export function CreateMetamapCompleted(stepsProgress: StepsOptions[]): boolean {
  const metamapStep = stepsProgress.filter((step) => step.stepId === OnboardingNames.metamap);
  return metamapStep[0].completed;
}
