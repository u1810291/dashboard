export interface StepsOptions {
  stepId: string;
  completed: boolean;
}

export enum OnboardingSteps {
 'read-our-docs'='StepsCheckboxes.readDocs',
 'invite-teammate'='StepsCheckboxes.inviteTeammate',
 'make-metamap'='StepsCheckboxes.makeMeta',
}

export const MOCK_STEPS: StepsOptions[] = [
  { stepId: 'read-our-docs', completed: false },
  { stepId: 'invite-teammate', completed: false },
  { stepId: 'make-metamap', completed: false },
];

export function AllStepsCompleted(stepsProgress: StepsOptions[]): boolean {
  return !stepsProgress.find((item) => item.completed === false);
}
