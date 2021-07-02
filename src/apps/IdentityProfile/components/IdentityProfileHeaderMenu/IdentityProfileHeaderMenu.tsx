import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { getGoBackToListLink } from 'models/Identity.model';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { QATags } from 'models/QA.model';
import { ButtonGoVerificationHistory } from 'apps/verificationHistory';
import { ButtonHeaderMenu } from 'apps/ui';
import { selectIdentityProfile } from '../../store/IdentityProfile.selectors';
import { useStyles } from './IdentityProfileHeaderMenu.styles';

export function IdentityProfileHeaderMenu() {
  const intl = useIntl();
  const classes = useStyles();
  const [goBackToListLink] = useState(getGoBackToListLink(useLocation()));
  const identity = useSelector(selectIdentityProfile);

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

        {/* Verification history */}
        <Grid item className={classes.itemOffsetRight}>
          <ButtonGoVerificationHistory identityId={identity?._id} />
        </Grid>

        {/* Delete Identity */}
        {/*        { role === CollaboratorRoles.ADMIN && (
        <Grid item className={classes.itemOffsetLeft}>
          <IdentityDeleteButton identityId={identity?._id} />
        </Grid>
        )} */}
      </Grid>
    </Grid>
  );
}
