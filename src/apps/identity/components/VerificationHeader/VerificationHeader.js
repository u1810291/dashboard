import { Grid } from '@material-ui/core';
import { closeOverlay, createOverlay } from 'components/overlay';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FiCode, FiDownload, FiLoader, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { identityRemove, setPDFGenerating } from 'state/identities/identities.actions';
import { confirmDelete } from '../DeleteModal/DeleteModal';
import { VerificationWebhookModal } from '../VerificationWebhookModal/VerificationWebhookModal';
import { SideButton, useStyles } from './VerificationHeader.styles';
import { selectIdentityIsPDFGenerating } from '../../../../state/identities/identities.selectors';

export function VerificationHeader({ identity, isDemo = false }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);

  const handlePDFGenerating = useCallback((flag) => {
    dispatch(setPDFGenerating(flag));
  }, [dispatch]);

  const handleGoBack = useCallback(() => {
    if (location.state?.from?.startsWith('/identities')) {
      history.push(location.state.from);
    } else {
      history.push('/identities');
    }
  }, [history, location]);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    handlePDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('apps/pdf');
    const blob = await getIdentityDocumentBlob(intl, identity);
    downloadBlob(blob, `mati-identity-${identity.id}.pdf`);
    handlePDFGenerating(false);
  }, [isPDFGenerating, handlePDFGenerating, intl, identity]);

  const handleDeleteIdentity = useCallback(async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      await confirmDelete();
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
  }, [dispatch, history, isDeleting, identity]);

  const openWebhookModal = useCallback(() => {
    const webhook = get(identity, 'originalIdentity._embedded.verification', {});
    createOverlay(<VerificationWebhookModal webhook={webhook} onClose={closeOverlay} identityId={identity.id} />);
  }, [identity]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        {/* Back to list */}
        <Grid item>
          <SideButton
            variant="contained"
            onClick={handleGoBack}
            startIcon={<FiChevronLeft />}
            className={classes.buttonBack}
          >
            {intl.formatMessage({ id: 'identities.details.backToList' })}
          </SideButton>
        </Grid>
        {/* Download pdf */}
        {!isDemo && (
          <Grid item className={classes.itemOffsetRight}>
            <SideButton
              variant="contained"
              onClick={handlePDFDownload}
              startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
            >
              {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
            </SideButton>
          </Grid>
        )}
        {/* Show verification data */}
        <Grid item className={classes.itemOffsetLeft}>
          <SideButton
            variant="contained"
            onClick={openWebhookModal}
            startIcon={<FiCode />}
          >
            {intl.formatMessage({ id: 'verificationModal.webhookData' })}
          </SideButton>
        </Grid>
        {/* Delete Verification */}
        {!isDemo && (
          <Grid item className={classes.itemOffsetLeft}>
            <SideButton
              variant="contained"
              onClick={handleDeleteIdentity}
              startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
              disabled={isDeleting}
              className={classes.deleteButton}
            >
              {intl.formatMessage({ id: 'verificationModal.delete' })}
            </SideButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
