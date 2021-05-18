import React from 'react';
import { VerificationHistoryEventTypes } from 'models/History.model';
import { HistoryDataChanged } from '../HistoryDataChanged/HistoryDataChanged';
import { HistoryFileDownloaded } from '../HistoryFileDownloaded/HistoryFileDownloaded';
import { HistoryStatusChanged } from '../HistoryStatusChanged/HistoryStatusChanged';
import { HistoryGdprDeleted } from '../HistoryGdprDeleted/HistoryGdprDeleted';

export function VerificationHistoryChangesSwitch({ eventType, changedFields, changedStatus, isCollapsed }) {
  switch (eventType) {
    case VerificationHistoryEventTypes.StatusUpdated:
      return (<HistoryStatusChanged changes={changedStatus} />);
    case VerificationHistoryEventTypes.PdfDownloaded:
      return (<HistoryFileDownloaded eventType={eventType} />);
    case VerificationHistoryEventTypes.DocumentFieldsUpdated:
      return (<HistoryDataChanged changes={changedFields} isCollapsed={isCollapsed} />);
    case VerificationHistoryEventTypes.GdprDeleted:
      return (<HistoryGdprDeleted />);
    default:
      return null;
  }
}
