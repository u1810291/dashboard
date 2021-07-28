import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { useFilterParser } from 'apps/filter/hooks/filterURL.hook';
import classnames from 'classnames';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { verificationsManualReviewCountLoad } from 'state/identities/identities.actions';
import { selectIdentityFilter, selectManualReviewCountModel } from 'state/identities/identities.selectors';
import { verificationsFilterInitialState, verificationsFilterStructure } from 'models/Identity.model';
import { useStyles } from './ManualReviewBanner.styles';

export function ManualReviewBanner() {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const manualReviewCount = useSelector(selectManualReviewCountModel);
  const identityFilter = useSelector(selectIdentityFilter);
  const [, addToUrl] = useFilterParser(verificationsFilterStructure);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    dispatch(verificationsManualReviewCountLoad());
  }, [dispatch]);

  useEffect(() => {
    setIsFilterActive(identityFilter?.status?.some((status) => status === IdentityStatuses.reviewNeeded));
  }, [identityFilter, identityFilter.status]);

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

  const handleGoToReviewMode = useCallback(() => {
    history.push({ pathname: Routes.review.root, state: { from: history.location.pathname } });
  }, [history]);

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
                    count: <b data-qa={QATags.Review.VerificationCount}>{manualReviewCount.value}</b>,
                  })}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  className={classnames(classes.bannerButton, classes.bannerButtonVerifications)}
                  onClick={handleFilterByManualReview}
                  data-qa={QATags.Review.Banner.ShowVerifications}
                >
                  {intl.formatMessage({ id: 'VerificationHistory.reviewVerifications' })}
                </Button>
                <Button
                  variant="contained"
                  className={classnames(classes.bannerButton, classes.bannerButtonMode, {
                    [classes.bannerButtonModeFilter]: isFilterActive,
                  })}
                  onClick={handleGoToReviewMode}
                  data-qa={QATags.Review.Banner.ReviewMode}
                >
                  {intl.formatMessage({ id: 'ReviewMode.button.title' })}
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
}
