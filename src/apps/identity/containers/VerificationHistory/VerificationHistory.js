import { Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filterUpdate, identitiesCountLoad, identitiesFilteredCountLoad, identitiesListLoad, identitiesManualReviewCountLoad } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectManualReviewCountModel } from 'state/identities/identities.selectors';
import { DownloadCSV } from '../../components/DownloadCSV/DownloadCSV';
import { OpenFilter } from '../../components/OpenFilter/OpenFilter';
import { VerificationSearch } from '../../components/VerificationSearch/VerificationSearch';
import { VerificationTable } from '../../components/VerificationTable/VerificationTable';
import { useFilterUpdate } from '../../hooks/filterUpdate.hook';
import { initialFilter, parseFromURL } from '../../models/filter.model';
import { useStyles } from './VerificationHistory.styles';

export function VerificationHistory() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const intl = useIntl();
  const filteredCountModel = useSelector(selectFilteredCountModel);
  const manualReviewCount = useSelector(selectManualReviewCountModel);
  const [setFilter] = useFilterUpdate();

  useEffect(() => {
    dispatch(identitiesCountLoad());
    dispatch(identitiesManualReviewCountLoad());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterUpdate(parseFromURL(location.search)));
    dispatch(identitiesListLoad(true));
    dispatch(identitiesFilteredCountLoad());
    return () => {
      if (!location.pathname.startsWith('/identity')) {
        dispatch(filterUpdate(initialFilter));
      }
    };
  }, [dispatch, location]);

  const handleFilterByManualReview = useCallback(() => {
    setFilter({ ...initialFilter, status: ['reviewNeeded'] });
  }, [setFilter]);

  return (
    <Container maxWidth="initial">
      <Box pt={{ xs: 2, lg: 4 }}>
        <Grid container spacing={2} direction="column">
          <Grid item container justify="space-between">
            {/* search */}
            <Grid item xs={6}>
              <VerificationSearch setFilter={setFilter} />
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              <Grid item>
                <Box mr={2} className={classes.downloadButton}>
                  <DownloadCSV />
                </Box>
              </Grid>
              {/* identityFilter */}
              <Grid item>
                <OpenFilter setFilter={setFilter} />
              </Grid>
            </Grid>
          </Grid>
          {/* manual review banner */}
          {manualReviewCount.value > 0
          && (
          <Grid item>
            <Paper className={classes.banner}>
              <Box py={{ xs: 1.4, lg: 1 }} px={2}>
                <Grid container justify="space-between" alignItems="center" className={classes.bannerWrapper}>
                  <Grid item>
                    <Typography variant="body1" className={classes.bannerText}>
                      {intl.formatMessage({
                        id: 'VerificationHistory.manualReviewBanner',
                      }, {
                        count: <b>{manualReviewCount.value}</b>,
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      className={classes.bannerButton}
                      onClick={handleFilterByManualReview}
                    >
                      {intl.formatMessage({ id: 'VerificationHistory.reviewVerifications' }) }
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          )}
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
