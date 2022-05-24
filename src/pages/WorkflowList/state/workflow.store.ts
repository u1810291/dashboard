import { Loadable } from 'models/Loadable.model';
import { IWorkflow } from 'models/Workflow.model';

export const WORKFLOW_STORE_KEY = 'workflows';

export const WorkflowActionGroups = {
  Workflow: 'WORKFLOWS',
};

export enum SliceNameTypes {
  Workflows = 'workflows',
}

export interface WorkflowStore {
  [SliceNameTypes.Workflows]: Loadable<IWorkflow[]>;
  currentFlow: string | null;
}
