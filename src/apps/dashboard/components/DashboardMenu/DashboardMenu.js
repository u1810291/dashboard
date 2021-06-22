import { Box, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { signOut } from 'apps/auth/state/auth.actions';
import { TeamInviteModal } from 'apps/collaborators/components/TeamInviteModal/TeamInviteModal';
import { collaboratorAdd } from 'apps/collaborators/state/collaborator.actions';
import { selectCollaboratorState } from 'apps/collaborators/state/collaborator.selectors';
import { IntlButton } from 'apps/intl';
import { TopMenuItem } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { notification } from 'apps/ui';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3-white.svg';
import classnames from 'classnames';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronsLeft, FiChevronsRight, FiLogOut, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { selectIsOwnerModel, selectMerchantBusinessName } from 'state/merchant/merchant.selectors';
import { setIsDesktopMenuOpen } from '../../state/dashboard.actions';
import { selectIsDesktopMenuOpen } from '../../state/dashboard.selectors';
import { useLogout } from '../LogoutModal/LogoutModal';
import { PrimaryMenu } from '../PrimaryMenu/PrimaryMenu';
import { SecondaryMenu } from '../SecondaryMenu/SecondaryMenu';
import { useStyles } from './DashboardMenu.styles';

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
    createOverlay(<TeamInviteModal onSubmit={handleInviteSubmit} isPosting={state.isPosting} />);
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
      className={classnames(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: classnames({
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
            data-qa={QATags.Menu.Logo}
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
              data-qa={QATags.Menu.RollUpButton}
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
            <SecondaryMenu isOpen={open} />
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
                className={classnames(classes.inviteButton, {
                  [classes.inviteButtonSm]: !open,
                })}
                variant="contained"
                color="primary"
                onClick={openInviteModal}
                startIcon={<FiPlusCircle />}
                data-qa={QATags.Menu.InviteTeammate}
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
              qa={QATags.Menu.Account}
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
              data-qa={QATags.Menu.Logout}
            >
              {intl.formatMessage({ id: 'apps.settings.signout' })}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
}
