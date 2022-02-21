import { Grid } from '@material-ui/core';
import { IdentityProfileResponse } from 'apps/IdentityProfile';
import { Routes } from 'models/Router.model';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { getGoBackToListLink } from 'models/Identity.model';
import { useIntl } from 'react-intl';
import { QATags } from 'models/QA.model';
import { ButtonGoVerificationHistory } from 'apps/verificationHistory';
import { ButtonHeaderMenu } from 'apps/ui';
import { WithAgent } from 'models/Collaborator.model';
import { RoleRenderGuard } from 'apps/merchant';
import { useStyles } from './IdentityProfileHeaderMenu.styles';

export function IdentityProfileHeaderMenu({ identity }: {
  identity: IdentityProfileResponse;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const location = useLocation();
  const goBackToListLink = useMemo(() => getGoBackToListLink(location, Routes.identity.verification.root), [location]);

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
        <RoleRenderGuard roles={WithAgent}>
          <Grid item className={classes.itemOffsetRight}>
            <ButtonGoVerificationHistory identityId={identity?._id} />
          </Grid>
        </RoleRenderGuard>
      </Grid>
    </Grid>
  );
}
