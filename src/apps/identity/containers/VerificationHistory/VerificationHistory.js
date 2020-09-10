import { Box, Container, Grid, Typography } from '@material-ui/core';
import { isPaginable, Pagination } from 'apps/pagination';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { identitiesCountLoad, identitiesFilteredCountLoad, identitiesListLoad } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityCollection, selectIdentityCountModel } from 'state/identities/identities.selectors';
import { DownloadCSV } from '../../components/DownloadCSV/DownloadCSV';
import { NoVerifications } from '../../components/NoVerifications/NoVerifications';
import { VerificationFilter } from '../../components/VerificationFilter/VerificationFilter';
import { VerificationSearch } from '../../components/VerificationSearch/VerificationSearch';
import { VerificationTable } from '../../components/VerificationTable/VerificationTable';
import { useFilter } from '../../hooks/filter.hook';

export function VerificationHistory() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const countModel = useSelector(selectIdentityCountModel);
  const filteredCountModel = useSelector(selectFilteredCountModel);
  const identityCollection = useSelector(selectIdentityCollection);
  const [filter, setFilter] = useFilter();

  const tableFilter = useCallback((params) => {
    if (params) {
      setFilter(params);
    }
    dispatch(identitiesListLoad());
    dispatch(identitiesFilteredCountLoad());
  }, [dispatch, setFilter]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(countModel)) {
      dispatch(identitiesCountLoad());
    }
  }, [dispatch, countModel]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(identityCollection)) {
      tableFilter();
    }
  }, [identityCollection, tableFilter]);

  const handlePageChange = useCallback((offset) => {
    tableFilter({ offset });
  }, [tableFilter]);

  const handleFilterChange = useCallback((params) => {
    tableFilter(params);
  }, [tableFilter]);

  if (countModel.isLoaded && countModel.value === 0) {
    return <NoVerifications />;
  }

  return (
    <Container>
      <Box py={3}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={9}>
            {/* header */}
            <Box pb={2}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h4">
                    <Box component="span">{intl.formatMessage({ id: 'VerificationHistory.title' })}</Box>
                    <Box component="span" fontWeight="normal">{` (${filteredCountModel.isLoaded ? filteredCountModel.value : 0})`}</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <DownloadCSV />
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2} direction="column">
              {/* search */}
              <Grid item>
                <Box width="50%">
                  <VerificationSearch
                    value={filter.search}
                    onChange={handleFilterChange}
                  />
                </Box>
              </Grid>
              {/* content */}
              <Grid item>
                <VerificationTable />
              </Grid>
              {/* pagination */}
              {filteredCountModel.isLoaded && identityCollection.isLoaded && isPaginable(filteredCountModel.value) && (
                <Grid item>
                  <Pagination
                    total={filteredCountModel.value}
                    offset={filter.offset}
                    onChange={handlePageChange}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <VerificationFilter
              values={filter}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
