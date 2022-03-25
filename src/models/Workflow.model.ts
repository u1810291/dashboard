import { GDPRSettings } from 'models/GDPR.model';
import { Webhook } from 'models/Webhook.model';
import { mergeDeep } from 'lib/object';
import { MeritId } from 'models/Product.model';
import { DigitalSignatureProvider } from './DigitalSignature.model';

export enum WorkflowStatusTypes {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

enum WorkflowIntegrationTypes {
  SDK = 'SDK',
  API = 'API'
}

export type WorkflowId = string
export type ReferenceNameId = string
export type IWorkflowInVerification = Pick<IWorkflow, 'id' | 'name' | 'version'>;

export interface IWorkflowResponse {
  status: string;
  workflow: IWorkflow;
}

export interface IWorkflowBlock<SettingsType = any>{
  id: number;
  blockReferenceName: ReferenceNameId;
  name: string;
  setting: SettingsType;
  type: any;
}

export interface IFlowStyle {
  color?: string;
  language?: string;
}

export interface IWorkflowSettings {
    gdprSetting: GDPRSettings;
    digitalSignature: DigitalSignatureProvider;
    style: IFlowStyle;
    logoUrl: null | string;
    webhook: Webhook;
}

export interface IWorkflow{
  id: WorkflowId;
  name: string;
  status: WorkflowStatusTypes;
  version: null | number;
  templateId: null | string;
  block: IWorkflowBlock[];
  integrationType: WorkflowIntegrationTypes;
  merchantId: string;
  merchantAgentId: string;
  clientId: string;
  createdBy: string;
  updatedBy: string;
  /* TODO: @vladislav.snimshchikov: why date is number? */
  createdDate: number;
  updatedDate: number;
  workflowSetting: IWorkflowSettings;
}

export function removeBlock(meritId: MeritId, blocks: IWorkflowBlock[]): IWorkflowBlock[] {
  if (!Array.isArray(blocks)) {
    return null;
  }

  return blocks.filter((item) => !item.blockReferenceName.includes(meritId));
}

export function updateBlock(meritId: MeritId, blocks: IWorkflowBlock[], newBlock: Partial<IWorkflowBlock>): IWorkflowBlock[] | null {
  if (!Array.isArray(blocks)) {
    return null;
  }

  const blockIndex = blocks.findIndex((item) => item.blockReferenceName.includes(meritId));
  if (blockIndex === -1) {
    return null;
  }

  const oldBlock = blocks[blockIndex];
  const resultBlockArray = [...blocks];
  resultBlockArray[blockIndex] = mergeDeep(oldBlock, newBlock);

  return resultBlockArray;
}
