import { Box, Container, Grid } from '@material-ui/core';
import { filterUpdate, loadStatistics } from 'apps/analytics/state/metrics.actions';
import { selectFilter, selectStatistics, selectStatisticsByDate } from 'apps/analytics/state/metrics.selectors';
import { analyticsClearFilter, analyticsFilterStructure, ByCountries, ByFlows, OpenFilter } from 'apps/filter';
import { useFilterUpdate } from 'apps/filter/hooks/filterUpdate.hook';
import { DevicesStats } from 'apps/fingerPrint/components/DevicesStats/DevicesStats';
import { AnalyticsMap } from 'apps/googleMap/components/AnalyticsMap/AnalyticsMap';
import { PageLoader } from 'apps/layout';
import { analyticsDatePickerRanges, FilterRangesByLocal, FilterRangeTypes, getFilterDatesIsValid, parseFromURL } from 'models/Filter.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DEFAULT_FLOW } from '../../models/MetricFilter.model';
import { byDateStub } from '../../models/Metrics.model';
import { Chart } from '../Chart/Chart';
import { DocumentsStats } from '../DocumentsStats/DocumentsStats';
import { DynamicHeader } from '../DynamicHeader/DynamicHeader';
import { NeedToReview } from '../NeedToReview/NeedToReview';
import { VerificationsTotal } from '../VerificationsTotal/VerificationsTotal';
import { useStyles } from './AnalyticsContainer.styles';
import { QATags } from '../../../../models/QA.model';

export function AnalyticsContainer() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const metricsFilter = useSelector(selectFilter);
  const [setFilter] = useFilterUpdate(metricsFilter, filterUpdate);
  const { isLoading, isLoaded } = useSelector(selectStatistics);
  const byDate = useSelector(selectStatisticsByDate);
  const [flows, setFlows] = useState([DEFAULT_FLOW]);
  const [isFilterDatesValid, setIsFilterDatesValid] = useState(false);

  useEffect(() => {
    setIsFilterDatesValid(getFilterDatesIsValid(metricsFilter));
  }, [metricsFilter]);

  useEffect(() => {
    const parsedFilter = parseFromURL(location.search, analyticsFilterStructure);
    const { start, end } = FilterRangesByLocal[FilterRangeTypes.Last7Days].getMomentPeriod();
    const resultFilter = getFilterDatesIsValid(parsedFilter) ? parsedFilter : { ...analyticsClearFilter, 'dateCreated[start]': start, 'dateCreated[end]': end };

    dispatch(filterUpdate(resultFilter));
    dispatch(loadStatistics(resultFilter));
  }, [dispatch, location.search]);

  useEffect(() => {
    setFlows(metricsFilter?.flowIds?.length > 0 ? metricsFilter.flowIds : [DEFAULT_FLOW]);
  }, [dispatch, metricsFilter.flowIds]);

  return (
    <Container maxWidth={false}>
      {isFilterDatesValid ? (
        <Box pb={2} className={classes.wrapper}>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <DynamicHeader flows={flows} />
              </Grid>
              <Grid container item xs={3} justify="flex-end">
                <OpenFilter qa={QATags.Analytics.FilterButton} onSetFilter={setFilter} selectFilter={metricsFilter} onClearFilter={analyticsClearFilter} datePickerRanges={analyticsDatePickerRanges}>
                  <ByFlows />
                  <ByCountries />
                </OpenFilter>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} direction="column">
            <Grid container spacing={2} item direction="column" className={classes.statistic}>
              <Grid item md={4} lg={3}>
                <NeedToReview />
              </Grid>
              <Grid item md={8} lg={9} className={classes.total}>
                <VerificationsTotal />
              </Grid>
            </Grid>
            <Grid item className={classes.chartWrapper}>
              <Chart
                data={byDate}
                isLoading={isLoading}
                isLoaded={isLoaded}
                stub={byDateStub}
              />
            </Grid>
            <Grid item>
              <DocumentsStats />
            </Grid>
            <Grid item>
              <AnalyticsMap />
            </Grid>
            <Grid item>
              <DevicesStats />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <PageLoader />
        </Box>
      )}
    </Container>
  );
}
