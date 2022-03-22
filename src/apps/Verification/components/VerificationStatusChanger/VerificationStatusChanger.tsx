import { PremiumAmlWatchlistsMonitoringNotification } from 'apps/Aml';
import { notification } from 'apps/ui';
import { getStatusById, IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { selectMerchantAgentNotesConfig } from 'state/merchant/merchant.selectors';
import { WithAgent } from 'models/Collaborator.model';
import { useRole } from 'apps/collaborators';
import { useOverlay } from 'apps/overlay';
import { verificationStatusUpdate } from '../../state/Verification.actions';
import { StatusSelector } from '../StatusSelector/StatusSelector';
import { VerificationStatusChangeDialog } from '../VerificationStatusChangeDialog/VerificationStatusChangeDialog';
import { useStyles } from './VerificationStatusChanger.styles';

export function VerificationStatusChanger({ verificationStatus, verificationId, identity }: {
  verificationStatus: IdentityStatuses;
  verificationId: string;
  identity: any;
}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const isFallback = useRef(false);
  const currentStatus = useRef(null);
  const previousStatus = useRef(null);
  const agentNote = useRef(undefined);
  const agentNotesConfig = useSelector(selectMerchantAgentNotesConfig);
  const [createOverlay, closeOverlay] = useOverlay();
  const [status, setStatus] = useState(getStatusById(verificationStatus));
  const [isOpen, setOpen] = useState(false);
  const identityId = useMemo(() => identity?._id, [identity]);
  const role = useRole();

  const handleUpdateIdentity = useCallback(async (value) => {
    if (verificationId) {
      await dispatch(verificationStatusUpdate(verificationId, value, agentNote.current));
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

  const handleUpdateStatus = useCallback(async (newStatus) => {
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

  const handleVerificationStatusChangeDialogSubmit = useCallback((newStatus) => (note) => {
    agentNote.current = note;
    handleUpdateStatus(newStatus);
    closeOverlay();
  }, [handleUpdateStatus, closeOverlay]);

  const handleStatusChange = useCallback(async (id) => {
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
