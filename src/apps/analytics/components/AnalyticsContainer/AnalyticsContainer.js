import { Box, Container, Grid } from '@material-ui/core';
import { selectFilter, selectStatisticsByDate, selectChartStatisticsModel, selectCountStatisticsModel } from 'apps/analytics/state/metrics.selectors';
import { ByCountries, ByFlows, OpenFilter, useFilterParser } from 'apps/filter';
import { DevicesStats } from 'apps/fingerPrint/components/DevicesStats/DevicesStats';
import { AnalyticsMap } from 'apps/googleMap/components/AnalyticsMap/AnalyticsMap';
import { PageLoader } from 'apps/layout';
import { analyticsCleanFilter, analyticsFilterStructure } from 'models/Analytics.model';
import { analyticsDatePickerRanges, FilterRangesByLocal, FilterRangeTypes, getFilterDatesIsValid, parseFromURL } from 'models/Filter.model';
import { QATags } from 'models/QA.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { identitiesManualReviewCountLoad } from 'state/identities/identities.actions';
import { selectManualReviewCountModel } from 'state/identities/identities.selectors';
import { filterUpdate, loadChartStatistics } from 'apps/analytics/state/metrics.actions';
import { countStatisticsLoad } from '../../state/metrics.actions';
import { DEFAULT_FLOW } from '../../models/MetricFilter.model';
import { byDateStub } from '../../models/Metrics.model';
import { Chart } from '../Chart/Chart';
import { DocumentsStats } from '../DocumentsStats/DocumentsStats';
import { DynamicHeader } from '../DynamicHeader/DynamicHeader';
import { NeedToReview } from '../NeedToReview/NeedToReview';
import { VerificationsTotal } from '../VerificationsTotal/VerificationsTotal';
import { useStyles } from './AnalyticsContainer.styles';

export function AnalyticsContainer() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [, addToUrl] = useFilterParser(analyticsFilterStructure);
  const [flows, setFlows] = useState([DEFAULT_FLOW]);
  const [isFilterDatesValid, setIsFilterDatesValid] = useState(false);
  const manualReviewCountModel = useSelector(selectManualReviewCountModel);
  const metricsFilter = useSelector(selectFilter);
  const { isLoading, isLoaded } = useSelector(selectChartStatisticsModel);
  const countStatisticsModel = useSelector(selectCountStatisticsModel);
  const byDate = useSelector(selectStatisticsByDate);

  useEffect(() => {
    dispatch(identitiesManualReviewCountLoad());
  }, [dispatch]);

  useEffect(() => {
    setIsFilterDatesValid(getFilterDatesIsValid(metricsFilter));
  }, [metricsFilter]);

  useEffect(() => {
    const parsedFilter = parseFromURL(location.search, analyticsFilterStructure);
    const { start, end } = FilterRangesByLocal[FilterRangeTypes.Last7Days].getMomentPeriod();
    const resultFilter = getFilterDatesIsValid(parsedFilter) ? parsedFilter : { ...analyticsCleanFilter, 'dateCreated[start]': start, 'dateCreated[end]': end };

    dispatch(filterUpdate(resultFilter));
    dispatch(loadChartStatistics(resultFilter));
    dispatch(countStatisticsLoad(resultFilter));
  }, [dispatch, location.search]);

  useEffect(() => {
    setFlows(metricsFilter?.flowIds?.length > 0 ? metricsFilter.flowIds : [DEFAULT_FLOW]);
  }, [dispatch, metricsFilter]);

  return (
    <Container maxWidth={false}>
      {isFilterDatesValid && !countStatisticsModel.isLoading && countStatisticsModel.isLoaded ? (
        <Box pb={2} className={classes.wrapper}>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <DynamicHeader flows={flows} />
              </Grid>
              <Grid container item xs={3} justify="flex-end">
                <OpenFilter qa={QATags.Analytics.FilterButton} onSetFilter={addToUrl} selectFilter={metricsFilter} onClearFilter={analyticsCleanFilter} datePickerRanges={analyticsDatePickerRanges}>
                  <ByFlows />
                  <ByCountries />
                </OpenFilter>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} direction="column">
            <Grid container spacing={2} item direction="column" className={classes.statistic}>
              {manualReviewCountModel.isLoaded && manualReviewCountModel?.value > 0 && (
              <Grid item md={4} lg={3}>
                <NeedToReview />
              </Grid>
              )}
              {manualReviewCountModel.isLoaded && manualReviewCountModel?.value > 0 ? (
                <Grid item md={8} lg={9} className={classes.total}>
                  <VerificationsTotal />
                </Grid>
              ) : (
                <Grid item md={12} className={classes.total}>
                  <VerificationsTotal />
                </Grid>
              )}
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
