import { Box, Button, Grid, TableCell, TableRow } from '@material-ui/core';
import { FiChevronDown } from 'react-icons/fi';
import classnames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { AgentActionInfo, AgentHistoryChangesSwitch } from 'apps/ui';
import { AgentHistoryEventTypes, getHistoryExtraData } from 'models/History.model';
import { useStyles } from './AgentEventRow.styles';

function AgentEventRowComponent({ rowData, index }) {
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { changedFields, eventDate, verificationId, changedStatus } = useMemo(() => getHistoryExtraData(rowData), [rowData]);

  const handleOnExpand = useCallback(() => setIsCollapsed((prevState) => !prevState), []);

  return (
    <TableRow key={index} className={classes.tableRow}>
      {/* Action information cell */}
      <TableCell className={classes.tableCell}>
        <AgentActionInfo className={classes.tableCell} eventType={rowData?.eventType} date={eventDate} id={verificationId} />
      </TableCell>
      {/* Changes cell */}
      <TableCell colSpan={2} className={classes.tableCell}>
        <Grid container justify="space-between" alignItems="flex-start" wrap="nowrap">
          {rowData?.eventType !== AgentHistoryEventTypes.ManualReview ? (
            <AgentHistoryChangesSwitch eventType={rowData?.eventType} changedFields={changedFields} changedStatus={changedStatus} isCollapsed={isCollapsed} />
                    ) : (
                      <>
                        {/* TODO @vladislav.snimshchikov: Add review mode row, when backend add reviewMode event
                         <HistoryManualReview onExpand={handleOnExpand} reviewChanges={rowData?.eventBody} workedTime={rowData?.eventBody?.workedTime} reviewedCount={rowData?.eventBody?.reviewedCount} isCollapsed={isCollapsed} /> */}
                      </>
)}
          {/* Expand cell */}
          {rowData?.eventType === AgentHistoryEventTypes.DocumentFieldsUpdated && changedFields?.fields?.length > 1 && (
            <Box mt={1}>
              <Button className={classes.buttonExpand} onClick={handleOnExpand}>
                <FiChevronDown className={classnames({ [classes.chevronUp]: isCollapsed })} size={17} />
              </Button>
            </Box>
)}
        </Grid>
      </TableCell>
    </TableRow>
  );
}
export const AgentEventRow = React.memo(AgentEventRowComponent);
