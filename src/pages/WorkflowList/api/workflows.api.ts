import { http } from 'lib/client/http';
import { ApiResponse } from 'models/Client.model';
import { IWorkflow, WorkflowStatus } from 'models/Workflow.model';

type WorkflowListAPIParams = {
  workflowType?: WorkflowStatus;
  pageSize?: number;
  asMerchantId?: string;
}

export type WorkflowListResponse = {
  status: 'SUCCESS';
  workflows: IWorkflow[];
}

export function getWorkflows(params: WorkflowListAPIParams) {
  return http.get<WorkflowListResponse>('/api/v1/dashboard/v3/workflow', { params });
}

export type CreateWorkflowPayload = { name: string; templateId?: string };
export type CreateWorkflowSuccess = {
  status: 'SUCCESS';
  workflow: IWorkflow;
}

export function createWorkflow(data: CreateWorkflowPayload) {
  return http.post<CreateWorkflowSuccess>('/api/v1/dashboard/v3/workflow', data);
}

export type DeleteWorkflowSuccess = {
  status: 'SUCCESS';
  isDeleted: true;
}

export function deleteWorkflow(id: string): Promise<ApiResponse<DeleteWorkflowSuccess>> {
  return http.delete<DeleteWorkflowSuccess>(`/api/v1/dashboard/v3/workflow/${id}`);
}
