import React from 'react';
import { AgentHistoryEventTypes } from 'models/History.model';
import { HistoryDataChanged } from '../HistoryDataChanged/HistoryDataChanged';
import { HistoryFileDownloaded } from '../HistoryFileDownloaded/HistoryFileDownloaded';
import { HistoryStatusChanged } from '../HistoryStatusChanged/HistoryStatusChanged';

export function AgentHistoryChangesSwitch({ eventType, changedFields, changedStatus, isCollapsed }) {
  switch (eventType) {
    case AgentHistoryEventTypes.StatusUpdated:
      return (<HistoryStatusChanged changes={changedStatus} />);
    case AgentHistoryEventTypes.PdfDownloaded:
      return (<HistoryFileDownloaded eventType={eventType} />);
    case AgentHistoryEventTypes.CsvDownloaded:
      return (<HistoryFileDownloaded eventType={eventType} />);
    case AgentHistoryEventTypes.DocumentFieldsUpdated:
      return (<HistoryDataChanged changes={changedFields} isCollapsed={isCollapsed} />);
    default:
      return null;
  }
}
