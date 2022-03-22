import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { ByFlows, ByStatuses, OpenFilter, useFilterParser } from 'apps/filter';
import { parseFromURL } from 'models/Filter.model';
import { getVerificationsFilterInitialState, verificationsCleanFilter, verificationsFilterInitialState, verificationsFilterStructure } from 'models/Identity.model';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { filterUpdate, identityListClear, verificationsListLoad, verificationsPreliminaryCountLoad } from 'state/identities/identities.actions';
import { selectIdentityFilter, selectPreliminaryFilteredCountModel } from 'state/identities/identities.selectors';
import { DownloadCSV } from 'apps/Csv';
import { useFormatMessage } from 'apps/intl';
import { selectMerchantCreatedAt, selectMerchantAgentNotesConfig } from 'state/merchant/merchant.selectors';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { WithAgent } from 'models/Collaborator.model';
import { VerificationTable } from '../VerificationTable/VerificationTable';
import { VerificationSearch } from '../VerificationSearch/VerificationSearch';
import { ManualReviewBanner } from '../ManualReviewBanner/ManualReviewBanner';
import { useStyles } from './VerificationList.styles';

export function VerificationList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const identityFilter = useSelector(selectIdentityFilter);
  const registrationDate = useSelector(selectMerchantCreatedAt);
  const agentNotesConfig = useSelector(selectMerchantAgentNotesConfig);
  const [setURLFromFilter, addToUrl] = useFilterParser(verificationsFilterStructure);

  useEffect(() => {
    if (!location.search) {
      setURLFromFilter(getVerificationsFilterInitialState(registrationDate));
    }
  }, [location.search, registrationDate, setURLFromFilter]);

  useEffect(() => {
    if (location.search) {
      dispatch(filterUpdate(parseFromURL(location.search, verificationsFilterStructure)));
      dispatch(verificationsListLoad(true));
    }
    return () => {
      if (!history.location.pathname.startsWith(Routes.identity.verification.root)) {
        dispatch(filterUpdate(verificationsFilterInitialState));
        dispatch(identityListClear());
      }
    };
  }, [dispatch, history, location]);

  return (
    <Container maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Grid container spacing={2} direction="column">
          <Grid item container justify="space-between">
            {/* search */}
            <Grid item xs={6}>
              <VerificationSearch onSetFilter={addToUrl} />
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              <Grid item>
                <Box mr={2} className={classes.downloadButton}>
                  <RoleRenderGuard roles={WithAgent}>
                    <DownloadCSV />
                  </RoleRenderGuard>
                </Box>
              </Grid>
              {/* identityFilter */}
              <Grid item>
                <OpenFilter
                  onSetFilter={addToUrl}
                  selectFilter={identityFilter}
                  loadPreliminaryCountAction={verificationsPreliminaryCountLoad}
                  preliminaryCountSelector={selectPreliminaryFilteredCountModel}
                  cleanFilter={verificationsCleanFilter}
                  qa={QATags.VerificationList.Filter}
                >
                  {/* @ts-ignore */}
                  <ByFlows />
                  {/* @ts-ignore */}
                  <ByStatuses />
                </OpenFilter>
              </Grid>
            </Grid>
          </Grid>
          {/* manual review banner */}
          {!agentNotesConfig?.requiredOnChangeVerificationStatus && <ManualReviewBanner />}
          {/* content */}
          <Grid item>
            <Paper className={classes.paper}>
              <Box px={2} pt={{ xs: 0, lg: 2 }} pb={{ xs: 2, lg: 1.4 }}>
                <Typography variant="subtitle2" className={classes.title}>
                  <Box component="span">
                    {formatMessage('VerificationHistory.title.withoutCount')}
                  </Box>
                </Typography>
              </Box>
              <Box mb={2} className={classes.table}>
                <VerificationTable />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
