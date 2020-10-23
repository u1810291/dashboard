import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { IdentityStatuses } from '../../../../models/Identity.model';
import { selectManualReviewCountModel } from '../../../../state/identities/identities.selectors';
import { useFilterUpdate } from '../../hooks/filterUpdate.hook';
import { initialFilter } from '../../models/filter.model';
import { useStyles } from './ManualReviewBanner.styles';

export const ManualReviewBanner = () => {
  const intl = useIntl();
  const classes = useStyles();
  const manualReviewCount = useSelector(selectManualReviewCountModel);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [setFilter] = useFilterUpdate();

  const handleFilterByManualReview = useCallback(() => {
    setFilter({ ...initialFilter, status: [IdentityStatuses.reviewNeeded] });
    setIsFilterActive(true);
  }, [setFilter]);

  const handleClearManualReview = useCallback(() => {
    const statuses = [...initialFilter.status];
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
                {intl.formatMessage({ id: 'VerificationHistory.reviewVerifications' }) }
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
