import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { ReviewModeExitModal } from 'apps/reviewMode/components/ReviewModeExitModal/ReviewModeExitModal';
import { StatusNotificationContent } from 'apps/reviewMode/components/StatusNotificationContent/StatusNotificationContent';
import { notification } from 'apps/ui';
import classNames from 'classnames';
import { Loadable } from 'models/Loadable.model';
import { VerificationResponse } from 'models/Verification.model';
import { QATags } from 'models/QA.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { ReviewModeVerificationNumber } from '../ReviewModeVerificationNumber/ReviewModeVerificationNumber';
import { reviewAwaitingCountLoad, reviewVerificationClear, verificationLoad, verificationSkip, verificationStatusChange } from '../../state/reviewMode.actions';
import { selectIsNoVerifications, selectReviewAwaitingCount, selectReviewIdentityId, selectReviewVerificationId, selectVerificationModel } from '../../state/reviewMode.selectors';
import { useStyles } from './ReviewModeHeaderMenu.styles';

export function ReviewModeHeaderMenu() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const [isStatusSetting, setIsStatusSetting] = useState<boolean>(false);
  const verification: Loadable<VerificationResponse> = useSelector(selectVerificationModel);
  const verificationNumber: string = useSelector(selectReviewVerificationId);
  const isNoVerification: boolean = useSelector(selectIsNoVerifications);
  const identityId: string = useSelector(selectReviewIdentityId);
  const reviewAwaitingCount: number = useSelector(selectReviewAwaitingCount);

  const handleExit = useCallback(async () => {
    if (verificationNumber) {
      await dispatch(verificationSkip());
    }
    await dispatch(reviewVerificationClear());
  }, [dispatch, verificationNumber]);

  const handleClickExit = useCallback(() => {
    createOverlay(<ReviewModeExitModal onExit={handleExit} closeOverlay={closeOverlay} />);
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
    await dispatch(sendWebhook(identityId));
    await handleLoadNext();
  }, [dispatch, handleLoadNext, identityId]);

  const handleClickSetStatus = useCallback((value) => {
    setIsStatusSetting(true);
    notification.success(<StatusNotificationContent onNext={handleSetStatus} status={value} />, {
      className: classes.notification,
      onClose: handleCancel,
      autoClose: false,
      closeButton: false,
    });
  }, [classes.notification, handleCancel, handleSetStatus]);

  const handleSetVerified = useCallback(() => handleClickSetStatus(IdentityStatuses.verified), [handleClickSetStatus]);
  const handleSetRejected = useCallback(() => handleClickSetStatus(IdentityStatuses.rejected), [handleClickSetStatus]);

  return (
    <Grid container direction="column" spacing={2}>
      {/* Review Awaiting Count */}
      <Grid item container justify="space-between" alignItems="center" spacing={2} className={classes.headerWrapper}>
        <Grid item xs={12} md={6}>
          <Box
            pr={{ xs: 7, md: 0 }}
            my={{ xs: 1, md: 0 }}
            color="common.yellow"
          >
            <Typography variant="h3">
              {intl.formatMessage(
                { id: 'ReviewMode.titleWithCount' },
                { count: <span data-qa={QATags.Review.VerificationCount}>{reviewAwaitingCount || 0}</span> },
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid container justify="flex-end" item xs={12} md={6}>
          {/* Exit Button */}
          <Grid item xs={12} md={6} xl={4} className={classes.buttonLogWrapper}>
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
      {verification.isLoaded && !verification.isLoading && (
        <Grid item container justify="space-between" alignItems="flex-end" spacing={2}>
          {/* Verification Number */}
          <Grid container item xs={12} md={2} spacing={2} className={classes.verificationNumber}>
            {verificationNumber && (
              <Grid item xs={12} md="auto" className={classes.number}>
                <ReviewModeVerificationNumber
                  summary={intl.formatMessage({ id: 'ReviewMode.summary.verificationId' })}
                  number={verificationNumber}
                />
              </Grid>
            )}
          </Grid>
          {!isStatusSetting && !isNoVerification && (
            <Grid container justify="flex-end" alignItems="flex-end" item xs={12} md={10} spacing={2} className={classes.controlsWrapper}>
              {/* Skip Button */}
              <Grid item xs={12} md={3} xl={2}>
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
              {/* Verified Button */}
              <Grid item xs={12} md={3} xl={2}>
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
              <Grid item xs={12} md={3} xl={2}>
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
