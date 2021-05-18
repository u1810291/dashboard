import { Grid } from '@material-ui/core';
import { useRole } from 'apps/collaborators/hooks/Role/Role.hook';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useOverlay } from 'apps/overlay';
import { HeaderMenuButton } from 'apps/ui';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { getGoBackToListLink } from 'models/Identity.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronLeft, FiCode, FiDownload, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { identityRemove, setPDFGenerating, pdfDownloaded } from 'state/identities/identities.actions';
import { selectIdentityIsPDFGenerating } from 'state/identities/identities.selectors';
import { useConfirmDelete } from '../DeleteModal/DeleteModal';
import { VerificationWebhookModal } from '../VerificationWebhookModal/VerificationWebhookModal';
import { useStyles } from './VerificationHeader.styles';

export function VerificationHeader({ identity, isDemo = false }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const role = useRole();
  const [createOverlay, closeOverlay] = useOverlay();
  const goBackToListLink = getGoBackToListLink(useLocation());
  const [isDeleting, setIsDeleting] = useState(false);
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);
  const verificationId = useMemo(() => identity?._embedded?.verification?.id, [identity]);
  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'verificationModal.delete' }),
    intl.formatMessage({ id: 'verificationModal.delete.confirm' },
    ));

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
    try {
      dispatch(pdfDownloaded(identity.id, verificationId));
    } catch (error) {
      console.error('post pdfDownloaded event error', error);
    }
  }, [isPDFGenerating, handlePDFGenerating, identity, dispatch, verificationId]);

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

  const openVerificationHistory = useCallback(() => {
    if (identity.id) {
      history.push(`${Routes.list.root}/${identity.id}${Routes.list.history.root}`);
    }
  }, [history, identity.id]);

  return (
    <Grid container direction="column" spacing={2} className={classes.wrapper}>
      <Grid item container>
        {/* Back to list */}
        <Grid item>
          <Link to={goBackToListLink}>
            <HeaderMenuButton
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.Verification.Buttons.BackToList}
            >
              {intl.formatMessage({ id: 'identities.details.backToList' })}
            </HeaderMenuButton>
          </Link>
        </Grid>
        {/* Download pdf */}
        {!isDemo && (
          <Grid item className={classes.itemOffsetRight}>
            <HeaderMenuButton
              variant="contained"
              onClick={handlePDFDownload}
              startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
              disabled={identity.status === IdentityStatuses.running}
              data-qa={QATags.Verification.Buttons.DownloadPdf}
            >
              {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
            </HeaderMenuButton>
          </Grid>
        )}
        {/* Show verification data */}
        <Grid item className={classes.itemOffsetLeft}>
          <HeaderMenuButton
            variant="contained"
            onClick={openWebhookModal}
            startIcon={<FiCode />}
            data-qa={QATags.Verification.Buttons.Data}
          >
            {intl.formatMessage({ id: 'verificationModal.webhookData' })}
          </HeaderMenuButton>
        </Grid>
        {/* Verification history */}
        <Grid item className={classes.itemOffsetLeft}>
          <HeaderMenuButton
            variant="contained"
            onClick={openVerificationHistory}
            startIcon={<ScheduleIcon />}
            data-qa={QATags.Verification.Buttons.History}
          >
            {intl.formatMessage({ id: 'VerificationHistory.button.pageHistory' })}
          </HeaderMenuButton>
        </Grid>
        {/* Delete Verification */}
        {!isDemo && role === CollaboratorRoles.ADMIN && (
          <Grid item className={classes.itemOffsetLeft}>
            <HeaderMenuButton
              variant="contained"
              onClick={handleDeleteIdentity}
              startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
              disabled={isDeleting || identity?.status === IdentityStatuses.reviewRunning}
              className={classes.deleteButton}
              data-qa={QATags.Verification.Buttons.Delete}
            >
              {intl.formatMessage({ id: 'verificationModal.delete' })}
            </HeaderMenuButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
