export type WorkflowId = string;

// TODO: @ggrigorev WF when resolving conflicts with Pablo take his version except id: WorkflowId
export interface IWorkflow {
  id: WorkflowId;
  name: string;
  version: null | number;
  [x: string]: any;
}

export type IWorkflowInVerification = Pick<IWorkflow, 'id' | 'name' | 'version'>;
