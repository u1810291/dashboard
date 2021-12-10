import { Grid } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu, VerificationWebhookModal } from 'apps/ui';
import { downloadBlob } from 'lib/file';
import { get } from 'lodash';
import { CollaboratorRoles, WithAgent } from 'models/Collaborator.model';
import { getGoBackToListLink } from 'models/Identity.model';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiChevronLeft, FiCode, FiDownload, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { identityRemove, pdfDownloaded, setPDFGenerating } from 'state/identities/identities.actions';
import { selectIdentityIsPDFGenerating } from 'state/identities/identities.selectors';
import { RoleRenderGuard } from 'apps/merchant';

import { useRole } from 'apps/collaborators';
import { selectMerchantLegalAddress, selectMerchantLegalName, selectMerchantLegalRegNumber } from 'state/merchant/merchant.selectors';
import { IS_REPLACE_PROFILE_TO_IDENTITY } from 'models/Release.model';
import { useConfirmDelete } from '../DeleteModal/DeleteModal';
import { useStyles } from './VerificationHeader.styles';

/**
 * @deprecated
 */
export function VerificationHeader({ identity, isDemo = false }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const goBackToListLink = getGoBackToListLink(useLocation(), IS_REPLACE_PROFILE_TO_IDENTITY ? Routes.identity.verification.root : Routes.list.root);
  const [isDeleting, setIsDeleting] = useState(false);
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);
  const verificationId = useMemo(() => identity?._embedded?.verification?.id, [identity]);
  const legalName = useSelector(selectMerchantLegalName);
  const legalAddress = useSelector(selectMerchantLegalAddress);
  const legalRegNumber = useSelector(selectMerchantLegalRegNumber);
  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'verificationModal.delete' }),
    intl.formatMessage({ id: 'verificationModal.delete.confirm' }),
  );
  const role = useRole();

  const handlePDFGenerating = useCallback((flag) => {
    dispatch(setPDFGenerating(flag));
  }, [dispatch]);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    handlePDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('apps/pdf');
    const blob = await getIdentityDocumentBlob(identity, { legalName, legalAddress, legalRegNumber });
    downloadBlob(blob, `mati-identity-${identity.id}.pdf`);
    handlePDFGenerating(false);
    dispatch(pdfDownloaded(identity.id, verificationId));
  }, [isPDFGenerating, handlePDFGenerating, identity, legalName, legalAddress, legalRegNumber, dispatch, verificationId]);

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
      history.push(`${Routes.list.root}/${identity.id}${Routes.list.history.root}`, { from: history.location.pathname + history.location.search });
    }
  }, [history, identity.id]);

  return (
    <Grid container direction="column" spacing={2} className={classes.wrapper}>
      <Grid item container>
        {/* Back to list */}
        <Grid item>
          <Link to={goBackToListLink}>
            <ButtonHeaderMenu
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.Verification.Buttons.BackToList}
            >
              {intl.formatMessage({ id: 'identities.details.backToList' })}
            </ButtonHeaderMenu>
          </Link>
        </Grid>
        {/* Download pdf */}
        {!isDemo && (
        <Grid item className={classes.itemOffsetRight}>
          <ButtonHeaderMenu
            variant="contained"
            onClick={handlePDFDownload}
            startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
            disabled={!WithAgent.includes(role) || identity.status === IdentityStatuses.running}
            data-qa={QATags.Verification.Buttons.DownloadPdf}
          >
            {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
          </ButtonHeaderMenu>
        </Grid>
        )}
        {/* Show verification data */}
        <Grid item className={classes.itemOffsetLeft}>
          <ButtonHeaderMenu
            variant="contained"
            onClick={openWebhookModal}
            startIcon={<FiCode />}
            data-qa={QATags.Verification.Buttons.Data}
          >
            {intl.formatMessage({ id: 'verificationModal.webhookData' })}
          </ButtonHeaderMenu>
        </Grid>
        {/* Verification history */}
        <RoleRenderGuard roles={WithAgent}>
          <Grid item className={classes.itemOffsetLeft}>
            <ButtonHeaderMenu
              variant="contained"
              onClick={openVerificationHistory}
              startIcon={<ScheduleIcon />}
              data-qa={QATags.Verification.Buttons.History}
            >
              {intl.formatMessage({ id: 'VerificationHistory.button.pageHistory' })}
            </ButtonHeaderMenu>
          </Grid>
        </RoleRenderGuard>
        {/* Delete Verification */}
        <RoleRenderGuard roles={[CollaboratorRoles.ADMIN]}>
          {!isDemo && (
            <Grid item className={classes.itemOffsetLeft}>
              <ButtonHeaderMenu
                variant="contained"
                onClick={handleDeleteIdentity}
                startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
                disabled={isDeleting || identity?.status === IdentityStatuses.reviewRunning}
                className={classes.deleteButton}
                data-qa={QATags.Verification.Buttons.Delete}
              >
                {intl.formatMessage({ id: 'verificationModal.delete' })}
              </ButtonHeaderMenu>
            </Grid>
          )}
        </RoleRenderGuard>
      </Grid>
    </Grid>
  );
}
