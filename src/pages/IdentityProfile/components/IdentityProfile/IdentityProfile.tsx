import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { identityProfileClear, identityProfileLoad } from 'apps/IdentityProfile/store/IdentityProfile.actions';
import { Page404, PageError, PageLoader } from 'apps/layout';
import { useParams } from 'react-router-dom';
import { verificationListClear } from 'apps/Verification/state/Verification.actions';
import { goToStartPage, useQuery } from 'lib/url';
import { SideProfileMenu, IdentityProfileHeaderMenu, IdentityProfileErrorTypes, selectIdentityProfileModel } from 'apps/IdentityProfile';
import { useStyles } from './IdentityProfile.styles';

export function IdentityProfile({ children }: {
  children: React.ReactNode;
}) {
  const [errorType, setErrorType] = useState<IdentityProfileErrorTypes>(null);
  const identityProfileModel = useSelector(selectIdentityProfileModel);
  const { asMerchantId } = useQuery();
  const { identityId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const IdentityProfileErrorScreens = useMemo(() => ({
    [IdentityProfileErrorTypes.RequestError]: (<PageError onRetry={goToStartPage} />),
    [IdentityProfileErrorTypes.IdentityNotFound]: (<Page404 />),
  }), []);

  useEffect(() => () => {
    dispatch(identityProfileClear());
    dispatch(verificationListClear());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(identityProfileLoad(identityId, asMerchantId));
      } catch (error) {
        if ((error as any)?.response?.status === 404) {
          setErrorType(IdentityProfileErrorTypes.IdentityNotFound);
        } else {
          setErrorType(IdentityProfileErrorTypes.RequestError);
        }
        console.error(error);
      }
    })();
  }, [dispatch, asMerchantId, identityId]);

  if (errorType) {
    return (IdentityProfileErrorScreens[errorType] || IdentityProfileErrorScreens[IdentityProfileErrorTypes.RequestError]);
  }

  return (
    <Box p={2} height="100%">
      <Grid container direction="column" wrap="nowrap" className={classes.wrapper}>
        <Box mb={1.5}>
          <IdentityProfileHeaderMenu identity={identityProfileModel.value} />
        </Box>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.sidebar}>
            {identityProfileModel.isLoading ? <PageLoader /> : <SideProfileMenu identity={identityProfileModel?.value} />}
          </Grid>
          <Grid item xs={12} className={classes.content}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
