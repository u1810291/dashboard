import { http } from 'lib/client/http';
import { ApiResponse } from 'models/Client.model';
import { IFlow } from 'models/Flow.model';

export function changeableFlowPost(changeableFlow: IFlow): Promise<ApiResponse<{ _id: string }>> {
  return http.post<{ _id: string }>('/api/v1/dashboard/flow', changeableFlow);
}

export function flowUpdate(merchantId: string, flowId: string, flow: IFlow): Promise<ApiResponse<IFlow>> {
  return http.put<IFlow>(`/api/v1/merchant/${merchantId}/flows/${flowId}`, flow);
}
