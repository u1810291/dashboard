import { useFormatMessage } from 'apps/intl';
import { ProductTypes } from 'models/Product.model';
import React, { lazy, Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { ButtonHeaderMenu, notification, useDeleteButtonHook } from 'apps/ui';
import { PageLoader } from 'apps/layout';
import { CollaboratorRoles, WithAgent } from 'models/Collaborator.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import { IdentityStatuses } from 'models/Status.model';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { verificationRemove } from 'state/verification/verification.actions';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { verificationStatusUpdate } from '../../state/Verification.actions';
import { getVerificationWebhook } from '../../client/Verification.client';
import { VerificationDataButton } from '../VerificationDataButton/VerificationDataButton';
import { VerificationDate } from '../VerificationDate/VerificationDate';
import { VerificationNumber } from '../VerificationNumber/VerificationNumber';
import { VerificationStatusChanger } from '../VerificationStatusChanger/VerificationStatusChanger';
import { useStyles } from './VerificationHeaderMenu.styles';

const LazyButtonVerificationGeneratePdf = lazy(() => import('apps/VerificationPdf').then((module) => ({ default: module.ButtonVerificationGeneratePdf })));

export function VerificationHeaderMenu({ verification, productList }: {
  verification: IVerificationWorkflow;
  productList: ProductTypes[];
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleUpdateIdentityStatus = useCallback(async (value: IdentityStatuses, agentNote?: string | null) => {
    if (verification?.id) {
      await dispatch(verificationStatusUpdate(verification.id, value, agentNote));
    }
    if (verification?.identityId) {
      await dispatch(sendWebhook(verification?.identityId));
    }
    notification.info(formatMessage('identities.details.webhook.success'));
  }, [dispatch, formatMessage, verification]);

  const handleDeleteVerification = useCallback(async () => {
    if (verification.id) {
      await dispatch(verificationRemove(verification.id));
    }
  }, [dispatch, verification.id]);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteVerification, {
    redirectUrl: Routes.identity.verification.root,
  });

  if (!verification) {
    return null;
  }

  return (
    <Box p={2} className={classes.container}>
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.verification}>
          <Grid item xs={12} lg={5} className={classes.statusWrapper}>
            <VerificationStatusChanger
              isAmlMonitoringOn={false}
              /* TODO: @ggrigorev WF add amlCheck isMonitoringOn value, when AmlCheck is supported in the new IVerificationWorkflow */
              verificationStatus={verification?.verificationStatus}
              onUpdateIdentityStatus={handleUpdateIdentityStatus}
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
              number={verification?.id}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.buttons}>
          {/* Download pdf */}
          <RoleRenderGuard roles={WithAgent}>
            <Grid item xs={12} className={classes.buttonWrapper}>
              <Suspense fallback={<PageLoader />}>
                <LazyButtonVerificationGeneratePdf
                  productList={productList}
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
              verificationId={verification?.id}
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
