import { http } from 'lib/client/http';
import { IWorkflow, WorkflowId, WorkflowResponse } from 'models/Workflow.model';

export function changeableFlowPost(changeableFlow: IWorkflow) {
  return http.post<{ _id: string }>('/api/v1/dashboard/flow', changeableFlow);
}

export function flowUpdate(workFlowId: WorkflowId, workflow: IWorkflow) {
  return http.put<IWorkflow>(`/api/v1/dashboard/v3/workflow/${workFlowId}`, workflow);
}

export function getWorkflow(workFlowId: WorkflowId) {
  return http.get<WorkflowResponse>(`/api/v1/dashboard/v3/workflow/${workFlowId}`);
}
