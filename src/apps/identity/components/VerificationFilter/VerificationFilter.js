import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { getFilterStatuses, getIdentityStatusLabel } from 'models/Identity.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiBox, FiCalendar, FiCheckCircle, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { identitiesPreliminaryCountLoad } from '../../../../state/identities/identities.actions';
import { selectIdentityFilter, selectPreliminaryFilteredCountModel } from '../../../../state/identities/identities.selectors';
import { selectMerchantFlowsModel } from '../../../../state/merchant/merchant.selectors';
import { useFilterUpdate } from '../../hooks/filterUpdate.hook';
import { DEFAULT_FLOW } from '../../models/filter.model';
import { DateRange } from '../DateRange/DateRange';
import { useStyles } from './VerificationFilter.styles';

export function VerificationFilter({ onClose }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [statuses] = useState(getFilterStatuses());
  const [setFilter] = useFilterUpdate();
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const preliminaryFilteredCountModel = useSelector(selectPreliminaryFilteredCountModel);
  const [bufferedFilter, setBufferedFilter] = useState({ flowId: '', ...identityFilter });

  const handleFilterChange = useCallback((params) => {
    setBufferedFilter((prevState) => ({ ...prevState, ...params }));
  }, [setBufferedFilter]);

  useEffect(() => {
    dispatch(identitiesPreliminaryCountLoad({ ...bufferedFilter }, true));
  },
  [bufferedFilter, dispatch]);

  const handleStatusClick = useCallback((id, isChecked) => {
    let newStatuses = [...bufferedFilter.status];
    if (isChecked) {
      if (!newStatuses.includes(id)) {
        newStatuses.push(id);
      }
    } else {
      newStatuses = newStatuses.filter((item) => item !== id);
    }
    handleFilterChange({ status: newStatuses });
  }, [bufferedFilter.status, handleFilterChange]);

  const handleDateChange = useCallback((dateRange) => {
    handleFilterChange(dateRange);
  }, [handleFilterChange]);

  const handleSelectFlow = useCallback(({ target: { value } }) => {
    const flowId = value === DEFAULT_FLOW ? '' : value;
    handleFilterChange({ flowId });
  }, [handleFilterChange]);

  const handleClearAll = useCallback(() => {
    handleFilterChange({
      status: [],
      flowId: '',
      'dateCreated[start]': null,
      'dateCreated[end]': null,
    });
  }, [handleFilterChange]);

  const handleApplyFilterChanges = useCallback(() => {
    setFilter({ ...bufferedFilter });
    onClose();
  }, [bufferedFilter, onClose, setFilter]);

  return (
    <Box>
      {/* header */}
      <Box className={classes.header}>
        <Typography variant="h4">{intl.formatMessage({ id: 'VerificationFilter.title' })}</Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={2} direction="column">
          {/* date range */}
          <Grid item>
            <Typography variant="subtitle2">
              <Box display="flex" alignItems="center" pb={1}>
                <FiCalendar />
                <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.date.title' })}</Box>
              </Box>
            </Typography>
            <DateRange
              start={bufferedFilter['dateCreated[start]']}
              end={bufferedFilter['dateCreated[end]']}
              onChange={handleDateChange}
            />
          </Grid>
          <Box className={classes.hr} mb={0.5} />
          <Grid container item spacing={3} className={classes.checks}>
            {/* flow */}
            <Grid item md={6}>
              <Typography variant="subtitle2">
                <Box display="flex" alignItems="center" pb={1}>
                  <FiBox />
                  <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.flows.title' })}</Box>
                </Box>
              </Typography>
              <Paper className={classes.flowsList}>
                <FormControl variant="outlined" fullWidth>
                  <RadioGroup aria-label="flow" value={bufferedFilter.flowId} onChange={handleSelectFlow}>
                    <FormControlLabel
                      value=""
                      control={<Radio color="default" />}
                      label={intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' })}
                    />
                    {!LoadableAdapter.isPristine(merchantFlowList) && merchantFlowList.value.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio color="default" />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            {/* status */}
            <Grid item md={6}>
              <Typography variant="subtitle2">
                <Box display="flex" alignItems="center" pb={1}>
                  <FiCheckCircle />
                  <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.status.title' })}</Box>
                </Box>
              </Typography>
              <Paper className={classes.status}>
                {statuses.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={(
                      <Checkbox
                        checked={bufferedFilter.status.includes(item.id)}
                        onChange={(event) => handleStatusClick(item.id, event.target.checked)}
                        value={item.id}
                        color="primary"
                      />
                    )}
                    label={(
                      <Typography className={classes[item.id]}>
                        {intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
                      </Typography>
                    )}
                  />
                ))}
              </Paper>
            </Grid>
          </Grid>
          <Grid />
        </Grid>
      </Box>
      {/* clear all */}
      <Box className={classes.footer}>
        <Box className={classes.footerLeft}>
          <Button
            className={classes.clearButton}
            onClick={handleClearAll}
            startIcon={<FiX />}
          >
            {intl.formatMessage({ id: 'VerificationFilter.clear-all' })}
          </Button>
          <Box>
            <Typography variant="body1" className={classes.resultsText}>
              {intl.formatMessage({ id: 'VerificationFilter.count.identities' }, { count: preliminaryFilteredCountModel.value })}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.footerRight}>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            onClick={handleApplyFilterChanges}
          >
            {intl.formatMessage({ id: 'VerificationFilter.button.viewResults' })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
