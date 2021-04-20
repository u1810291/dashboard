import { Box, Button, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectManualReviewCountModel } from 'state/identities/identities.selectors';
import { useStyles } from './NeedToReview.styles';

export const NeedToReview = () => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const manualReviewCountModel = useSelector(selectManualReviewCountModel);

  const handleButtonClick = useCallback(() => {
    history.push(`${Routes.list.root}?status=reviewNeeded`);
  }, [history]);

  /*
  const handleGoToReviewMode = useCallback(() => {
    history.push({ pathname: Routes.review.root, state: { from: history.location.pathname } });
  }, [history]);
*/

  return (
    <Paper className={classes.banner}>
      <Grid container direction="column" justify="center" className={classes.bannerWrapper}>
        <Box mb={0.5}>
          <Typography variant="h3" data-qa={QATags.Review.VerificationCount}>
            {manualReviewCountModel?.value}
          </Typography>
        </Box>
        <Box pb={1.6}>
          <Typography>{intl.formatMessage({ id: 'Analytics.verificationTotal.manualReview' })}</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.bannerButton}
              onClick={handleButtonClick}
              data-qa={QATags.Review.Banner.ShowVerifications}
            >
              {intl.formatMessage({ id: 'Analytics.verificationTotal.manualReview.button' })}
            </Button>
          </Grid>
          {/* // TODO: enable review mode button */}
          {/*
          <Grid item>
            <Button
              variant="outlined"
              className={classnames(classes.bannerButton, classes.bannerButtonMode)}
              onClick={handleGoToReviewMode}
              data-qa={QATags.Review.Banner.ReviewMode}
            >
              {intl.formatMessage({ id: 'ReviewMode.button.title' })}
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
};
