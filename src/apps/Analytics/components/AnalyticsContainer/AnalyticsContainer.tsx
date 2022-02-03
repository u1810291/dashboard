import { Box, Container, Grid } from '@material-ui/core';
import { ByCountries, ByFlows, OpenFilter, useFilterParser } from 'apps/filter';
import { AnalyticsMap } from 'apps/googleMap/components/AnalyticsMap/AnalyticsMap';
import { PageLoader } from 'apps/layout';

import { analyticsCleanFilter, analyticsFilterStructure } from 'models/Analytics.model';
import { analyticsDatePickerRanges, FilterRangesByLocal, FilterRangeTypes, getFilterDatesIsValid, parseFromURL } from 'models/Filter.model';
import { QATags } from 'models/QA.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'lib/url';
import { useIntl } from 'react-intl';
import { StepsCheckboxes } from '../StepsCheckboxes/StepsCheckboxes';
import { DEFAULT_FLOW } from '../../models/MetricFilter.model';
import { byDateStub } from '../../models/Metrics.model';
import { countStatisticsLoad, filterUpdate, loadChartStatistics } from '../../state/Analytics.actions';
import { selectCountStatisticsModel, selectFilter, selectStatisticsByDate } from '../../state/Analytics.selectors';
import { Chart } from '../Chart/Chart';
import { DevicesStats } from '../DevicesStats/DevicesStats';
import { DocumentsStats } from '../DocumentsStats/DocumentsStats';
import { DynamicHeader } from '../DynamicHeader/DynamicHeader';
import { VerificationsTotal } from '../VerificationsTotal/VerificationsTotal';
import { useStyles } from './AnalyticsContainer.styles';

export function AnalyticsContainer() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [, addToUrl] = useFilterParser(analyticsFilterStructure);
  const [flows, setFlows] = useState([DEFAULT_FLOW]);
  const [isFilterDatesValid, setIsFilterDatesValid] = useState(false);
  const metricsFilter = useSelector(selectFilter);
  const countStatisticsModel = useSelector(selectCountStatisticsModel);
  const byDate = useSelector(selectStatisticsByDate);
  const { asMerchantId } = useQuery();

  useEffect(() => {
    setIsFilterDatesValid(getFilterDatesIsValid(metricsFilter));
  }, [metricsFilter]);

  useEffect(() => {
    const parsedFilter = parseFromURL(location.search, analyticsFilterStructure);
    const { start, end } = FilterRangesByLocal[FilterRangeTypes.Last7Days].getDateRange();
    const resultFilter = getFilterDatesIsValid(parsedFilter) ? parsedFilter : { ...analyticsCleanFilter, 'dateCreated[start]': start, 'dateCreated[end]': end };

    dispatch(filterUpdate(resultFilter));
    dispatch(loadChartStatistics(resultFilter, asMerchantId));
    dispatch(countStatisticsLoad(resultFilter, asMerchantId));
  }, [dispatch, location.search, asMerchantId]);

  useEffect(() => {
    setFlows(metricsFilter?.flowIds?.length > 0 ? metricsFilter.flowIds : [DEFAULT_FLOW]);
  }, [dispatch, metricsFilter]);

  return (
    <Container maxWidth={false}>
      {isFilterDatesValid && !countStatisticsModel.isLoading && countStatisticsModel.isLoaded ? (
        <Box pb={2} className={classes.wrapper}>
          <StepsCheckboxes />
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <DynamicHeader flows={flows} />
              </Grid>
              <Grid container item xs={3} justify="flex-end">
                <OpenFilter qa={QATags.Analytics.FilterButton} onSetFilter={addToUrl} selectFilter={metricsFilter} cleanFilter={analyticsCleanFilter} datePickerRanges={analyticsDatePickerRanges}>
                  <ByFlows />
                  <ByCountries />
                </OpenFilter>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} direction="column">
            <Grid container spacing={2} item direction="column" className={classes.statistic}>
              <Grid item md={12} className={classes.total}>
                <VerificationsTotal />
              </Grid>
            </Grid>
            <Grid item className={classes.chartWrapper}>
              <Chart
                data={byDate}
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
        <Box className={classes.loaderWrapper}>
          <PageLoader />
        </Box>
      )}
    </Container>
  );
}
