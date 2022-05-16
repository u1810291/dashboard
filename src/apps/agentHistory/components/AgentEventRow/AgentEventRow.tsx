import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import classnames from 'classnames';
import { DocumentFieldEntry, documentFieldsToArray } from 'models/History.model';
import { TextFieldEditAdornment } from 'apps/ui';
import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { IAgentHistoryEvent, AgentHistoryEventTypes, getAgentEventToken } from '../../models/AgentHistory.model';
import { AgentActionInfo } from '../AgentActionInfo/AgentActionInfo';
import { AgentHistoryChangesSwitch } from '../AgentHistoryChangesSwitch/AgentHistoryChangesSwitch';
import { useStyles } from './AgentEventRow.styles';

function AgentEventRowComponent({ event }: {
  event: IAgentHistoryEvent;
}) {
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const changedFields = useMemo<DocumentFieldEntry[]>(() => documentFieldsToArray(event?.eventBody?.documentFields), [event]);
  const actionTypeToken = getAgentEventToken(event.eventType);

  const handleOnExpand = useCallback(() => setIsCollapsed((prevState) => !prevState), []);

  return (
    <TableRow className={classes.tableRow}>
      {/* Action information cell */}
      <TableCell className={classes.tableCell}>
        <AgentActionInfo
          actionTypeToken={actionTypeToken}
          date={event.updatedAt}
          id={event.eventType !== AgentHistoryEventTypes.VerificationDeleted ? event?.eventBody?.verificationId : null}
        />
      </TableCell>
      {/* Changes cell */}
      <TableCell colSpan={2} className={classes.tableCell}>
        {event?.eventType !== AgentHistoryEventTypes.ManualReview ? (
          <AgentHistoryChangesSwitch
            eventType={event?.eventType}
            updatedBy={event?.updatedBy}
            changedFields={changedFields}
            eventBody={event?.eventBody}
            isCollapsed={isCollapsed}
          />
        ) : (
          <>
            {/* TODO @vladislav.snimshchikov: Add review mode row, when backend add reviewMode event
            <HistoryManualReview onExpand={handleOnExpand} reviewChanges={rowData?.eventBody} workedTime={rowData?.eventBody?.workedTime} reviewedCount={rowData?.eventBody?.reviewedCount} isCollapsed={isCollapsed} /> */}
          </>
        )}
      </TableCell>
      {/* Agent note cell */}
      {(event?.updatedBy && [AgentHistoryEventTypes.VerificationDocumentFieldsUpdated, AgentHistoryEventTypes.VerificationStatusUpdated].includes(event?.eventType)) ? (
        <TableCell className={classes.tableCell}>
          <TextFieldEditAdornment
            multiline
            value={event?.eventBody?.agentNote || ''}
          />
        </TableCell>
      ) : (
        <TableCell className={classes.tableCell} />
      )}
      {/* Expand cell */}
      {event?.eventType === AgentHistoryEventTypes.VerificationDocumentFieldsUpdated && changedFields?.length > 1 && (
        <TableCell>
          <Box mt={1}>
            <Button className={classes.buttonExpand} onClick={handleOnExpand}>
              <FiChevronDown className={classnames({ [classes.chevronUp]: isCollapsed })} size={17} />
            </Button>
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
}
export const AgentEventRow = React.memo(AgentEventRowComponent);
