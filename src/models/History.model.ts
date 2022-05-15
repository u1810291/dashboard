import { IdentityStatuses } from 'models/Status.model';
import { IUser } from './Collaborator.model';
import { initDateFilter } from './Filter.model';
import { ITEMS_PER_PAGE } from './Pagination.model';
import { IdentityId } from './Identity.model';
import { VerificationId } from './Verification.model';

export enum VerificationHistoryEventTypes {
  StatusUpdated = 'verificationStatusUpdated',
  DocumentFieldsUpdated = 'documentFieldsUpdated',
  PdfDownloaded = 'pdfDownloaded',
  GdprDeleted = 'gdprDeleted',
}

export const verificationHistoryCleanFilter = {
  ...initDateFilter,
  pageSize: ITEMS_PER_PAGE,
  updatedBy: [],
  eventType: [],
};
export const verificationHistoryFilterStructure = {
  updatedBy: 'updatedBy',
  eventType: 'eventType',
  pageSize: 'pageSize',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
};

export const allVerificationHistoryActions = [
  VerificationHistoryEventTypes.StatusUpdated,
  VerificationHistoryEventTypes.DocumentFieldsUpdated,
  VerificationHistoryEventTypes.PdfDownloaded,
];

export interface VerificationStatusValue {
  previousValue: IdentityStatuses;
  value: IdentityStatuses;
}

export interface DocumentFieldValue {
  previousValue: string | number;
  value: string | number;
}

export interface DocumentFieldEntry extends DocumentFieldValue {
  id: string;
}

export interface IVerificationChange {
  verificationId: VerificationId;
  identityId: IdentityId;
  agentNote: string | null;
  eventType: VerificationHistoryEventTypes;
  updatedAt: string;
  updatedBy: IUser;
  __v: number;
  _id: string;
}

export function documentFieldsToArray(fields: Record<string, DocumentFieldValue>): DocumentFieldEntry[] {
  // @ts-ignore
  return Object.entries(fields || {}).map(([id, { previousValue, value }]) => ({
    id,
    previousValue,
    value,
  }));
}

/// TODO: @ggrigorev remove deprecated during the rework of VerificationHistory
/**
 * @deprecated
 */
export function getHistoryExtraData(row) {
  const changedFieldsArray = documentFieldsToArray(row?.eventBody?.documentFields);
  const changedFields = { fields: changedFieldsArray, ...row?.eventBody };
  const changedStatus = row?.eventBody?.verificationStatus;
  const deletedOfGdpr = row?.depersonalizedAt;

  return { changedFields, changedStatus, deletedOfGdpr };
}
