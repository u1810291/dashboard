import { DocumentFieldEntry } from 'models/History.model';
import React, { useMemo } from 'react';
import { HistoryDataChanged, HistoryFileDownloaded, HistoryStatusChanged, HistoryBlockOrUnblock } from 'apps/ui';
import { AgentHistoryEventBody, AgentHistoryEventTypes } from '../../models/AgentHistory.model';

export function AgentHistoryChangesSwitch({ eventType, eventBody, isCollapsed, changedFields }: {
  eventType: AgentHistoryEventTypes;
  eventBody: AgentHistoryEventBody;
  changedFields: DocumentFieldEntry[];
  isCollapsed: boolean;
}) {
  // TODO: @ggrigorev remove deprecated during the rework of VerificationHistory
  const dataChanges = useMemo(() => ({ fields: changedFields, ...eventBody }), [changedFields, eventBody]);
  switch (eventType) {
    case AgentHistoryEventTypes.StatusUpdated:
      return (<HistoryStatusChanged changes={eventBody?.verificationStatus} />);
    case AgentHistoryEventTypes.UserBlockedTeammate:
    case AgentHistoryEventTypes.UserUnblockedTeammate:
    case AgentHistoryEventTypes.UserBlockedByTeammate:
    case AgentHistoryEventTypes.UserUnblockedByTeammate:
      return (<HistoryBlockOrUnblock eventType={eventType} triggeredUser={eventBody.user} />);
    case AgentHistoryEventTypes.PdfDownloaded:
    case AgentHistoryEventTypes.CsvDownloaded:
      return (<HistoryFileDownloaded eventType={eventType} />);
    case AgentHistoryEventTypes.DocumentFieldsUpdated:
      return (<HistoryDataChanged changes={dataChanges} isCollapsed={isCollapsed} />);
    default:
      return null;
  }
}
