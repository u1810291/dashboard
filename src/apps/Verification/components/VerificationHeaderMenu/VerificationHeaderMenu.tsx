import { Box, Grid } from '@material-ui/core';
import { IdentityProfileResponse } from 'apps/IdentityProfile';
import classNames from 'classnames';
import { CollaboratorRoles, WithAgent } from 'models/Collaborator.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import React, { lazy, Suspense } from 'react';
import { PageLoader } from 'apps/layout';
import { useIntl } from 'react-intl';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { VerificationDataButton } from '../VerificationDataButton/VerificationDataButton';
import { VerificationDate } from '../VerificationDate/VerificationDate';
import { VerificationDeleteButton } from '../VerificationDeleteButton/VerificationDeleteButton';
import { VerificationNumber } from '../VerificationNumber/VerificationNumber';
import { VerificationStatusChanger } from '../VerificationStatusChanger/VerificationStatusChanger';
import { useStyles } from './VerificationHeaderMenu.styles';

const LazyButtonVerificationGeneratePdf = lazy(() => import('apps/pdf').then((module) => ({ default: module.ButtonVerificationGeneratePdf })));

export function VerificationHeaderMenu({ verification, identity }: {
  verification: VerificationWithExtras;
  identity: IdentityProfileResponse;
}) {
  const intl = useIntl();
  const classes = useStyles();

  if (!verification || !identity) {
    return null;
  }

  return (
    <Box p={2} className={classes.container}>
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.verification}>
          <Grid item xs={12} lg={5} className={classes.statusWrapper}>
            <VerificationStatusChanger
              identity={identity}
              verificationId={verification?._id}
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
              summary={intl.formatMessage({ id: 'identity.summary.number' })}
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
              className={classNames(classes.button, classes.topMenuButton)}
              verificationId={verification?._id}
            />
          </Grid>

          {/* Delete Verification */}
          <RoleRenderGuard roles={[CollaboratorRoles.ADMIN]}>
            <Grid item xs={12} className={classes.buttonWrapper}>
              <VerificationDeleteButton
                verificationId={verification?._id}
                className={classNames(classes.button, classes.deleteButton)}
              />
            </Grid>
          </RoleRenderGuard>

        </Grid>
      </Grid>
    </Box>
  );
}
