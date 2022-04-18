import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PremiumAmlWatchlistsMonitoringNotification } from 'apps/Aml';
import { notification } from 'apps/ui';
import { useSelector } from 'react-redux';
import { selectMerchantAgentNotesConfig } from 'state/merchant/merchant.selectors';
import { getStatusById, IdentityStatuses, IdentityStatus } from 'models/Status.model';
import { WithAgent } from 'models/Collaborator.model';
import { IAgentNotesConfig } from 'models/Merchant.model';
import { useRole } from 'apps/collaborators';
import { useOverlay } from 'apps/overlay';
import { StatusSelector } from '../StatusSelector/StatusSelector';
import { VerificationStatusChangeDialog } from '../VerificationStatusChangeDialog/VerificationStatusChangeDialog';
import { useStyles } from './VerificationStatusChanger.styles';

export function VerificationStatusChanger({ verificationStatus, isAmlMonitoringOn, onUpdateIdentityStatus }: {
  verificationStatus: IdentityStatuses;
  isAmlMonitoringOn: boolean;
  onUpdateIdentityStatus: (value: IdentityStatuses, agentNote?: string | null) => void;
}) {
  const classes = useStyles();
  const isFallback = useRef(false);
  const currentStatus = useRef(null);
  const previousStatus = useRef(null);
  const agentNote = useRef(null);
  const agentNotesConfig = useSelector<any, IAgentNotesConfig>(selectMerchantAgentNotesConfig);
  const [createOverlay, closeOverlay] = useOverlay();
  const [status, setStatus] = useState<IdentityStatus>(getStatusById(verificationStatus));
  const [isOpen, setOpen] = useState<boolean>(false);
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

  const handleUpdateStatus = useCallback(async (newStatus: IdentityStatus) => {
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
    onUpdateIdentityStatus(currentStatus.current.id, agentNote.current);
  }, [classes.ongoingMonitoringNotification, handleCloseNotification, handleEnableFallback, onUpdateIdentityStatus, isAmlMonitoringOn]);

  const handleVerificationStatusChangeDialogSubmit = useCallback((newStatus: IdentityStatus) => (note: string) => {
    agentNote.current = note;
    handleUpdateStatus(newStatus);
    closeOverlay();
  }, [handleUpdateStatus, closeOverlay]);

  const handleStatusChange = useCallback(async (id: string) => {
    const newStatus = getStatusById(id);
    if (!(newStatus?.isSelectable && currentStatus.current?.isChangeable && newStatus?.id !== currentStatus.current?.id)) {
      return;
    }

    if (agentNotesConfig?.requiredOnChangeVerificationStatus) {
      createOverlay(
        <VerificationStatusChangeDialog
          onSubmit={handleVerificationStatusChangeDialogSubmit(newStatus)}
          onCancel={closeOverlay}
          from={currentStatus.current}
          to={newStatus}
        />,
      );
      return;
    }

    handleUpdateStatus(newStatus);
  }, [handleUpdateStatus, createOverlay, closeOverlay, agentNotesConfig, handleVerificationStatusChangeDialogSubmit]);

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
