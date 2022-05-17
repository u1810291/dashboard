import { Box, Button, TableCell, TableRow } from '@material-ui/core';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import React, { useCallback, useMemo, useState } from 'react';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo-review.svg';
import { getHistoryExtraData, VerificationHistoryEventTypes, IVerificationChange } from 'models/History.model';
import { VerificationHistoryChangesSwitch } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { VerificationHistoryMetadataCell } from '../VerificationHistoryMetadataCell/VerificationHistoryMetadataCell';
import { VerificationHistoryAgentNote } from '../VerificationHistoryAgentNote/VerificationHistoryAgentNote';
import { useStyles } from './VerificationHistoryRow.styles';

function VerificationHistoryRowComponent({ rowData, isInitEvent }: {
  rowData: IVerificationChange;
  isInitEvent: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleOnExpand = useCallback(() => setIsCollapsed((prevState) => !prevState), []);
  const { changedFields, changedStatus, deletedOfGdpr } = useMemo(() => getHistoryExtraData(rowData), [rowData]);

  return (
    <TableRow key={rowData?._id} className={classes.tableRow}>
      {/* User information cell */}
      <VerificationHistoryMetadataCell
        roundAvatar={isInitEvent && (
        <Box className={classes.roundAvatar} display="flex" alignItems="center" justifyContent="center">
          <MatiLogo />
        </Box>
        )}
        className={classes.tableCell}
        item={rowData}
        header={isInitEvent && formatMessage('AgentHistory.event.verificationWasCreated')}
      />
      {/* Changes cell */}
      <TableCell className={classes.tableCell}>
        <VerificationHistoryChangesSwitch eventType={deletedOfGdpr ? VerificationHistoryEventTypes.GdprDeleted : rowData?.eventType} isCollapsed={isCollapsed} changedFields={changedFields} changedStatus={changedStatus} />
      </TableCell>
      {/* Agent notes cell */}
      <TableCell className={classes.tableCell}>
        <VerificationHistoryAgentNote historyEvent={rowData} />
      </TableCell>
      {/* Expand cell */}
      {rowData?.eventType === VerificationHistoryEventTypes.DocumentFieldsUpdated && changedFields?.fields?.length > 1 ? (
        <TableCell className={classnames(classes.tableCell, classes.tableCellExpand)}>
          <Button className={classes.buttonExpand} onClick={handleOnExpand}>
            {formatMessage('VerificationHistory.fieldHasBeenChanged', { messageValues: { count: changedFields?.fields?.length } })}
            <FiChevronDown className={classnames({ [classes.chevronUp]: isCollapsed })} size={17} />
          </Button>
        </TableCell>
      ) : (
        <TableCell className={classes.tableCell} />
      )}
    </TableRow>
  );
}
export const VerificationHistoryRow = React.memo(VerificationHistoryRowComponent);
