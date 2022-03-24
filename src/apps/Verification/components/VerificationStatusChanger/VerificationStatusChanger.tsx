import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PremiumAmlWatchlistsMonitoringNotification } from 'apps/Aml';
import { notification } from 'apps/ui';
import { getStatusById, IdentityStatuses } from 'models/Status.model';
import { WithAgent } from 'models/Collaborator.model';
import { useRole } from 'apps/collaborators';
import { StatusSelector } from '../StatusSelector/StatusSelector';
import { useStyles } from './VerificationStatusChanger.styles';

export function VerificationStatusChanger({ verificationStatus, isAmlMonitoringOn, onUpdateIdentityStatus }: {
  verificationStatus: IdentityStatuses;
  isAmlMonitoringOn: boolean;
  onUpdateIdentityStatus: (value: IdentityStatuses) => void;
}) {
  const classes = useStyles();
  const isFallback = useRef(false);
  const currentStatus = useRef(null);
  const previousStatus = useRef(null);
  const [status, setStatus] = useState(getStatusById(verificationStatus));
  const [isOpen, setOpen] = useState(false);
  const role = useRole();

  const handleCloseNotification = useCallback(() => {
    if (isFallback.current) {
      currentStatus.current = { ...previousStatus.current };
      setStatus(currentStatus.current);
      return;
    }
    onUpdateIdentityStatus(currentStatus.current.id);
  }, [currentStatus, previousStatus, onUpdateIdentityStatus]);

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
    if (isAmlMonitoringOn) {
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
    }
    onUpdateIdentityStatus(currentStatus.current.id);
  }, [classes.ongoingMonitoringNotification, handleCloseNotification, handleEnableFallback, onUpdateIdentityStatus, isAmlMonitoringOn]);

  useEffect(() => {
    if (verificationStatus) {
      const newStatus = getStatusById(verificationStatus);
      if (newStatus) {
        setStatus(newStatus);
        currentStatus.current = newStatus;
      }
    }
  }, [verificationStatus]);

  return (<StatusSelector isOpen={isOpen} value={status} onSelect={handleStatusChange} isChangeable={WithAgent.includes(role)} />);
}
