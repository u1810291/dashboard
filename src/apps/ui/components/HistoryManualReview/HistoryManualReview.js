import { Box, Button, Collapse, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { useCollapsedRows } from 'apps/ui/hooks/collapsedRows.hook';
import classnames from 'classnames';
import { AgentHistoryEventTypes } from 'models/History.model';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { AgentActionInfo } from '../AgentActionInfo/AgentActionInfo';
import { AgentHistoryChangesSwitch } from '../AgentHistoryChangesSwitch/AgentHistoryChangesSwitch';
import { useStyles } from './HistoryManualReview.styles';

export function HistoryManualReview({ onExpand, workedTime, reviewedCount, reviewChanges, isCollapsed }) {
  const classes = useStyles();
  const intl = useIntl();
  const [handleOnExpand, checkIsCollapsed] = useCollapsedRows();

  return (
    <Box width="100%">
      <Grid container justify="space-between">
        <Box color="common.yellow" fontWeight="bold">
          <Typography>{intl.formatMessage({ id: 'AgentHistory.workedInReviewMode' })}</Typography>
          <Typography>{workedTime}</Typography>
          <Typography>
            {intl.formatMessage({ id: 'AgentHistory.countReviewed' }, { count: reviewedCount })}
          </Typography>
        </Box>
        <Button className={classnames({ [classes.chevronUp]: isCollapsed }, classes.buttonExpand)} onClick={onExpand}>
          <FiChevronDown size={17} />
        </Button>
      </Grid>
      <Collapse in={isCollapsed}>
        <TableContainer>
          <Table>
            <TableBody>
              {reviewChanges?.map((item) => (
                <TableRow key={item?.id} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <AgentActionInfo id={item?.actionInfo?.id} actionType={item?.changes?.type} />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Box display="flex" justifyContent="space-between">
                      <AgentHistoryChangesSwitch item={item} isCollapsed={checkIsCollapsed(item?.id)} />
                      {item?.changes?.type === AgentHistoryEventTypes.DataChanged && (
                        <Box mt={1}>
                          <Button className={classnames({ [classes.chevronUp]: checkIsCollapsed(item?.id) }, classes.buttonExpand)} onClick={handleOnExpand(item?.id)}>
                            <FiChevronDown size={17} />
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
}
