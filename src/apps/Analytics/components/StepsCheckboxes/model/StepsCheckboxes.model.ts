export interface StepsOptions {
  title: string;
  completed: boolean;
}

export const MOCK_STEPS: StepsOptions[] = [
  { title: 'Read our docs to learn  about MetaMap', completed: false },
  { title: 'Invite a teammate', completed: false },
  { title: 'Build your first metamap', completed: false },
];

export function AllStepsCompleted(stepsProgress: StepsOptions[]): boolean {
  return !stepsProgress.find((item) => item.completed === false);
}
