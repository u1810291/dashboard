import { IUser, UserId } from 'models/Collaborator.model';
import { DocumentTypes } from 'models/Document.model';
import { FilterI } from 'models/Filter.model';
import { DocumentFieldValue, VerificationStatusValue } from 'models/History.model';
import { IdentityId } from 'models/Identity.model';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import { VerificationId } from 'models/Verification.model';

export enum AgentHistoryEventTypes {
  UserBlockedTeammate = 'userBlockedTeammate',
  UserBlockedByTeammate = 'userBlockedByTeammate',
  UserUnblockedTeammate = 'userUnblockedTeammate',
  UserUnblockedByTeammate = 'userUnblockedByTeammate',
  StatusUpdated = 'verificationStatusUpdated',
  DocumentFieldsUpdated = 'verificationDocumentFieldsUpdated',
  PdfDownloaded = 'verificationPdfDownloaded',
  CsvDownloaded = 'verificationCsvDownloaded',
  ManualReview = 'manualReview',
}

export interface VerificationStatusUpdatedEventBody {
  identityId: IdentityId;
  verificationId: VerificationId;
  verificationStatus: VerificationStatusValue;
}

export interface VerificationDocumentFieldsUpdatedEventBody {
  documentFields: Record<string, DocumentFieldValue>;
  documentIndex: number;
  documentType: DocumentTypes;
  identityId: IdentityId;
  verificationId: VerificationId;
}

export interface VerificationPdfDownloadedEventBody {
  identityId: IdentityId;
  verificationId: VerificationId;
}

export interface UserBlockedOrUnblockedEventBody {
  user: IUser;
}

export type AgentHistoryEventBody = UserBlockedOrUnblockedEventBody &
  VerificationStatusUpdatedEventBody &
  VerificationPdfDownloadedEventBody &
  VerificationDocumentFieldsUpdatedEventBody;
// verificationCsvDownloaded comes without event body

export interface UpdatedBy {
  firstName: string;
  lastName: string;
  _email: {
    address: string;
  };
  _id: UserId;
}

export interface AgentHistoryEvent {
  eventBody?: AgentHistoryEventBody;
  eventType: AgentHistoryEventTypes;
  updatedAt: string;
  updatedBy: UpdatedBy;
  __v: number;
  _id: string;
}

export const allAgentHistoryActions: AgentHistoryEventTypes[] = [
  AgentHistoryEventTypes.StatusUpdated,
  AgentHistoryEventTypes.DocumentFieldsUpdated,
  AgentHistoryEventTypes.PdfDownloaded,
  AgentHistoryEventTypes.CsvDownloaded,
  AgentHistoryEventTypes.UserBlockedTeammate,
  AgentHistoryEventTypes.UserBlockedByTeammate,
  AgentHistoryEventTypes.UserUnblockedTeammate,
  AgentHistoryEventTypes.UserUnblockedByTeammate,
];

export type AgentHistoryFilter = Pick<FilterI, 'eventType' | 'pageSize' | 'dateCreated[start]' | 'dateCreated[end]'>;

export const agentHistoryFilterStructure: Record<keyof AgentHistoryFilter, string> = {
  eventType: 'eventType',
  pageSize: 'pageSize',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
};

export const agentHistoryCleanFilter: AgentHistoryFilter = {
  eventType: [],
  pageSize: ITEMS_PER_PAGE,
  'dateCreated[start]': null,
  'dateCreated[end]': null,
};

export function getAgentEventToken(eventType: AgentHistoryEventTypes): string {
  switch (eventType) {
    case AgentHistoryEventTypes.CsvDownloaded:
    case AgentHistoryEventTypes.PdfDownloaded:
      return 'AgentHistory.event.verificationHasBeenDownloaded';
    case AgentHistoryEventTypes.DocumentFieldsUpdated:
    case AgentHistoryEventTypes.StatusUpdated:
      return 'AgentHistory.event.verificationHasChanged';
    case AgentHistoryEventTypes.UserBlockedTeammate:
    case AgentHistoryEventTypes.UserUnblockedTeammate:
    case AgentHistoryEventTypes.UserBlockedByTeammate:
    case AgentHistoryEventTypes.UserUnblockedByTeammate:
      return `AgentHistory.event.${eventType}`;
    default:
      return null;
  }
}
