import { Box, Grid } from '@material-ui/core';
import confirm from 'components/confirm/Confirm';
import confirmStyled from 'components/confirm/ConfirmStyled';
import { closeOverlay, createOverlay } from 'components/overlay';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import { isChangeableStatus } from 'models/Identity.model';
import React, { useCallback, useState } from 'react';
import { FiCode, FiDownload, FiLoader, FiTrash2, FiUpload } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { identityRemove, identityUpdate } from 'state/identities/identities.actions';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { CheckSummary } from '../CheckSummary/CheckSummary';
import { StatusesExplanation } from '../StatusesExplanation';
import { StatusSelect } from '../StatusSelect';
import { VerificationWebhookModal } from '../VerificationWebhookModal/VerificationWebhookModal';
import { SideButton } from './VerificationSidePanel.styles';

export function VerificationSidePanel({ identity, isDemo = false }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const [isPDFGenerating, setPDFGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    setPDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('apps/pdf');
    const blob = await getIdentityDocumentBlob(intl, identity);
    downloadBlob(blob, `mati-identity-${identity.id}.pdf`);
    setPDFGenerating(false);
  }, [isPDFGenerating, intl, identity]);

  const handleSendWebhook = useCallback(async (id) => {
    await confirmStyled({
      header: intl.formatMessage({ id: 'verificationWebhookModal.header' }),
      message: intl.formatMessage({ id: 'verificationWebhookModal.body' }),
      confirmText: intl.formatMessage({ id: 'verificationWebhookModal.confirm' }),
      cancelText: intl.formatMessage({ id: 'verificationWebhookModal.cancel' }),
    });
    await dispatch(sendWebhook(id));
  }, [intl, dispatch]);

  const handleDeleteIdentity = useCallback(async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      await confirm(intl.formatMessage({ id: 'verificationModal.delete.confirm' }));
      await dispatch(identityRemove(identity.id));
      history.push('/identities');
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setIsDeleting(false);
    }
  }, [dispatch, intl, history, isDeleting, identity]);

  const handleStatusChange = useCallback((status) => dispatch(identityUpdate(identity.id, { status })), [dispatch, identity]);

  const openWebhookModal = useCallback((webhook) => {
    createOverlay(<VerificationWebhookModal webhook={webhook} onClose={closeOverlay} />);
  }, []);

  return (
    <Grid container direction="column" spacing={1}>
      {isChangeableStatus(identity.status) && (
        <Grid item style={{ marginBottom: 10 }}>
          <StatusSelect status={identity.status} onSelect={handleStatusChange} />
        </Grid>
      )}

      {/* Send Webhook */}
      <Grid item>
        <SideButton
          fullWidth
          variant="contained"
          onClick={() => handleSendWebhook(identity.id)}
          startIcon={<FiUpload />}
        >
          {intl.formatMessage({ id: 'verificationDetails.tools.sendWebhook' })}
        </SideButton>
      </Grid>

      {/* Show verification data */}
      <Grid item>
        <SideButton
          fullWidth
          variant="contained"
          onClick={() => openWebhookModal(get(identity, 'originalIdentity._embedded.verification', {}))}
          startIcon={<FiCode />}
        >
          {intl.formatMessage({ id: 'verificationModal.webhookData' })}
        </SideButton>
      </Grid>

      {/* Download pdf */}
      {!isDemo && (
        <Grid item>
          <SideButton
            fullWidth
            variant="contained"
            onClick={() => handlePDFDownload(dispatch, intl, identity)}
            startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
          >
            {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
          </SideButton>
        </Grid>
      )}

      {/* Delete Verification */}
      {!isDemo && (
        <Grid item>
          <SideButton
            fullWidth
            variant="contained"
            onClick={handleDeleteIdentity}
            startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
            disabled={isDeleting}
          >
            {intl.formatMessage({ id: 'verificationModal.delete' })}
          </SideButton>
        </Grid>
      )}

      <Grid item>
        <Box mt={2}>
          <StatusesExplanation />
        </Box>
      </Grid>

      <Grid item>
        <CheckSummary identity={identity} />
      </Grid>
    </Grid>
  );
}
