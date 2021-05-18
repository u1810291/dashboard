import { Box, Button, TableCell, TableRow } from '@material-ui/core';
import classnames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-review.svg';
import { getHistoryExtraData, VerificationHistoryEventTypes } from 'models/History.model';
import { VerificationHistoryChangesSwitch } from 'apps/ui';
import { VerificationHistoryMetadataCell } from '../VerificationHistoryMetadataCell/VerificationHistoryMetadataCell';
import { useStyles } from './VerificationHistoryRow.styles';

function VerificationHistoryRowComponent({ rowData, isInitEvent }) {
  const intl = useIntl();
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOnExpand = useCallback(() => setIsCollapsed((prevState) => !prevState), []);
  const { changedFields, changedStatus, deletedOfGdpr } = useMemo(() => getHistoryExtraData(rowData), [rowData]);

  return (
    <TableRow key={rowData} className={classes.tableRow}>
      {/* User information cell */}
      <VerificationHistoryMetadataCell
        roundAvatar={isInitEvent && (
        <Box className={classes.roundAvatar} display="flex" alignItems="center" justify="center">
          <MatiLogo />
        </Box>
        )}
        className={classes.tableCell}
        item={rowData}
        header={isInitEvent && intl.formatMessage({ id: 'AgentHistory.event.verificationWasCreated' })}
      />
      {/* Changes cell */}
      <TableCell className={classes.tableCell}>
        <VerificationHistoryChangesSwitch eventType={deletedOfGdpr ? VerificationHistoryEventTypes.GdprDeleted : rowData?.eventType} isCollapsed={isCollapsed} changedFields={changedFields} changedStatus={changedStatus} />
      </TableCell>
      {/* Expand cell */}
      {rowData?.eventType === VerificationHistoryEventTypes.DocumentFieldsUpdated && changedFields?.fields?.length > 1 ? (
        <TableCell className={classnames(classes.tableCell, classes.tableCellExpand)}>
          <Button className={classes.buttonExpand} onClick={handleOnExpand}>
            {intl.formatMessage({ id: 'VerificationHistory.fieldHasBeenChanged' }, { count: changedFields?.fields?.length })}
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
