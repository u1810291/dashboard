import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';
import confirm from 'components/confirm/Confirm';
import confirmStyled from 'components/confirm/ConfirmStyled';
import { closeOverlay, createOverlay } from 'components/overlay';
import { downloadBlob } from 'lib/file';
import { isChangeableStatus } from 'models/Identity.model';
import { FiCode, FiDownload, FiLoader, FiTrash2, FiUpload } from 'react-icons/fi';
import { identityRemove, identityUpdate } from 'state/identities/identities.actions';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { VerificationWebhookModal } from '../VerificationWebhookModal';
import { StatusSelect } from '../StatusSelect';
import { StatusesExplanation } from '../StatusesExplanation';

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
        <Grid item>
          <StatusSelect status={identity.status} onSelect={handleStatusChange} />
        </Grid>
      )}

      {/* Send Webhook */}
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => handleSendWebhook(identity.id)}
          startIcon={<FiUpload />}
        >
          {intl.formatMessage({ id: 'verificationDetails.tools.sendWebhook' })}
        </Button>
      </Grid>

      {/* Show verification data */}
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => openWebhookModal(get(identity, 'originalIdentity._embedded.verification', {}))}
          startIcon={<FiCode />}
        >
          {intl.formatMessage({ id: 'verificationModal.webhookData' })}
        </Button>
      </Grid>

      {/* Download pdf */}
      {!isDemo && (
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handlePDFDownload(dispatch, intl, identity)}
            startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
          >
            {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
          </Button>
        </Grid>
      )}

      {/* Delete Verification */}
      {!isDemo && (
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleDeleteIdentity}
            startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
            disabled={isDeleting}
          >
            {intl.formatMessage({ id: 'verificationModal.delete' })}
          </Button>
        </Grid>
      )}

      <Grid item>
        <Box mt={2}>
          <StatusesExplanation />
        </Box>
      </Grid>
    </Grid>
  );
}
