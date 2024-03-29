import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ReactComponent as EmptyListIcon } from 'assets/empty-list-round.svg';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { selectCollaborator } from 'apps/collaborators/state/collaborator.selectors';
import { PageLoader } from 'apps/layout';
import { appPalette } from 'apps/theme';
import { Placeholder } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { QATags } from 'models/QA.model';
import { loadAgentHistory } from '../../state/agentHistory.actions';
import { selectAgentHistoryEventsList, selectAgentHistoryFilter, selectAgentHistoryLoadedCount, selectAgentHistoryModel, selectAgentHistoryTotalCount } from '../../state/agentHistory.selectors';
import { AgentEventRow } from '../AgentEventRow/AgentEventRow';
import { useStyles } from './AgentEventsTable.styles';

export function AgentEventsTable({ isLoading }: {
  isLoading: boolean;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const collaboratorModel = useSelector(selectCollaborator);
  const agentHistoryFilter = useSelector(selectAgentHistoryFilter);
  const agentHistory = useSelector(selectAgentHistoryModel);
  const historyLoadedCount = useSelector(selectAgentHistoryLoadedCount) || 0;
  const historyTotalLength = useSelector(selectAgentHistoryTotalCount) || 0;
  const eventList = useSelector(selectAgentHistoryEventsList) || [];

  const handleNextData = useCallback(() => {
    if (!agentHistory.isLoading && hasMore) {
      dispatch(loadAgentHistory(collaboratorModel?.value?.user?.id, page + 1, false));
      setPage(((prevState) => prevState + 1));
    }
  }, [agentHistory.isLoading, hasMore, dispatch, collaboratorModel, page]);

  useEffect(() => {
    setPage(1);
  }, [agentHistoryFilter]);

  useEffect(() => {
    setHasMore(!agentHistory.isLoading && agentHistory.isLoaded && historyLoadedCount < historyTotalLength);
  }, [agentHistory.isLoading, agentHistory.isLoaded, historyLoadedCount, historyTotalLength, page]);

  return (
    <Box mt={2}>
      <Paper className={classes.paper}>
        <TableContainer id="scrollable-agent-history-table" className={classes.tableContainer}>
          <InfiniteScroll
            next={handleNextData}
            hasMore={hasMore}
            loader={agentHistory.isLoading && (
            <Box p={1.4} pt={2.4} width="100%" textAlign="center" className={classes.loader}>
              <IconLoad width={25} />
            </Box>
            )}
            scrollThreshold={0.8}
            dataLength={historyLoadedCount}
            scrollableTarget="scrollable-agent-history-table"
          >
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>
                    {formatMessage('AgentHistory.tableHead.status')}
                  </TableCell>
                  <TableCell>
                    {formatMessage('AgentHistory.tableHead.additionalDetails')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody data-qa={QATags.AgentHistory.HistoryTable}>
                {(historyTotalLength === 0 || isLoading) ? (
                  <TableRow>
                    <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                      {isLoading ? <Box py={2.5}><PageLoader size={50} color={appPalette.black50} /></Box>
                        : <Placeholder icon={<EmptyListIcon />} subtitle={formatMessage('AgentHistory.placeholder')} />}
                    </TableCell>
                  </TableRow>
                ) : eventList?.map((row) => (<AgentEventRow key={row?._id} event={row} />))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Paper>
    </Box>
  );
}
