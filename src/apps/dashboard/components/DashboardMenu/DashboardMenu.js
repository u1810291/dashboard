import { Box, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { signOut } from 'apps/auth/state/auth.actions';
import { IntlButton, useFormatMessage } from 'apps/intl';
import { TopMenuItem } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { ReactComponent as MatiLogoWithText } from 'assets/metamap-logo-white.svg';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo-review.svg';

import classnames from 'classnames';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronsLeft, FiChevronsRight, FiLogOut, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { selectIsOwnerModel, selectMerchantBusinessName, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useRole, TeamInviteModal, inviteCollaborator, selectCollaboratorState } from 'apps/collaborators';
import { WithAuditor } from 'models/Collaborator.model';
import { MerchantTags } from 'models/Merchant.model';
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
  const formatMessage = useFormatMessage();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isDesktopMenuOpen = useSelector(selectIsDesktopMenuOpen);
  const [isOpen, setIsOpen] = useState(isDesktop && isDesktopMenuOpen);
  const name = useSelector(selectMerchantBusinessName);
  const merchantTags = useSelector(selectMerchantTags);
  const canAddTemplate = merchantTags.includes(MerchantTags.CanUseAddSolutionToCatalog);
  const [createOverlay, closeOverlay] = useOverlay();
  const logout = useLogout();
  const role = useRole();

  const handleLogout = useCallback(async () => {
    await logout(formatMessage('confirm_string'));
    dispatch(signOut());
    history.push(Routes.root);
  }, [dispatch, history, logout]);

  const openInviteModal = useCallback(() => {
    if (!isDesktop) {
      setIsOpen(false);
    }
    createOverlay(<TeamInviteModal
      onSubmit={(data) => {
        closeOverlay();
        dispatch(inviteCollaborator(formatMessage, data));
      }}
      isPosting={state.isPosting}
    />);
  }, [state, isDesktop, setIsOpen, createOverlay]);

  const toggleDrawerOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  useEffect(() => history.listen(() => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  }), [history, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      dispatch(setIsDesktopMenuOpen(isOpen));
    }
  }, [isOpen, dispatch, isDesktop]);

  const isTemporary = !isDesktop && isOpen;

  return (
    <Drawer
      variant={isTemporary ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={toggleDrawerOpen}
      className={classnames(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: classnames({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
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
            <Box px={isOpen ? 2 : 0} mx={isOpen ? 0 : -1} pt={2} pb={1} className={classes.logo}>
              {isOpen ? (<MatiLogoWithText width={110} height={30} />) : (<MatiLogo height={22} />)}
            </Box>
          </NavLink>

          <Box>
            <Button
              className={classes.menuButton}
              variant="contained"
              color="primary"
              onClick={toggleDrawerOpen}
              startIcon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
              data-qa={QATags.Menu.RollUpButton}
            >
              {formatMessage('dashboard.menu.rollUp')}
            </Button>
          </Box>
          <Box p={2}>
            <Divider className={classes.menuDivider} />
          </Box>
          <Box>
            <PrimaryMenu isOwner={isOwner} canAddTemplate={canAddTemplate} color="common.black7" />
          </Box>
          <Box p={2}>
            <Divider className={classes.menuDivider} />
          </Box>
          <Box>
            <SecondaryMenu isOwner={isOwner} isOpen={isOpen} />
          </Box>
        </Grid>
        <Grid item className={classes.contentBottom}>
          <Box px={1.6} pb={2.5} pt={2}>
            {isOpen ? <Typography variant="h4" className={classes.company}>{name}</Typography>
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
                  [classes.inviteButtonSm]: !isOpen,
                })}
                variant="contained"
                color="primary"
                onClick={openInviteModal}
                startIcon={<FiPlusCircle />}
                data-qa={QATags.Menu.InviteTeammate}
              >
                {isOpen && formatMessage('settings.teamSettings.inviteTeammate')}
              </Button>
            </Box>
          )}
          <Box pt={1}>
            <TopMenuItem
              id="account"
              to={Routes.settings.root}
              label={formatMessage('dashboard.menu.settings')}
              icon={<FiSettings />}
              color="common.black7"
              qa={QATags.Menu.Account}
              show={WithAuditor.includes(role)}
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
              {formatMessage('apps.settings.signout')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
}
