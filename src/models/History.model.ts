import { initDateFilter } from './Filter.model';
import { ITEMS_PER_PAGE } from './Pagination.model';

export enum AgentHistoryEventTypes {
  StatusUpdated = 'verificationStatusUpdated',
  DocumentFieldsUpdated = 'verificationDocumentFieldsUpdated',
  PdfDownloaded = 'verificationPdfDownloaded',
  CsvDownloaded = 'verificationCsvDownloaded',
  ManualReview = 'manualReview',
}

export enum VerificationHistoryEventTypes {
  StatusUpdated= 'verificationStatusUpdated',
  DocumentFieldsUpdated= 'documentFieldsUpdated',
  PdfDownloaded='pdfDownloaded',
  GdprDeleted = 'gdprDeleted'
}

export const agentHistoryFilterStructure = {
  eventType: 'eventType',
  pageSize: 'pageSize',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
};

export const agentHistoryCleanFilter = {
  eventType: [],
  pageSize: ITEMS_PER_PAGE,
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};

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
  { id: VerificationHistoryEventTypes.StatusUpdated },
  { id: VerificationHistoryEventTypes.DocumentFieldsUpdated },
  { id: VerificationHistoryEventTypes.PdfDownloaded },
];

export const allAgentHistoryActions = [
  { id: AgentHistoryEventTypes.StatusUpdated },
  { id: AgentHistoryEventTypes.DocumentFieldsUpdated },
  { id: AgentHistoryEventTypes.PdfDownloaded },
  { id: AgentHistoryEventTypes.CsvDownloaded },
];

export function fieldsToArray(fields) {
  // @ts-ignore
  return Object.entries(fields || {}).map(([id, { previousValue, value }]) => ({
    id,
    previousValue,
    value,
  }));
}

export function getAgentEventToken(eventType) {
  if ([AgentHistoryEventTypes.PdfDownloaded, AgentHistoryEventTypes.CsvDownloaded].includes(eventType)) {
    return 'AgentHistory.event.verificationHasBeenDownloaded';
  }
  if ([AgentHistoryEventTypes.StatusUpdated, AgentHistoryEventTypes.DocumentFieldsUpdated].includes(eventType)) {
    return 'AgentHistory.event.verificationHasChanged';
  }
  return null;
}

export function getHistoryExtraData(row) {
  const changedFieldsArray = fieldsToArray(row?.eventBody?.documentFields);
  const changedFields = { fields: changedFieldsArray, ...row?.eventBody };
  const changedStatus = row?.eventBody?.verificationStatus;
  const deletedOfGdpr = row?.depersonalizedAt;
  const verificationId = row?.eventBody?.verificationId || '';
  const eventDate = row?.updatedAt;

  return { changedFields, changedStatus, deletedOfGdpr, verificationId, eventDate };
}
