import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filterUpdate, identitiesCountLoad, identitiesFilteredCountLoad, identitiesListLoad, identityListClear } from 'state/identities/identities.actions';
import { selectFilteredCountModel } from 'state/identities/identities.selectors';
import { DownloadCSV } from '../../components/DownloadCSV/DownloadCSV';
import { ManualReviewBanner } from '../../components/ManualReviewBanner/ManualReviewBanner';
import { OpenFilter } from '../../components/OpenFilter/OpenFilter';
import { VerificationSearch } from '../../components/VerificationSearch/VerificationSearch';
import { VerificationTable } from '../../components/VerificationTable/VerificationTable';
import { useFilterUpdate } from '../../hooks/filterUpdate.hook';
import { initialFilter, parseFromURL } from '../../models/filter.model';
import { useStyles } from './VerificationHistory.styles';
import { Routes } from '../../../../models/Router.model';

export function VerificationHistory() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const intl = useIntl();
  const filteredCountModel = useSelector(selectFilteredCountModel);
  const [setFilter] = useFilterUpdate();

  useEffect(() => {
    dispatch(identitiesCountLoad());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterUpdate(parseFromURL(location.search)));
    dispatch(identitiesListLoad(true));
    dispatch(identitiesFilteredCountLoad());
    return () => {
      if (!location.pathname.startsWith(Routes.list.root)) {
        dispatch(filterUpdate(initialFilter));
        dispatch(identityListClear());
      }
    };
  }, [dispatch, location]);

  return (
    <Container maxWidth={false}>
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
