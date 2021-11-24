import React, { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { collaboratorClear, collaboratorLoad } from 'apps/collaborators/state/collaborator.actions';
import { selectCollaborator } from 'apps/collaborators/state/collaborator.selectors';
import { Layout, PageError } from 'apps/layout';
import { Loader, notification } from 'apps/ui';
import { UserId } from 'models/Collaborator.model';
import { parseFromURL } from 'models/Filter.model';
import { Routes } from 'models/Router.model';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { agentHistoryCleanFilter, agentHistoryFilterStructure } from '../../models/AgentHistory.model';
import { clearAgentHistory, filterUpdate, loadAgentEventsCount, loadAgentHistory } from '../../state/agentHistory.actions';
import { AgentEventsTable } from '../AgentEventsTable/AgentEventsTable';
import { AgentHistoryMenu } from '../AgentHistoryMenu/AgentHistoryMenu';
import { AgentInformation } from '../AgentInformation/AgentInformation';

export function AgentHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id: collaboratorId }: { id: UserId } = useParams();
  const collaboratorModel = useSelector(selectCollaborator);
  const collaborator = collaboratorModel?.value;

  useEffect(() => {
    (async () => {
      if (!collaborator?.user?.id && collaboratorId) {
        try {
          setIsError(false);
          await dispatch(collaboratorLoad(collaboratorId));
        } catch (error) {
          setIsError(true);
          notification.error(intl.formatMessage({ id: 'AgentHistory.error.notFound' }));
          console.error(error);
        }
      }
    })();
    return () => {
      if (collaborator?.user?.id) {
        dispatch(collaboratorClear());
      }
    };
  }, [collaboratorId, collaborator?.user?.id, dispatch, intl]);

  useEffect(() => {
    (async () => {
      if (!collaboratorModel.isLoading && collaboratorModel?.isLoaded && collaboratorModel?.value?.user?.id === collaboratorId) {
        try {
          setIsLoading(true);
          setIsError(false);
          await dispatch(filterUpdate(parseFromURL(history.location.search, agentHistoryFilterStructure)));
          await dispatch(loadAgentEventsCount(collaboratorId));
          await dispatch(loadAgentHistory(collaboratorId, 1));
        } catch (error) {
          setIsError(true);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      if (!history.location.pathname.startsWith(Routes.collaborators.agentProfile.root)) {
        dispatch(filterUpdate(agentHistoryCleanFilter));
        dispatch(clearAgentHistory());
      }
    };
  }, [collaboratorId, collaboratorModel, dispatch, history.location.pathname, history.location.search]);

  if (isError) {
    return (
      <Layout>
        <PageError linkTo={Routes.settings.root} />
      </Layout>
    );
  }

  if (!collaboratorModel.isLoaded) {
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
          <AgentEventsTable isLoading={isLoading} />
        </Box>
      </Box>
    </Container>
  );
}
