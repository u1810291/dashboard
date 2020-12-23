import { Box, Grid, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { identitiesManualReviewCountLoad } from '../../../../state/identities/identities.actions';
import { selectManualReviewCountModel } from '../../../../state/identities/identities.selectors';
import { useStyles } from './NeedToReview.styles';
import { Routes } from '../../../../models/Router.model';

export const NeedToReview = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { value: manualReviewCount } = useSelector(selectManualReviewCountModel);

  useEffect(() => {
    dispatch(identitiesManualReviewCountLoad());
  }, [dispatch]);

  const handleButtonClick = useCallback(() => {
    history.push(`${Routes.list.root}?status=reviewNeeded`);
  }, [history]);

  return (
    <Paper className={classes.banner}>
      <Grid container direction="column" justify="center" className={classes.bannerWrapper}>
        <Box mb={0.5}>
          <Typography variant="h3">{manualReviewCount}</Typography>
        </Box>
        <Box pb={1.6}>
          <Typography>{intl.formatMessage({ id: 'Analytics.verificationTotal.manualReview' })}</Typography>
        </Box>
        <Box>
          <Button variant="outlined" className={classes.bannerButton} onClick={handleButtonClick}>
            {intl.formatMessage({ id: 'Analytics.verificationTotal.manualReview.button' })}
          </Button>
        </Box>
      </Grid>
    </Paper>
  );
};
