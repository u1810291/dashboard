import React, { useCallback, useState } from 'react';
import { Box, Grid, IconButton, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { RoundProfilePicture } from 'apps/ui';
import { useSelector } from 'react-redux';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { IdentityProfileResponse } from 'apps/IdentityProfile/models/IdentityProfile.model';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { selectIdentityProfileId } from '../../store/IdentityProfile.selectors';
import { ProfileInformation } from '../ProfileInformation/ProfileInformation';
import { PassedFlows } from '../PassedFlows/PassedFlows';
import { useStyles } from './SideProfileMenu.styles';

export function SideProfileMenu({ profile }: {
   profile: IdentityProfileResponse
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const identityId = useSelector(selectIdentityProfileId);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = useCallback(() => { setIsOpen((prevState) => !prevState); }, []);

  return (
    <Paper className={classes.container}>
      <Box p={2}>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <RoundProfilePicture
              image={profile?.summary?.selfiePhotoUrl?.value
                ? <img src={profile?.summary?.selfiePhotoUrl?.value} alt="profile" />
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
