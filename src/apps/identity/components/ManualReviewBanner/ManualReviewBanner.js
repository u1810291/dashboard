import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { IdentityStatuses } from '../../../../models/Status.model';
import { filterUpdate, identitiesManualReviewCountLoad } from '../../../../state/identities/identities.actions';
import { selectIdentityCountModel, selectIdentityFilter, selectManualReviewCountModel } from '../../../../state/identities/identities.selectors';
import { verificationsFilterInitialState } from '../../../filter';
import { useFilterUpdate } from '../../../filter/hooks/filterUpdate.hook';
import { useStyles } from './ManualReviewBanner.styles';

export const ManualReviewBanner = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const manualReviewCount = useSelector(selectManualReviewCountModel);
  const identityCount = useSelector(selectIdentityCountModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const [setFilter] = useFilterUpdate(identityFilter, filterUpdate);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    dispatch(identitiesManualReviewCountLoad());
  }, [dispatch, identityCount]);

  useEffect(() => {
    setIsFilterActive(identityFilter?.status?.some((status) => status === IdentityStatuses.reviewNeeded));
  }, [identityFilter.status]);

  const handleFilterByManualReview = useCallback(() => {
    setFilter({
      ...verificationsFilterInitialState,
      status: [IdentityStatuses.reviewNeeded],
    });
    setIsFilterActive(true);
  }, [setFilter]);

  const handleClearManualReview = useCallback(() => {
    const statuses = [...verificationsFilterInitialState.status];
    const newStatuses = statuses.filter((status) => status !== IdentityStatuses.reviewNeeded);
    setFilter({ status: newStatuses });
    setIsFilterActive(false);
  }, [setFilter]);

  return (
    <>
      {manualReviewCount.value > 0 && (
        <Grid item>
          <Paper className={classes.banner}>
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
                  {intl.formatMessage({ id: 'VerificationHistory.reviewVerifications' })}
                </Button>
                {isFilterActive && (
                  <Button
                    onClick={handleClearManualReview}
                    className={classes.bannerButtonClose}
                  >
                    <FiX />
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  );
};
