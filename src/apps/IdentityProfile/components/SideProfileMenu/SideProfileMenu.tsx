import React, { useCallback, useState } from 'react';
import { Box, Grid, IconButton, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { RoundProfilePicture } from 'apps/ui';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { IdentityProfileResponse } from 'apps/IdentityProfile/models/IdentityProfile.model';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { PrivateImage } from 'apps/media';
import { ProfileInformation } from '../ProfileInformation/ProfileInformation';
import { useStyles } from './SideProfileMenu.styles';

export function SideProfileMenu({ identity }: {
   identity: IdentityProfileResponse;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = useCallback(() => { setIsOpen((prevState) => !prevState); }, []);

  return (
    <Paper className={classes.container}>
      <Box p={2}>
        <Box mb={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            <RoundProfilePicture
              image={identity?.summary?.selfiePhotoUrl?.value
                ? <PrivateImage src={identity.summary.selfiePhotoUrl.value} alt="profile" />
                : <UserDeletedIcon />}
            />
            <IconButton onClick={handleToggleOpen} className={classNames(classes.button, { [classes.rotated]: isOpen })}>
              <FiChevronDown />
            </IconButton>
          </Grid>
        </Box>
        <Box mb={4}>
          <ProfileInformation profileSummary={identity?.summary} isShowFull={isDesktop || isOpen} identityId={identity?._id} />
        </Box>
      </Box>
    </Paper>
  );
}
