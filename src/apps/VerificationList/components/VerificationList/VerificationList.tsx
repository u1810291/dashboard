import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { ByFlows, ByStatuses, OpenFilter, useFilterParser } from 'apps/filter';
import { parseFromURL } from 'models/Filter.model';
import { verificationsCleanFilter, verificationsFilterInitialState, verificationsFilterStructure } from 'models/Identity.model';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { filterUpdate, identityListClear, verificationsFilteredCountLoad, verificationsListLoad, verificationsPreliminaryCountLoad } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityFilter, selectPreliminaryFilteredCountModel } from 'state/identities/identities.selectors';
import { VerificationTable } from '../VerificationTable/VerificationTable';
import { VerificationSearch } from '../VerificationSearch/VerificationSearch';
import { ManualReviewBanner } from '../ManualReviewBanner/ManualReviewBanner';
import { DownloadCSV } from '../DownloadCSV/DownloadCSV';
import { useStyles } from './VerificationList.styles';

export function VerificationList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();
  const filteredCountModel = useSelector(selectFilteredCountModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const [, addToUrl] = useFilterParser(verificationsFilterStructure);

  useEffect(() => {
    dispatch(filterUpdate(parseFromURL(location.search, verificationsFilterStructure)));
    dispatch(verificationsListLoad(true));
    dispatch(verificationsFilteredCountLoad());
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
                  <DownloadCSV />
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
          <ManualReviewBanner />
          {/* content */}
          <Grid item>
            <Paper className={classes.paper}>
              <Box px={2} pt={{ xs: 0, lg: 2 }} pb={{ xs: 2, lg: 1.4 }}>
                <Typography variant="subtitle2" className={classes.title}>
                  <Box component="span">
                    {intl.formatMessage({ id: 'VerificationHistory.title' },
                      { count: filteredCountModel.isLoaded ? filteredCountModel.value : 0 })}
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