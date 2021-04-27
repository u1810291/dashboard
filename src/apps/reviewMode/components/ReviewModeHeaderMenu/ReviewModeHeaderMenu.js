import { Box, Button, Grid, Typography } from '@material-ui/core';
import { VerificationNumber } from 'apps/identity/components/VerificationNumber/VerificationNumber';
import { useOverlay } from 'apps/overlay';
import { ReviewModeExitModal } from 'apps/reviewMode/components/ReviewModeExitModal/ReviewModeExitModal';
import { StatusNotificationContent } from 'apps/reviewMode/components/StatusNotificationContent/StatusNotificationContent';
import { notification } from 'apps/ui';
import classNames from 'classnames';
import { QATags } from 'models/QA.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, DateFormat } from 'lib/date';
import { reviewAwaitingCountLoad, reviewVerificationClear, verificationLoad, verificationSkip, verificationStatusChange } from '../../state/reviewMode.actions';
import { selectIsNoVerifications, selectReviewAwaitingCount, selectReviewIdentityId, selectReviewVerificationDateCreated, selectReviewVerificationId, selectVerificationModel } from '../../state/reviewMode.selectors';
import { useStyles } from './ReviewModeHeaderMenu.styles';

export function ReviewModeHeaderMenu() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const [isStatusSetting, setIsStatusSetting] = useState(false);
  const { isLoading, isLoaded } = useSelector(selectVerificationModel);
  const verificationNumber = useSelector(selectReviewVerificationId);
  const createdAt = useSelector(selectReviewVerificationDateCreated);
  const isNoVerification = useSelector(selectIsNoVerifications);
  const identityId = useSelector(selectReviewIdentityId);
  const reviewAwaitingCount = useSelector(selectReviewAwaitingCount);

  const handleExit = useCallback(async () => {
    if (verificationNumber) {
      await dispatch(verificationSkip());
    }
    await dispatch(reviewVerificationClear());
  }, [dispatch, verificationNumber]);

  const handleClickExit = useCallback(() => {
    createOverlay(
      <ReviewModeExitModal onExit={handleExit} closeOverlay={closeOverlay} />);
  }, [closeOverlay, createOverlay, handleExit]);

  const handleCancel = useCallback(() => {
    setIsStatusSetting(false);
  }, []);

  const handleLoadNext = useCallback(async () => {
    await dispatch(verificationLoad());
    await dispatch(reviewAwaitingCountLoad());
  }, [dispatch]);

  const handleSkipAndNext = useCallback(async () => {
    if (verificationNumber) {
      await dispatch(verificationSkip());
      await handleLoadNext();
    }
  }, [dispatch, handleLoadNext, verificationNumber]);

  const handleSetStatus = useCallback(async (status) => {
    await dispatch(verificationStatusChange(status));
    await handleLoadNext();
  }, [dispatch, handleLoadNext]);

  const handleClickSetStatus = useCallback((value) => {
    setIsStatusSetting(true);
    const notificationOptions = {
      className: classes.notification,
      onClose: handleCancel,
      autoClose: false,
      closeButton: false,
    };
    notification.success(<StatusNotificationContent onCancel={handleCancel} onNext={handleSetStatus} status={value} />, notificationOptions);
  }, [classes.notification, handleCancel, handleSetStatus]);

  const handleSetVerified = useCallback(() => handleClickSetStatus(IdentityStatuses.verified), [handleClickSetStatus]);
  const handleSetRejected = useCallback(() => handleClickSetStatus(IdentityStatuses.rejected), [handleClickSetStatus]);

  return (
    <Grid container direction="column" spacing={2}>
      {/* Review Awaiting Count */}
      <Grid item container justify="space-between" alignItems="center" spacing={2}>
        <Grid item xs={12} md={3}>
          <Box pr={{ xs: 7, md: 0 }} my={{ xs: 1, md: 0 }} color="common.yellow">
            <Typography variant="h3">
              {intl.formatMessage(
                { id: 'ReviewMode.titleWithCount' },
                { count: <span data-qa={QATags.Review.VerificationCount}>{reviewAwaitingCount || 0}</span> },
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid container justify="flex-end" item xs={12} md={6}>
          {/* Skip Button */}
          <Grid item xs={12} md={5}>
            <Button
              onClick={handleSkipAndNext}
              variant="outlined"
              disabled={isStatusSetting}
              fullWidth
              className={classes.buttonOutlined}
              data-qa={QATags.Review.Page.Buttons.Skip}
            >
              {intl.formatMessage({ id: 'ReviewMode.button.skipVerification' })}
            </Button>
          </Grid>
          {/* Exit Button */}
          <Grid item xs={12} md={5} className={classes.buttonLogWrapper}>
            <Button
              onClick={handleClickExit}
              variant="outlined"
              disabled={isStatusSetting}
              fullWidth
              className={classNames(classes.buttonOutlined, classes.buttonLog)}
              data-qa={QATags.Review.Page.Buttons.Exit}
            >
              <FiLogOut />
              {intl.formatMessage({ id: 'ReviewMode.button.exitReviewMode' })}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Verification Number */}
      {isLoaded && !isLoading && (

        <Grid item container justify="space-between" alignItems="center" spacing={2}>
          <Grid container item xs={12} md={6} spacing={2}>
            {createdAt && (
              <Grid item xs={12} md={6} className={classes.number}>
                <Box className={classes.verificationDate} py={{ xs: 0, md: 0.5 }}>
                  <Typography variant="subtitle2" gutterBottom>{formatDate(createdAt, DateFormat.DateTime)}</Typography>
                  <Typography className={classes.verificationDateTitle} variant="body1">{intl.formatMessage({ id: 'identity.summary.date' })}</Typography>
                </Box>
              </Grid>
            )}

            {identityId && (
              <Grid item xs={12} md={6} className={classes.number}>
                <Box py={{ xs: 0, md: 0.5 }}>
                  <VerificationNumber summary={intl.formatMessage({ id: 'ReviewMode.summary.identityId' })} number={identityId} />
                </Box>
              </Grid>
            )}
          </Grid>

          {!isStatusSetting && !isNoVerification && (
            <Grid container justify="flex-end" item xs={12} md={6}>
              {/* Verified Button */}
              <Grid item xs={12} md={5}>
                <Button
                  onClick={handleSetVerified}
                  variant="contained"
                  fullWidth
                  className={classNames(classes.button, classes.buttonVerified)}
                  data-qa={QATags.Review.Page.Buttons.Verified}
                >
                  {intl.formatMessage({ id: 'statuses.verified' })}
                </Button>
              </Grid>
              {/* Reject Button */}
              <Grid item xs={12} md={5} className={classes.buttonRejectedWrapper}>
                <Button
                  onClick={handleSetRejected}
                  variant="contained"
                  fullWidth
                  className={classNames(classes.button, classes.buttonRejected)}
                  data-qa={QATags.Review.Page.Buttons.Rejected}
                >
                  {intl.formatMessage({ id: 'statuses.rejected' })}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
