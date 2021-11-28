import { Box, Paper, Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { appPalette } from 'apps/theme';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { selectCollaborator } from 'apps/collaborators/state/collaborator.selectors';
import { Placeholder } from 'apps/ui/components/Placeholder/Placeholder';
import { ReactComponent as EmptyListIcon } from 'assets/empty-list-round.svg';
import { selectAgentHistoryFilter, selectAgentHistoryLoadedCount, selectAgentHistoryModel, selectAgentHistoryEventsList, selectAgentHistoryTotalCount } from '../../state/agentHistory.selectors';
import { loadAgentHistory } from '../../state/agentHistory.actions';
import { useStyles } from './AgentEventsTable.styles';
import { AgentEventRow } from '../AgentEventRow/AgentEventRow';

export function AgentEventsTable({ isLoading }: {
  isLoading: boolean;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const collaboratorModel = useSelector(selectCollaborator);
  const agentHistoryFilter = useSelector(selectAgentHistoryFilter);
  const agentHistory = useSelector(selectAgentHistoryModel);
  const historyLoadedCount = useSelector(selectAgentHistoryLoadedCount) || 0;
  const historyTotalLength = useSelector(selectAgentHistoryTotalCount) || 0;
  const history = useSelector(selectAgentHistoryEventsList) || [];

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
  }, [agentHistory.isLoaded, agentHistory.isLoading, historyLoadedCount, historyTotalLength, page]);

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
              <TableBody data-qa={QATags.AgentHistory.HistoryTable}>
                {(historyTotalLength === 0 || isLoading) ? (
                  <TableRow>
                    <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                      {isLoading ? <Box py={2.5}><PageLoader size={50} color={appPalette.black50} /></Box>
                        : <Placeholder icon={<EmptyListIcon />} subtitle={intl.formatMessage({ id: 'AgentHistory.placeholder' })} />}
                    </TableCell>
                  </TableRow>
                ) : history?.map((row, index) => (<AgentEventRow key={index} event={row} />))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Paper>
    </Box>
  );
}
