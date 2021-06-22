import { Box, Container } from '@material-ui/core';
import { collaboratorClear, collaboratorLoad } from 'apps/collaborators/state/collaborator.actions';
import { selectCollaborator } from 'apps/collaborators/state/collaborator.selectors';
import { DashboardMenu } from 'apps/dashboard/components/DashboardMenu/DashboardMenu';
import { Layout, PageError } from 'apps/layout';
import { Loader, notification } from 'apps/ui';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { parseFromURL } from 'models/Filter.model';
import { agentHistoryCleanFilter, agentHistoryFilterStructure } from 'models/History.model';
import { Routes } from 'models/Router.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { clearAgentHistory, filterUpdate, loadAgentEventsCount, loadAgentHistory } from '../../state/agentHistory.actions';
import { selectAgentHistoryModel } from '../../state/agentHistory.selectors';
import { AgentEventsTable } from '../AgentEventsTable/AgentEventsTable';
import { AgentHistoryMenu } from '../AgentHistoryMenu/AgentHistoryMenu';
import { AgentInformation } from '../AgentInformation/AgentInformation';

export function AgentHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const [isError, setIsError] = useState(false);
  const { id: collaboratorId } = useParams();
  const collaboratorModel = useSelector(selectCollaborator);
  const agentHistoryModel = useSelector(selectAgentHistoryModel);
  const collaborator = collaboratorModel?.value;

  useEffect(() => {
    if (LoadableAdapter.isPristine(collaboratorModel) && collaboratorId) {
      try {
        dispatch(collaboratorLoad(collaboratorId));
      } catch (error) {
        notification.error(intl.formatMessage({ id: 'Error.common' }));
        console.error(error);
      }
    }
    return () => {
      if (!history.location.pathname.startsWith(Routes.collaborators.agentProfile.root)) {
        dispatch(collaboratorClear());
      }
    };
  }, [collaboratorId, collaboratorModel, dispatch, history.location.pathname, intl]);

  useEffect(() => {
    const loadData = async () => {
      if (!collaboratorModel.isLoading && collaboratorModel?.isLoaded && collaboratorId) {
        try {
          dispatch(filterUpdate(parseFromURL(history.location.search, agentHistoryFilterStructure)));
          dispatch(loadAgentHistory(collaboratorId, 1));
          dispatch(loadAgentEventsCount(collaboratorId));
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };

    loadData();
    return () => {
      if (!history.location.pathname.startsWith(Routes.collaborators.agentProfile.root)) {
        dispatch(filterUpdate(agentHistoryCleanFilter));
        dispatch(clearAgentHistory());
      }
    };
  }, [collaboratorId, collaboratorModel, dispatch, history.location.pathname, history.location.search]);

  if (isError) {
    return (
      <Layout menu={<DashboardMenu />}>
        <PageError />
      </Layout>
    );
  }

  if (!collaboratorModel.isLoaded || !agentHistoryModel.isLoaded) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={2}>
          <AgentHistoryMenu collaborator={collaborator} />
        </Box>
        <AgentInformation collaborator={collaborator} />
        <Box>
          <AgentEventsTable />
        </Box>
      </Box>
    </Container>
  );
}
