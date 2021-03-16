import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { verificationsFilterInitialState, verificationsFilterStructure } from 'apps/filter';
import { useFilterParser } from 'apps/filter/hooks/filterURL.hook';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { identitiesManualReviewCountLoad } from 'state/identities/identities.actions';
import { selectIdentityFilter, selectManualReviewCountModel } from 'state/identities/identities.selectors';
import { useStyles } from './ManualReviewBanner.styles';

export const ManualReviewBanner = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const manualReviewCount = useSelector(selectManualReviewCountModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const [, addToUrl] = useFilterParser(verificationsFilterStructure);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    dispatch(identitiesManualReviewCountLoad());
  }, [dispatch]);

  useEffect(() => {
    setIsFilterActive(identityFilter?.status?.some((status) => status === IdentityStatuses.reviewNeeded));
  }, [identityFilter.status]);

  const handleFilterByManualReview = useCallback(() => {
    addToUrl({
      ...verificationsFilterInitialState,
      status: [IdentityStatuses.reviewNeeded],
    });
    setIsFilterActive(true);
  }, [addToUrl]);

  const handleClearManualReview = useCallback(() => {
    const statuses = [...verificationsFilterInitialState.status];
    const newStatuses = statuses.filter((status) => status !== IdentityStatuses.reviewNeeded);
    addToUrl({ status: newStatuses });
    setIsFilterActive(false);
  }, [addToUrl]);

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
