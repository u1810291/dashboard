import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { RoundProfilePicture } from 'apps/ui';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { IdentityProfileErrorTypes, IdentityProfileResponse } from 'apps/IdentityProfile/models/IdentityProfile.model';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { identityProfileClear, identityProfileLoad } from 'apps/IdentityProfile/store/IdentityProfile.actions';
import { verificationListClear, verificationListLoad } from 'apps/Verification/state/Verification.actions';
import { useQuery } from 'lib/url';
import { PageLoader } from 'apps/layout';
import { useParams } from 'react-router-dom';
import { PrivateImage } from 'apps/media';
import { selectIdentityProfileModel } from '../../store/IdentityProfile.selectors';
import { ProfileInformation } from '../ProfileInformation/ProfileInformation';
import { PassedFlows } from '../PassedFlows/PassedFlows';
import { useStyles } from './SideProfileMenu.styles';

export function SideProfileMenu({ profile, onError }: {
   profile: IdentityProfileResponse;
   onError: (error: IdentityProfileErrorTypes) => void;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [isOpen, setIsOpen] = useState(false);
  const { asMerchantId } = useQuery();
  const { identityId } = useParams();
  const dispatch = useDispatch();
  const identityProfileModel = useSelector(selectIdentityProfileModel);

  const handleToggleOpen = useCallback(() => { setIsOpen((prevState) => !prevState); }, []);

  useEffect(() => () => {
    dispatch(identityProfileClear());
    dispatch(verificationListClear());
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(identityProfileLoad(identityId, asMerchantId));
      } catch (error) {
        if ((error as any)?.response?.status === 404) {
          onError(IdentityProfileErrorTypes.IdentityNotFound);
        } else {
          onError(IdentityProfileErrorTypes.RequestError);
        }
        console.error(error);
      }
    };

    loadData();
  }, [dispatch, asMerchantId, identityId, onError]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(verificationListLoad(identityId, asMerchantId));
      } catch (error) {
        onError(IdentityProfileErrorTypes.RequestError);
        console.error(error);
      }
    };
    loadData();
  }, [dispatch, asMerchantId, identityId, onError]);

  if (identityProfileModel.isLoading) {
    return <PageLoader />;
  }

  return (
    <Paper className={classes.container}>
      <Box p={2}>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <RoundProfilePicture
              image={profile?.summary?.selfiePhotoUrl?.value
                ? <PrivateImage src={profile.summary.selfiePhotoUrl.value} alt="profile" />
                : <UserDeletedIcon />}
            />
            <IconButton onClick={handleToggleOpen} className={classNames(classes.button, { [classes.rotated]: isOpen })}>
              <FiChevronDown />
            </IconButton>
          </Grid>
        </Box>
        <Box mb={4}>
          <ProfileInformation profileSummary={profile?.summary} isShowFull={isDesktop || isOpen} identityId={identityId} />
        </Box>
        <PassedFlows />
      </Box>
    </Paper>
  );
}
