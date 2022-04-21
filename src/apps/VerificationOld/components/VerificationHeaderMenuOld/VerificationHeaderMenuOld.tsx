import { AmlValidationTypes } from 'apps/Aml';
import { useFormatMessage } from 'apps/intl';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React, { lazy, Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { IdentityProfileResponse } from 'apps/IdentityProfile';
import { ButtonHeaderMenu, notification, useDeleteButtonHook } from 'apps/ui';
import classNames from 'classnames';
import { CollaboratorRoles, WithAgent } from 'models/Collaborator.model';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { verificationRemove } from 'state/verification/verification.actions';
import { PageLoader } from 'apps/layout';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { VerificationDataButton, VerificationDate, VerificationNumber, VerificationStatusChanger } from 'apps/Verification';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { verificationStatusUpdate } from '../../state/VerificationOld.actions';
import { getVerificationWebhook } from '../../client/VerificationOld.client';
import { useStyles } from './VerificationHeaderMenuOld.styles';

const LazyButtonVerificationGeneratePdf = lazy(() => import('apps/pdf').then((module) => ({ default: module.ButtonVerificationGeneratePdf })));

export function VerificationHeaderMenuOld({ verification, identity }: {
  verification: VerificationWithExtras;
  identity: IdentityProfileResponse;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleUpdateIdentityStatus = useCallback(async (value: IdentityStatuses, agentNote?: string | null) => {
    if (verification?.id) {
      await dispatch(verificationStatusUpdate(verification.id, value, agentNote));
    }
    if (identity?._id) {
      await dispatch(sendWebhook(identity._id));
    }
    notification.info(formatMessage('identities.details.webhook.success'));
  }, [dispatch, identity, formatMessage, verification]);

  const handleDeleteVerification = useCallback(async () => {
    if (verification?.id) {
      await dispatch(verificationRemove(verification.id));
    }
  }, [dispatch, verification]);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteVerification, {
    redirectUrl: Routes.identity.verification.root,
  });

  if (!verification || !identity) {
    return null;
  }

  return (
    <Box p={2} className={classes.container}>
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.verification}>
          <Grid item xs={12} lg={5} className={classes.statusWrapper}>
            <VerificationStatusChanger
              isAmlMonitoringOn={verification.flow?.verificationPatterns?.[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] === AmlValidationTypes.SearchMonitoring}
              onUpdateIdentityStatus={handleUpdateIdentityStatus}
              verificationStatus={verification?.verificationStatus}
            />
          </Grid>
          <Grid item xs={12} lg={3} className={classes.dateWrapper}>
            <Box mx={{ xs: 0, lg: 2 }} mr={{ xl: 0 }}>
              <VerificationDate date={verification?.createdAt} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4} className={classes.numberWrapper}>
            <VerificationNumber
              summary={formatMessage('identity.summary.number')}
              number={verification?._id}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.buttons}>
          {/* Download pdf */}
          <RoleRenderGuard roles={WithAgent}>
            <Grid item xs={12} className={classes.buttonWrapper}>
              <Suspense fallback={<PageLoader />}>
                <LazyButtonVerificationGeneratePdf
                  className={classNames(classes.button, classes.topMenuButton)}
                  verification={verification}
                />
              </Suspense>
            </Grid>
          </RoleRenderGuard>

          {/* Show verification data */}
          <Grid item xs={12} className={classes.buttonWrapper}>
            <VerificationDataButton
              onGetWebhook={getVerificationWebhook}
              className={classNames(classes.button, classes.topMenuButton)}
              verificationId={verification?._id}
            />
          </Grid>

          {/* Delete Verification */}
          <RoleRenderGuard roles={[CollaboratorRoles.ADMIN]}>
            <Grid item xs={12} className={classes.buttonWrapper}>
              <ButtonHeaderMenu
                variant="contained"
                onClick={handleDelete}
                startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
                disabled={isDeleting}
                className={classNames(classes.button, classes.deleteButton)}
                data-qa={QATags.Verification.Buttons.Delete}
              >
                {formatMessage('verificationModal.delete')}
              </ButtonHeaderMenu>
            </Grid>
          </RoleRenderGuard>
        </Grid>
      </Grid>
    </Box>
  );
}
