import { Grid, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { VerificationDate, VerificationNumber } from 'apps/identity';
import { selectIdentityProfile } from 'state/identities/identities.selectors';
import { useRole } from 'apps/collaborators/hooks/Role/Role.hook';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { ButtonVerificationGeneratePdf } from 'apps/pdf';
import { selectNewVerificationWithExtras, VerificationDeleteButton, VerificationStatusChanger, VerificationDataButton } from 'apps/verification';
import classNames from 'classnames';
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
      <Grid container alignItems="center">
        <Grid container xs={12} xl={6} spacing={2} alignItems="center" className={classes.wrapper}>
          <Grid item xs={12} lg={5}>
            <VerificationStatusChanger identity={identityProfile} verificationId={verification?._id} verificationStatus={verification?.verificationStatus} />
          </Grid>
          <Grid item xs={12} lg={3} className={classes.dateWrapper}>
            <Box ml={{ xs: 0, lg: 2 }}>
              <VerificationDate date={verification?.dateCreated} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4} className={classes.numberWrapper}>
            <VerificationNumber summary={intl.formatMessage({ id: 'identity.summary.number' })} number={verification?._id} />
          </Grid>
        </Grid>
        <Grid container xs={12} xl={6} spacing={2} alignItems="center" className={classes.buttons}>
          {/* Download pdf */}
          <Grid item xs={12} className={classes.buttonWrapper}>
            <ButtonVerificationGeneratePdf className={classNames(classes.button, classes.topMenuButton)} verification={verification} />
          </Grid>

          {/* Show verification data */}
          <Grid item xs={12} className={classes.buttonWrapper}>
            <VerificationDataButton className={classNames(classes.button, classes.topMenuButton)} verification={verification} />
          </Grid>

          {/* Delete Verification */}
          {role === CollaboratorRoles.ADMIN && (
            <Grid item xs={12} className={classes.deleteButtonWrapper}>
              <VerificationDeleteButton className={classNames(classes.button, classes.deleteButton)} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
