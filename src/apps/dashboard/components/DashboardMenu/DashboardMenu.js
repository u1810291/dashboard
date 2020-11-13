import { Box, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useOverlay } from 'apps/overlay';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3-white.svg';
import clsx from 'clsx';
import { notification } from 'components/notification';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronsLeft, FiChevronsRight, FiLogOut, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { selectIsOwnerModel, selectMerchantBusinessName } from '../../../../state/merchant/merchant.selectors';
import { signOut } from '../../../auth/state/auth.actions';
import { TeamInviteModal } from '../../../collaborators/components/TeamInviteModal/TeamInviteModal';
import { collaboratorAdd } from '../../../collaborators/state/collaborator.actions';
import { selectCollaboratorState } from '../../../collaborators/state/collaborator.selectors';
import { IntlButton } from '../../../intl';
import { TopMenuItem } from '../../../layout';
import { useLogout } from '../LogoutModal/LogoutModal';
import { PrimaryMenu } from '../PrimaryMenu/PrimaryMenu';
import { SecondaryMenu } from '../SecondaryMenu/SecondaryMenu';
import { useStyles } from './DashboardMenu.styles';
import { selectIsDesktopMenuOpen } from '../../state/dashboard.selectors';
import { setIsDesktopMenuOpen } from '../../state/dashboard.actions';
import { Routes } from '../../../../models/Router.model';

export function DashboardMenu() {
  const ownerModel = useSelector(selectIsOwnerModel);
  const isOwner = ownerModel.isLoaded && ownerModel.value === true;
  const classes = useStyles();
  const state = useSelector(selectCollaboratorState);
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isDesktopMenuOpen = useSelector(selectIsDesktopMenuOpen);
  const [open, setOpen] = useState(isDesktop && isDesktopMenuOpen);
  const name = useSelector(selectMerchantBusinessName);
  const [createOverlay, closeOverlay] = useOverlay();
  const logout = useLogout();

  const handleLogout = useCallback(async () => {
    await logout(intl.formatMessage({ id: 'confirm_string' }));
    dispatch(signOut());
    history.push(Routes.root);
  }, [dispatch, history, intl, logout]);

  const handleInviteSubmit = useCallback(async (data) => {
    closeOverlay();
    try {
      await dispatch(collaboratorAdd({
        role: parseInt(data.role, 10),
        user: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }));
      notification.info(intl.formatMessage({ id: 'teamTable.inviteSuccess.description' }));
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.submit.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, closeOverlay, intl]);

  const openInviteModal = useCallback(() => {
    if (!isDesktop) {
      setOpen(false);
    }
    createOverlay(
      <TeamInviteModal
        onSubmit={handleInviteSubmit}
        isPosting={state.isPosting}
      />);
  }, [handleInviteSubmit, state, isDesktop, setOpen, createOverlay]);

  const toggleDrawerOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  useEffect(() => history.listen(() => {
    if (!isDesktop) {
      setOpen(false);
    }
  }), [history, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      dispatch(setIsDesktopMenuOpen(open));
    }
  }, [open, dispatch, isDesktop]);

  const isTemporary = !isDesktop && open;

  return (
    <Drawer
      variant={isTemporary ? 'temporary' : 'permanent'}
      open={open}
      onClose={toggleDrawerOpen}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Grid container direction="column" className={classes.grid}>
        <Grid item className={classes.contentTop}>
          <NavLink
            exact
            to={isOwner ? Routes.root : Routes.list.root}
            data-qa={QATags.Navigation.Top.Logo}
          >
            <Box px={2} pt={2} pb={1} className={classes.logo}>
              <MatiLogo width={100} height={30} />
            </Box>
          </NavLink>

          <Box>
            <Button
              className={classes.menuButton}
              variant="contained"
              color="primary"
              onClick={toggleDrawerOpen}
              startIcon={open ? <FiChevronsLeft /> : <FiChevronsRight />}
            >
              {intl.formatMessage({ id: 'dashboard.menu.rollUp' })}
            </Button>
          </Box>
          <Box p={2}>
            <Divider className={classes.menuDivider} />
          </Box>
          <Box>
            <PrimaryMenu isOwner={isOwner} color="common.black7" />
          </Box>
          <Box p={2}>
            <Divider className={classes.menuDivider} />
          </Box>
          <Box>
            <SecondaryMenu color="common.black7" />
          </Box>
        </Grid>
        <Grid item className={classes.contentBottom}>
          <Box px={1.6} pb={2.5} pt={2}>
            {open ? <Typography variant="h4" className={classes.company}>{name}</Typography>
              : (
                <Box className={classes.companyShort}>
                  <Typography
                    variant="h4"
                    className={classes.company}
                  >
                    {name && name[0]}
                  </Typography>
                </Box>
              )}
          </Box>
          {isOwner && (
            <Box pr={2} pl={1.5}>
              <Button
                className={clsx(classes.inviteButton, {
                  [classes.inviteButtonSm]: !open,
                })}
                variant="contained"
                color="primary"
                onClick={openInviteModal}
                startIcon={<FiPlusCircle />}
              >
                {open && intl.formatMessage({ id: 'settings.teamSettings.inviteTeammate' })}
              </Button>
            </Box>
          )}
          <Box pt={1}>
            <TopMenuItem
              id="account"
              to={Routes.settings.root}
              label={intl.formatMessage({ id: 'dashboard.menu.settings' })}
              icon={<FiSettings />}
              color="common.black7"
              qa={QATags.Navigation.Top.Account}
              show={isOwner}
            />
          </Box>
          <Box className={classes.menuSelect}>
            <IntlButton fullLabel />
          </Box>
          <Box pb={1}>
            <Button
              className={classes.menuButton}
              variant="contained"
              color="primary"
              onClick={handleLogout}
              startIcon={<FiLogOut />}
            >
              {intl.formatMessage({ id: 'apps.settings.signout' })}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
}
