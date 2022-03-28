import { GDPRSettings } from 'models/GDPR.model';
import { Webhook } from 'models/Webhook.model';
import { DeepPartial, mergeDeep } from 'lib/object';
import { MeritId } from 'models/Product.model';
import { DigitalSignatureProvider } from './DigitalSignature.model';

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

enum WorkflowIntegrationType {
  SDK = 'SDK',
  API = 'API'
}

export type WorkflowId = string
export type ReferenceNameId = string
export type IWorkflowInVerification = Pick<IWorkflow, 'id' | 'name' | 'version'>;

export interface WorkflowResponse {
  status: string;
  workflow: IWorkflowResponse;
}

export interface WorkflowBlockResponse<SettingsType = any> {
  id: number;
  blockReferenceName: ReferenceNameId;
  name: string;
  setting: SettingsType;
  type: any;
}

export interface WorkflowBlock extends WorkflowBlockResponse{
  meritId: MeritId;
}

export interface FlowStyle {
  color?: string;
  language?: string;
}

export interface WorkflowSettings{
    gdprSetting: GDPRSettings;
    digitalSignature: DigitalSignatureProvider;
    style: FlowStyle;
    logoUrl: null | string;
    webhook: Webhook;
}

export interface IWorkflowResponse{
  id: WorkflowId;
  name: string;
  status: WorkflowStatus;
  version: null | number;
  templateId: null | string;
  block: WorkflowBlockResponse[];
  integrationType: WorkflowIntegrationType;
  merchantId: string;
  merchantAgentId: string;
  clientId: string;
  createdBy: string;
  updatedBy: string;
  /* TODO: @vladislav.snimshchikov: why date is number? */
  createdDate: number;
  updatedDate: number;
  workflowSetting: WorkflowSettings;
}

export interface IWorkflow extends IWorkflowResponse{
  block: WorkflowBlock[];
}

export function mergeBlocks(blocks: WorkflowBlock[], newBlocks: WorkflowBlock[]): WorkflowBlock[] | null {
  if (!Array.isArray(blocks) || !Array.isArray(newBlocks)) {
    return null;
  }

  return blocks.map((block) => {
    const blockToMerge = newBlocks.find((item) => block?.blockReferenceName?.includes(item.meritId || ''));
    if (blockToMerge) {
      return mergeDeep(block, blockToMerge);
    }
    return block;
  });
}

export function updateWorkflow(currentWorkflow: IWorkflow, newWorkflow: DeepPartial<IWorkflow>) {
  const mergedWorkflow = mergeDeep(currentWorkflow, newWorkflow);
  const mergedBlocks = mergeBlocks(currentWorkflow?.block, newWorkflow?.block as WorkflowBlock[]);
  return {
    ...mergedWorkflow,
    block: mergedBlocks,
  };
}
