import { Box, Container } from '@material-ui/core';
import { collaboratorListLoad } from 'apps/collaborators/state/collaborator.actions';
import { selectCollaboratorCollectionModel } from 'apps/collaborators/state/collaborator.selectors';
import { DashboardMenu } from 'apps/dashboard/components/DashboardMenu/DashboardMenu';
import { Layout, PageError } from 'apps/layout';
import { Loader } from 'apps/ui';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { parseFromURL } from 'models/Filter.model';
import { verificationHistoryCleanFilter, verificationHistoryFilterStructure } from 'models/History.model';
import { Routes } from 'models/Router.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { clearVerificationHistory, filterUpdate, loadVerificationEventsCount, loadVerificationHistory } from '../../state/verificationHistory.actions';
import { selectVerificationChangesModel } from '../../state/verificationHistory.selectors';
import { VerificationHistoryHeaderMenu } from '../VerificationHistoryHeaderMenu/VerificationHistoryHeaderMenu';
import { VerificationHistoryTable } from '../VerificationHistoryTable/VerificationHistoryTable';

export function VerificationHistory() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const { id: identityId } = useParams();
  const verificationChangesModel = useSelector(selectVerificationChangesModel);
  const collaborators = useSelector(selectCollaboratorCollectionModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(collaborators)) {
        try {
          dispatch(collaboratorListLoad());
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      }
    };
    loadData();
  }, [collaborators, dispatch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(filterUpdate(parseFromURL(location.search, verificationHistoryFilterStructure)));
        dispatch(loadVerificationHistory(identityId, 1));
        dispatch(loadVerificationEventsCount(identityId));
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };

    loadData();
    return () => {
      if (!history.location.pathname.startsWith(Routes.list.history.root)) {
        dispatch(filterUpdate(verificationHistoryCleanFilter));
        dispatch(clearVerificationHistory());
      }
    };
  }, [dispatch, history, location, identityId]);

  if (isError) {
    return (
      <Layout menu={<DashboardMenu />}>
        <PageError />
      </Layout>
    );
  }

  if (!verificationChangesModel.isLoaded || collaborators.isLoading || !collaborators.isLoaded) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={2}>
          <VerificationHistoryHeaderMenu />
        </Box>
        <VerificationHistoryTable identityId={identityId} />
      </Box>
    </Container>
  );
}
