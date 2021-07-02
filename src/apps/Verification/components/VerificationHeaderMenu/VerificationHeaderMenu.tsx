import { Box, Grid } from '@material-ui/core';
import { useRole } from 'apps/collaborators/hooks/Role/Role.hook';
import { selectIdentityProfile } from 'apps/IdentityProfile';
import { ButtonVerificationGeneratePdf } from 'apps/pdf';
import classNames from 'classnames';
import { CollaboratorRoles } from 'models/Collaborator.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectNewVerificationWithExtras } from '../../state/Verification.selectors';
import { VerificationDataButton } from '../VerificationDataButton/VerificationDataButton';
import { VerificationDate } from '../VerificationDate/VerificationDate';
import { VerificationDeleteButton } from '../VerificationDeleteButton/VerificationDeleteButton';
import { VerificationNumber } from '../VerificationNumber/VerificationNumber';
import { VerificationStatusChanger } from '../VerificationStatusChanger/VerificationStatusChanger';
import { useStyles } from './VerificationHeaderMenu.styles';

export function VerificationHeaderMenu() {
  const intl = useIntl();
  const verification = useSelector(selectNewVerificationWithExtras);
  const identityProfile = useSelector(selectIdentityProfile);
  const classes = useStyles();
  const role = useRole();

  if (!verification || !identityProfile) {
    return null;
  }

  return (
    <Box p={2} className={classes.container}>
      <Grid container alignItems="center" className={classes.wrapper}>
        <Grid container item xs={12} xl={6} spacing={2} alignItems="center" className={classes.verification}>
          <Grid item xs={12} lg={5}>
            <VerificationStatusChanger
              identity={identityProfile}
              verificationId={verification?._id}
              verificationStatus={verification?.verificationStatus}
            />
          </Grid>
          <Grid item xs={12} lg={3} className={classes.dateWrapper}>
            <Box ml={{ xs: 0, xl: 1 }}>
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
          <Grid item xs={12} className={classes.buttonWrapper}>
            <ButtonVerificationGeneratePdf
              className={classNames(classes.button, classes.topMenuButton)}
              verification={verification}
            />
          </Grid>

          {/* Show verification data */}
          <Grid item xs={12} className={classes.buttonWrapper}>
            <VerificationDataButton className={classNames(classes.button, classes.topMenuButton)} />
          </Grid>

          {/* Delete Verification */}
          {role === CollaboratorRoles.ADMIN && (
            <Grid item xs={12} className={classes.deleteButtonWrapper}>
              <VerificationDeleteButton
                identityId={identityProfile?._id}
                verificationId={verification?._id}
                className={classNames(classes.button, classes.deleteButton)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
