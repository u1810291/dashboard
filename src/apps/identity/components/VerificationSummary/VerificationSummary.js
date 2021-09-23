import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { PremiumAmlWatchlistsMonitoringNotification } from 'apps/Aml/components/PremiumAmlWatchlistsMonitoringNotification/PremiumAmlWatchlistsMonitoringNotification';
import { VerificationBioCheckSummary } from 'apps/biometrics';
import { VerificationDeviceCheckCard } from 'apps/DeviceFingerPrint';
import { notification } from 'apps/ui';
import { verificationStatusUpdate } from 'apps/Verification/state/Verification.actions';
import { get } from 'lodash';
import { getDevicePlatformType, PlatformTypes } from 'models/DeviceCheck.model';
import { getStatusById, IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { selectReviewVerificationWithExtras } from 'apps/Verification/state/Verification.selectors';
import { StatusSelector } from 'apps/Verification';
import { VerificationNumber } from 'apps/Verification/components/VerificationNumber/VerificationNumber';
import { VerificationDate } from 'apps/Verification/components/VerificationDate/VerificationDate';
import { WithAgent } from 'models/Collaborator.model';
import { useRole } from 'apps/collaborators';
import { VerificationDocument } from '../VerificationDocument/VerificationDocument';
import { VerificationFlow } from '../VerificationFlow/VerificationFlow';
import { VerificationIpCheck } from '../VerificationIpCheck/VerificationIpCheck';
import { VerificationSource } from '../VerificationSource/VerificationSource';
import { useStyles } from './VerificationSummary.styles';

export function VerificationSummary({ identity }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const isFallback = useRef(false);
  const currentStatus = useRef(getStatusById(identity.status));
  const previousStatus = useRef(null);
  const [status, setStatus] = useState(currentStatus.current);
  const verification = useSelector(selectReviewVerificationWithExtras);
  const role = useRole();

  const handleUpdateIdentity = useCallback(async (value) => {
    await dispatch(verificationStatusUpdate(verification.id, value));
    await dispatch(sendWebhook(identity?.id));
    notification.info(intl.formatMessage({ id: 'identities.details.webhook.success' }));
  }, [dispatch, verification.id, identity, intl]);

  const handleCloseNotification = useCallback(() => {
    if (isFallback.current) {
      currentStatus.current = { ...previousStatus.current };
      setStatus(currentStatus.current);
      return;
    }
    handleUpdateIdentity(currentStatus.current.id);
  }, [currentStatus, previousStatus, handleUpdateIdentity]);

  const handleEnableFallback = useCallback(() => {
    isFallback.current = true;
  }, []);

  const handleStatusChange = useCallback(async (id) => {
    const newStatus = getStatusById(id);
    if (!(newStatus.isSelectable && currentStatus.current.isChangeable && newStatus.id !== currentStatus.id)) {
      return;
    }

    previousStatus.current = { ...currentStatus.current };
    currentStatus.current = { ...newStatus };
    setStatus(currentStatus.current);
    setOpen(false);
    if (identity.premiumAmlWatchlistsMonitoringStep) {
      isFallback.current = false;
      const isSwitchedToVerified = newStatus.id === IdentityStatuses.verified;
      await notification.info((
        <PremiumAmlWatchlistsMonitoringNotification
          isSwitchedToVerified={isSwitchedToVerified}
          onEnableFallback={handleEnableFallback}
        />
      ), {
        className: classes.ongoingMonitoringNotification,
        onClose: handleCloseNotification,
      });
    } else {
      handleUpdateIdentity(currentStatus.current.id);
    }
  }, [classes, identity, currentStatus, handleCloseNotification, handleEnableFallback, handleUpdateIdentity]);

  const { ipCheck, biometric, deviceFingerprint } = identity;

  const verificationFlowName = get(identity, '_embedded.verification.flow.name', null);
  const platformType = getDevicePlatformType(deviceFingerprint);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2" gutterBottom>
            {intl.formatMessage({ id: 'identity.summary.title' })}
          </Typography>
        </Box>
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <StatusSelector
                value={status}
                isOpen={isOpen}
                onSelect={handleStatusChange}
                header={intl.formatMessage({ id: 'statusSelect.status' })}
                isChangeable={WithAgent.includes(role)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box mb={2}>
                <VerificationDate date={identity?.dateCreated} />
              </Box>
              <Box>
                <VerificationNumber summary={intl.formatMessage({ id: 'identity.summary.number' })} number={identity?.id} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2}>
              {!!verificationFlowName && <VerificationFlow flowId={verificationFlowName} />}
              <VerificationSource platformType={platformType} />
            </Grid>
            {/* Next feature */}
            {/* <Grid item container xs={12} lg={2} alignItems="center" className={classes.button}> */}
            {/*  <FreshworksWidgetButton text={intl.formatMessage({ id: 'identity.summary.report' })} /> */}
            {/* </Grid> */}
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {/* Biometrics Check */}
          <Grid item container xs={12} lg={4}>
            <VerificationBioCheckSummary identity={identity} biometric={biometric} />
          </Grid>

          {/* Documents Checks */}
          {identity.documents.map((doc, index) => (
            <Grid item xs={12} lg={4} key={doc.country + doc.type}>
              <VerificationDocument document={doc} documentIndex={index} />
            </Grid>
          ))}

          {/* Additional Checks */}
          {ipCheck && !ipCheck.error && ipCheck.data && (
            <Grid item xs={12} lg={4}>
              <VerificationIpCheck ipCheck={ipCheck} />
            </Grid>
          )}

          {deviceFingerprint && platformType !== PlatformTypes.Api && (
            <Grid item xs={12} lg={4}>
              <VerificationDeviceCheckCard input={deviceFingerprint} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
