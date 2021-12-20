import { HistoryDataChanged, HistoryFileDownloaded, HistoryStatusChanged } from 'apps/ui';
import { IUser } from 'models/Collaborator.model';
import { DocumentFieldEntry } from 'models/History.model';
import React, { useMemo } from 'react';
import { AgentHistoryEventBody, AgentHistoryEventTypes } from '../../models/AgentHistory.model';
import { HistoryChangingName } from '../HistoryChangingName/HistoryChangingName';
import { HistoryChangingRole } from '../HistoryChangingRole/HistoryChangingRole';
import { HistoryBlockOrUnblock } from '../HistoryBlockOrUnblock/HistoryBlockOrUnblock';
import { HistoryInvitingTeammate } from '../HistoryInvitingTeammate/HistoryInvitingTeammate';
import { HistoryVerificationDeleted } from '../HistoryVerificationDeleted/HistoryVerificationDeleted';

export function AgentHistoryChangesSwitch({ eventType, eventBody, updatedBy, isCollapsed, changedFields }: {
  eventType: AgentHistoryEventTypes;
  eventBody: AgentHistoryEventBody;
  updatedBy: IUser;
  changedFields: DocumentFieldEntry[];
  isCollapsed: boolean;
}) {
  // TODO: @ggrigorev remove deprecated during the rework of VerificationHistory
  const dataChanges = useMemo(() => ({ fields: changedFields, ...eventBody }), [changedFields, eventBody]);
  switch (eventType) {
    case AgentHistoryEventTypes.UserBlockedTeammate:
    case AgentHistoryEventTypes.UserUnblockedTeammate:
    case AgentHistoryEventTypes.UserBlockedByTeammate:
    case AgentHistoryEventTypes.UserUnblockedByTeammate:
      return (<HistoryBlockOrUnblock eventType={eventType} triggeredUser={eventBody.user} />);
    case AgentHistoryEventTypes.UserInvitedTeammate:
    case AgentHistoryEventTypes.UserInvitedByTeammate:
      return (<HistoryInvitingTeammate eventType={eventType} triggeredUser={eventBody.user} />);
    case AgentHistoryEventTypes.UserNameChangedByTeammate:
    case AgentHistoryEventTypes.UserChangedTeammateName:
      return (<HistoryChangingName eventType={eventType} updatedBy={updatedBy} triggeredUser={eventBody.user} firstName={eventBody.firstName} lastName={eventBody.lastName} />);
    case AgentHistoryEventTypes.UserRoleChangedByTeammate:
    case AgentHistoryEventTypes.UserChangedTeammateRole:
      return (<HistoryChangingRole eventType={eventType} updatedBy={updatedBy} triggeredUser={eventBody.user} role={eventBody.role} />);
    case AgentHistoryEventTypes.VerificationStatusUpdated:
      return (<HistoryStatusChanged changes={eventBody?.verificationStatus} />);
    case AgentHistoryEventTypes.VerificationPdfDownloaded:
    case AgentHistoryEventTypes.VerificationCsvDownloaded:
      return (<HistoryFileDownloaded eventType={eventType} />);
    case AgentHistoryEventTypes.VerificationDeleted:
      return (<HistoryVerificationDeleted deletedId={eventBody.verificationId} />);
    case AgentHistoryEventTypes.VerificationDocumentFieldsUpdated:
      return (<HistoryDataChanged changes={dataChanges} isCollapsed={isCollapsed} />);
    case AgentHistoryEventTypes.PasswordChanged:
    case AgentHistoryEventTypes.LoginFailed:
    case AgentHistoryEventTypes.LoginSucceeded:
    default:
      return null;
  }
}
