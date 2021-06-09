import React, { useCallback, useState } from 'react';
import { Box, Paper, Grid, IconButton, Collapse, useTheme, useMediaQuery } from '@material-ui/core';
import { RoundProfilePicture } from 'apps/ui';
import { useSelector } from 'react-redux';
import { selectIdentityProfileId } from 'state/identities/identities.selectors';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { ProfileInformation } from '../ProfileInformation/ProfileInformation';
import { notesTextStub, userDataStub } from '../../models/identityProfile.model';
import { NotesAboutCustomer } from '../NotesAboutCustomer/NotesAboutCustomer';
import { PassedFlows } from '../PassedFlows/PassedFlows';
import { useStyles } from './SideProfileMenu.styles';

export function SideProfileMenu() {
  const identityId = useSelector(selectIdentityProfileId);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [isOpen, setIsOpen] = useState(false);

  // TODO @vladislav.snimshchikov: Finish up handler when endpoints will be created
  const handleSubmitNotes = useCallback(() => {}, []);

  const handleToggleOpen = useCallback(() => { setIsOpen((prevState) => !prevState); }, []);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Grid container alignItems="center" justify="space-between">
            <RoundProfilePicture image={<img src={userDataStub.photo} alt="profile" />} />
            <IconButton onClick={handleToggleOpen} className={classNames(classes.button, { [classes.rotated]: isOpen })}>
              <FiChevronDown />
            </IconButton>
          </Grid>
        </Box>
        <Box mb={4}>
          <ProfileInformation isShowFull={isDesktop || isOpen} name={userDataStub.name} birthDate={userDataStub.birthDate} identityId={identityId} location={userDataStub.location} />
        </Box>
        <Collapse in={isDesktop || isOpen}>
          <Box mb={4}>
            <NotesAboutCustomer
              notes={notesTextStub}
              onSubmit={handleSubmitNotes}
            />
          </Box>
        </Collapse>
        <PassedFlows />
      </Box>
    </Paper>
  );
}
