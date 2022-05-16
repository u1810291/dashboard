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

export interface IVerificationStatusUpdatedEventBody {
  identityId: IdentityId;
  verificationId: VerificationId;
  verificationStatus: VerificationStatusValue;
  agentNote: Nullable<string>;
}

export interface IVerificationDocumentFieldsUpdatedEventBody {
  documentFields: Record<string, DocumentFieldValue>;
  documentIndex: number;
  documentType: DocumentTypes;
  identityId: IdentityId;
  verificationId: VerificationId;
  agentNote: Nullable<string>;
}

export interface IVerificationPdfDownloadedEventBody {
  identityId: IdentityId;
  verificationId: VerificationId;
}

export interface IVerificationDeletedEventBody {
  identityId?: IdentityId;
  verificationId?: VerificationId;
}

export interface IUserChangesEventBody { // for the invited/blocked/unblocked events
  user: IUser;
}

export interface IChangedValue<T> {
  prevValue: T;
  nextValue: T;
}

export interface IUserRoleChangedEventBody extends IUserChangesEventBody {
  role: IChangedValue<CollaboratorRoles>;
}

export interface IUserNameChangedEventBody extends IUserChangesEventBody {
  firstName: IChangedValue<string>;
  lastName: IChangedValue<string>;
}

export type AgentHistoryEventBody = Partial<IUserChangesEventBody & // for the invited/blocked/unblocked events
  IUserRoleChangedEventBody &
  IUserNameChangedEventBody &
  IVerificationDeletedEventBody &
  IVerificationDocumentFieldsUpdatedEventBody &
  IVerificationPdfDownloadedEventBody &
  IVerificationStatusUpdatedEventBody>;
// verificationCsvDownloaded passwordChanged loginFailed loginSucceeded come without event body

export interface IAgentHistoryEvent {
  eventBody?: AgentHistoryEventBody;
  eventType: AgentHistoryEventTypes;
  updatedAt: string;
  updatedBy: IUser;
  __v: number;
  _id: string;
}

export enum AgentHistoryEventGroupTypes {
  LoginAttempt = 'loginAttempt',
  PasswordChange = 'passwordChange',
  ProfileChange = 'profileChange',
  TeammateProfileChange = 'teammateProfileChange',
  DataExport = 'dataExport',
  VerificationChange = 'verificationChange',
}

export interface IAgentHistoryEventGroup {
  key: AgentHistoryEventGroupTypes;
  value: AgentHistoryEventTypes[];
}

export const agentHistoryEventGroups: IAgentHistoryEventGroup[] = [
  {
    key: AgentHistoryEventGroupTypes.LoginAttempt,
    value: [
      AgentHistoryEventTypes.LoginSucceeded,
      AgentHistoryEventTypes.LoginFailed,
    ],
  }, {
    key: AgentHistoryEventGroupTypes.PasswordChange,
    value: [AgentHistoryEventTypes.PasswordChanged],
  }, {
    key: AgentHistoryEventGroupTypes.ProfileChange,
    value: [
      AgentHistoryEventTypes.UserBlockedByTeammate,
      AgentHistoryEventTypes.UserUnblockedByTeammate,
      AgentHistoryEventTypes.UserInvitedByTeammate,
      AgentHistoryEventTypes.UserRoleChangedByTeammate,
      AgentHistoryEventTypes.UserNameChangedByTeammate,
    ],
  }, {
    key: AgentHistoryEventGroupTypes.TeammateProfileChange,
    value: [
      AgentHistoryEventTypes.UserBlockedTeammate,
      AgentHistoryEventTypes.UserUnblockedTeammate,
      AgentHistoryEventTypes.UserInvitedTeammate,
      AgentHistoryEventTypes.UserChangedTeammateRole,
      AgentHistoryEventTypes.UserChangedTeammateName,
    ],
  }, {
    key: AgentHistoryEventGroupTypes.DataExport,
    value: [
      AgentHistoryEventTypes.VerificationCsvDownloaded,
      AgentHistoryEventTypes.VerificationPdfDownloaded,
    ],
  }, {
    key: AgentHistoryEventGroupTypes.VerificationChange,
    value: [
      AgentHistoryEventTypes.VerificationStatusUpdated,
      AgentHistoryEventTypes.VerificationDocumentFieldsUpdated,
      AgentHistoryEventTypes.VerificationDeleted,
    ],
  },
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
