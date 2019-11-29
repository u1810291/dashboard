import Button from '@material-ui/core/Button';
import confirm from 'components/confirm/Confirm';
import confirmStyled from 'components/confirm/ConfirmStyled';
import Items from 'components/items';
import { closeOverlay, createOverlay } from 'components/overlay';
import { HR } from 'components/text';
import StatesExplanation from 'fragments/verifications/states-explanation/StatesExplanation';
import StatusSelect from 'fragments/verifications/status-select';
import VerificationWebhookModal from 'fragments/verifications/verification-webhook-modal/VerificationWebhookModal';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FiCode, FiDownload, FiLoader, FiTrash2, FiUpload } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { deleteIdentity, patchIdentity } from 'state/identities/identities.actions';
import { selectIdentityDeleting } from 'state/identities/identities.selectors';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import CSS from './VerificationSidePanel.module.scss';

async function handleSendWebhook(dispatch, intl, id) {
  await confirmStyled({
    header: intl.formatMessage({ id: 'verificationWebhookModal.header' }),
    message: intl.formatMessage({ id: 'verificationWebhookModal.body' }),
    confirmText: intl.formatMessage({ id: 'verificationWebhookModal.confirm' }),
    cancelText: intl.formatMessage({ id: 'verificationWebhookModal.cancel' }),
  });
  await dispatch(sendWebhook(id));
}

async function handleDeleteIdentity(dispatch, intl, history, id) {
  await confirm(intl.formatMessage({ id: 'verificationModal.delete.confirm' }));
  await dispatch(deleteIdentity(id));
  history.push('/identities');
}

function openWebhookModal(identity) {
  createOverlay(<VerificationWebhookModal webhook={identity} onClose={closeOverlay} />);
}

export function VerificationSidePanel({ identity }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const [isPDFGenerating, setPDFGenerating] = useState(false);
  const deletingIdentities = useSelector(selectIdentityDeleting);
  const countriesList = useSelector(selectCountriesList);
  const isDeleting = deletingIdentities.includes(identity.id);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    setPDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('apps/pdf');
    const blob = await getIdentityDocumentBlob(intl, identity, countriesList);
    downloadBlob(blob, `mati-identity-${identity.id}.pdf`);
    setPDFGenerating(false);
  }, [isPDFGenerating, countriesList, intl, identity]);

  return (
    <Items flow="row" justifyContent="inherit" gap={1} className={CSS.aside}>
      {!['pending', 'running'].includes(identity.status) && (
        <StatusSelect
          status={identity.status}
          onSelect={async (status) => {
            identity.status = status;
            await dispatch(patchIdentity(identity.id, {
              status: identity.status,
            }));
          }}
        />
      )}

      {/* Send Webhook */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleSendWebhook(dispatch, intl, identity.id)}
        startIcon={<FiUpload />}
      >
        {intl.formatMessage({ id: 'verificationDetails.tools.sendWebhook' })}
      </Button>

      {/* Show verification data */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => openWebhookModal(get(identity, 'originalIdentity._embedded.verification', {}))}
        startIcon={<FiCode />}
      >
        {intl.formatMessage({ id: 'verificationModal.webhookData' })}
      </Button>

      {/* Download pdf */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handlePDFDownload(dispatch, intl, identity, countriesList)}
        startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
      >
        {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
      </Button>

      {/* Delete Verification */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDeleteIdentity(dispatch, intl, history, identity.id)}
        startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
      >
        {intl.formatMessage({ id: 'verificationModal.delete' })}
      </Button>

      <HR width="0" />
      <StatesExplanation />
    </Items>
  );
}
