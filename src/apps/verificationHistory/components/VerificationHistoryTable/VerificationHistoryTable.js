import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { ReactComponent as EmptyListIcon } from 'apps/agentHistory/assets/empty-list.svg';
import { Placeholder } from 'apps/ui/components/Placeholder/Placeholder';
import { useIntl } from 'react-intl';
import { useStyles } from './VerificationHistoryTable.styles';
import { selectVerificationChangesTotalCount, selectVerificationChangesModel, selectVerificationHistoryFilter, selectVerificationChangesList } from '../../state/verificationHistory.selectors';
import { loadVerificationHistory } from '../../state/verificationHistory.actions';
import { VerificationHistoryRow } from '../VerificationHistoryRow/VerificationHistoryRow';

export function VerificationHistoryTable({ identityId }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const verificationChanges = useSelector(selectVerificationChangesList) || [];
  const verificationChangesModel = useSelector(selectVerificationChangesModel);
  const verificationHistoryFilter = useSelector(selectVerificationHistoryFilter);
  const changesTotalCount = useSelector(selectVerificationChangesTotalCount) || 0;

  const handleNextData = useCallback(() => {
    if (!verificationChangesModel.isLoading && hasMore) {
      dispatch(loadVerificationHistory(identityId, page + 1, false));
      setPage(((prevState) => prevState + 1));
    }
  }, [verificationChangesModel.isLoading, hasMore, dispatch, identityId, page]);

  useEffect(() => {
    setPage(1);
  }, [verificationHistoryFilter]);

  useEffect(() => {
    setHasMore(!verificationChangesModel.isLoading && verificationChangesModel.isLoaded && verificationChanges?.length < changesTotalCount);
  }, [verificationChangesModel.isLoaded, page, changesTotalCount, verificationChanges, verificationChangesModel.isLoading]);

  return (
    <Paper className={classes.paper}>
      <TableContainer id="scrollable-verification-history-table" className={classes.tableContainer}>
        <InfiniteScroll
          next={handleNextData}
          hasMore={hasMore}
          loader={verificationChangesModel.isLoading && (
            <Box p={1.4} pt={2.4} width="100%" align="center" className={classes.loader}>
              <IconLoad width={25} />
            </Box>
          )}
          scrollThreshold={0.8}
          dataLength={verificationChanges?.length || 0}
          scrollableTarget="scrollable-verification-history-table"
        >
          <Table>
            <TableBody data-qa={QATags.VerificationHistory.Table}>
              {verificationChanges?.length === 0 && (
              <TableRow>
                <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                  <Placeholder icon={<EmptyListIcon />} subtitle={intl.formatMessage({ id: 'VerificationHistory.placeholder' })} />
                </TableCell>
              </TableRow>
              )}
              {verificationChanges?.map((row, index) => (<VerificationHistoryRow isInitEvent={index === changesTotalCount - 1 && !row.updatedBy} key={index} rowData={row} />))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </Paper>
  );
}
