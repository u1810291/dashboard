import { Grid } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FiChevronLeft, FiCode, FiDownload, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { identityRemove, setPDFGenerating } from 'state/identities/identities.actions';
import { selectIdentityIsPDFGenerating } from '../../../../state/identities/identities.selectors';
import { useConfirmDelete } from '../DeleteModal/DeleteModal';
import { VerificationWebhookModal } from '../VerificationWebhookModal/VerificationWebhookModal';
import { SideButton, useStyles } from './VerificationHeader.styles';
import { getGoBackToListLink, IdentityStatuses } from '../../../../models/Identity.model';
import { Routes } from '../../../../models/Router.model';
import { QATags } from '../../../../models/QA.model';

export function VerificationHeader({ identity, isDemo = false }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const goBackToListLink = getGoBackToListLink(useLocation());
  const [isDeleting, setIsDeleting] = useState(false);
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);
  const confirmDelete = useConfirmDelete();

  const handlePDFGenerating = useCallback((flag) => {
    dispatch(setPDFGenerating(flag));
  }, [dispatch]);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    handlePDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('apps/pdf');
    const blob = await getIdentityDocumentBlob(identity);
    downloadBlob(blob, `mati-identity-${identity.id}.pdf`);
    handlePDFGenerating(false);
  }, [isPDFGenerating, handlePDFGenerating, identity]);

  const handleDeleteIdentity = useCallback(async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      await confirmDelete();
      await dispatch(identityRemove(identity.id));
      history.push(Routes.list.root);
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setIsDeleting(false);
    }
  }, [dispatch, history, isDeleting, identity, confirmDelete]);

  const openWebhookModal = useCallback(() => {
    const webhook = get(identity, 'originalIdentity._embedded.verification', {});
    createOverlay(<VerificationWebhookModal webhook={webhook} onClose={closeOverlay} />);
  }, [identity, createOverlay, closeOverlay]);

  return (
    <Grid container direction="column" spacing={2} className={classes.wrapper}>
      <Grid item container>
        {/* Back to list */}
        <Grid item>
          <Link to={goBackToListLink}>
            <SideButton
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.Verification.Buttons.BackToList}
            >
              {intl.formatMessage({ id: 'identities.details.backToList' })}
            </SideButton>
          </Link>
        </Grid>
        {/* Download pdf */}
        {!isDemo && (
          <Grid item className={classes.itemOffsetRight}>
            <SideButton
              variant="contained"
              onClick={handlePDFDownload}
              startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
              disabled={identity.status === IdentityStatuses.running}
              data-qa={QATags.Verification.Buttons.DownloadPdf}
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
            data-qa={QATags.Verification.Buttons.Data}
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
              data-qa={QATags.Verification.Buttons.Delete}
            >
              {intl.formatMessage({ id: 'verificationModal.delete' })}
            </SideButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
