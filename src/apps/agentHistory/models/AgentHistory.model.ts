import { CollaboratorRoles, IUser } from 'models/Collaborator.model';
import { DocumentTypes } from 'models/Document.model';
import { FilterI } from 'models/Filter.model';
import { DocumentFieldValue, VerificationStatusValue } from 'models/History.model';
import { IdentityId } from 'models/Identity.model';
import { ITEMS_PER_PAGE } from 'models/Pagination.model';
import { VerificationId } from 'models/Verification.model';

export enum AgentHistoryEventTypes {
  LoginFailed = 'loginFailed',
  LoginSucceeded = 'loginSucceeded',
  ManualReview = 'manualReview',
  PasswordChanged = 'passwordChanged',
  UserBlockedByTeammate = 'userBlockedByTeammate',
  UserBlockedTeammate = 'userBlockedTeammate',
  UserChangedTeammateRole = 'userChangedTeammateRole',
  UserChangedTeammateName = 'userChangedTeammateName',
  UserInvitedByTeammate = 'userInvitedByTeammate',
  UserInvitedTeammate = 'userInvitedTeammate',
  UserNameChangedByTeammate = 'userNameChangedByTeammate',
  UserRoleChangedByTeammate = 'userRoleChangedByTeammate',
  UserUnblockedByTeammate = 'userUnblockedByTeammate',
  UserUnblockedTeammate = 'userUnblockedTeammate',
  VerificationCsvDownloaded = 'verificationCsvDownloaded',
  VerificationDeleted = 'verificationDeleted',
  VerificationDocumentFieldsUpdated = 'verificationDocumentFieldsUpdated',
  VerificationPdfDownloaded = 'verificationPdfDownloaded',
  VerificationStatusUpdated = 'verificationStatusUpdated',
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

export interface VerificationDeletedEventBody {
  identityId?: IdentityId;
  verificationId?: VerificationId;
}

export interface UserChangesEventBody { // for the invited/blocked/unblocked events
  user: IUser;
}

export interface ChangedValue<T> {
  prevValue: T;
  nextValue: T;
}

export interface UserRoleChangedEventBody extends UserChangesEventBody {
  role: ChangedValue<CollaboratorRoles>;
}

export interface UserNameChangedEventBody extends UserChangesEventBody {
  firstName: ChangedValue<string>;
  lastName: ChangedValue<string>;
}

export type AgentHistoryEventBody = Partial<UserChangesEventBody & // for the invited/blocked/unblocked events
  UserRoleChangedEventBody &
  UserNameChangedEventBody &
  VerificationDeletedEventBody &
  VerificationDocumentFieldsUpdatedEventBody &
  VerificationPdfDownloadedEventBody &
  VerificationStatusUpdatedEventBody>;
// verificationCsvDownloaded passwordChanged loginFailed loginSucceeded come without event body

export interface AgentHistoryEvent {
  eventBody: AgentHistoryEventBody;
  eventType: AgentHistoryEventTypes;
  updatedAt: string;
  updatedBy: IUser;
  __v: number;
  _id: string;
}

export const allAgentHistoryActions: AgentHistoryEventTypes[] = [
  AgentHistoryEventTypes.VerificationStatusUpdated,
  AgentHistoryEventTypes.VerificationDocumentFieldsUpdated,
  AgentHistoryEventTypes.VerificationPdfDownloaded,
  AgentHistoryEventTypes.VerificationCsvDownloaded,
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
    case AgentHistoryEventTypes.VerificationCsvDownloaded:
    case AgentHistoryEventTypes.VerificationPdfDownloaded:
      return 'AgentHistory.event.verificationHasBeenDownloaded';
    case AgentHistoryEventTypes.VerificationDocumentFieldsUpdated:
    case AgentHistoryEventTypes.VerificationStatusUpdated:
      return 'AgentHistory.event.verificationHasChanged';
    case AgentHistoryEventTypes.UserBlockedTeammate:
    case AgentHistoryEventTypes.UserUnblockedTeammate:
    case AgentHistoryEventTypes.UserBlockedByTeammate:
    case AgentHistoryEventTypes.UserUnblockedByTeammate:
    default:
      return `AgentHistory.event.${eventType}`;
  }
}
