import { PremiumAmlWatchlistsMonitoringNotification } from 'apps/Aml';
import { notification } from 'apps/ui';
import { getStatusById, IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { verificationStatusUpdate } from '../../state/Verification.actions';
import { StatusSelector } from '../StatusSelector/StatusSelector';
import { useStyles } from './VerificationStatusChanger.styles';

export interface VerificationStatusChangerProps{
  verificationStatus: IdentityStatuses;
  verificationId: string;
  identity: any;
}

export function VerificationStatusChanger({ verificationStatus, verificationId, identity }: VerificationStatusChangerProps) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const isFallback = useRef(false);
  const currentStatus = useRef(null);
  const previousStatus = useRef(null);
  const [status, setStatus] = useState(getStatusById(verificationStatus));
  const [isOpen, setOpen] = useState(false);
  const identityId = useMemo(() => identity?._id, [identity]);

  const handleUpdateIdentity = useCallback(async (value) => {
    if (verificationId) {
      await dispatch(verificationStatusUpdate(verificationId, value));
    }
    if (identityId) {
      await dispatch(sendWebhook(identityId));
    }
    notification.info(intl.formatMessage({ id: 'identities.details.webhook.success' }));
  }, [dispatch, identityId, intl, verificationId]);

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
    if (!(newStatus?.isSelectable && currentStatus.current?.isChangeable && newStatus?.id !== currentStatus.current?.id)) {
      return;
    }

    previousStatus.current = { ...currentStatus.current };
    currentStatus.current = { ...newStatus };
    setStatus(currentStatus.current);
    setOpen(false);
    if (identity?.premiumAmlWatchlistsMonitoringStep) {
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
  }, [classes.ongoingMonitoringNotification, handleCloseNotification, handleEnableFallback, handleUpdateIdentity, identity]);

  useEffect(() => {
    if (verificationStatus) {
      const newStatus = getStatusById(verificationStatus);
      if (newStatus) {
        setStatus(newStatus);
        currentStatus.current = newStatus;
      }
    }
  }, [verificationStatus]);

  return (<StatusSelector isOpen={isOpen} value={status} onSelect={handleStatusChange} />);
}
