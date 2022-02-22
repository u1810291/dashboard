export interface StepsOptions {
  stepId: string;
  completed: boolean;
}

export enum OnboardingSteps {
 'read-our-docs'='StepsCheckboxes.readDocs',
 'invite-teammate'='StepsCheckboxes.inviteTeammate',
 'make-metamap'='StepsCheckboxes.makeMeta',
}

export enum OnboardingQA {
  'read-our-docs'='Docs',
  'invite-teammate'='Invite',
  'make-metamap'='Meta',
}

export function AllStepsCompleted(stepsProgress: StepsOptions[]): boolean {
  return !stepsProgress.find((item) => item.completed === false);
}

export function CreateMetamapCompleted(stepsProgress: StepsOptions[]): boolean {
  const metamapStep = stepsProgress.filter((step) => step.stepId === 'make-metamap');
  return metamapStep[0].completed;
}
