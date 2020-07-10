import { Box, IconButton, Hidden, Drawer } from '@material-ui/core';
import { IntlButton } from 'apps/intl';
import { TopMenuItem } from 'apps/layout';
import MatiLogo from 'assets/header-mati-logo.png';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectReviewCounterModel } from 'state/identities/identities.selectors';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';
import { PrimaryMenu } from '../PrimaryMenu/PrimaryMenu';
import { SecondaryMenu } from '../SecondaryMenu/SecondaryMenu';
import { useStyles } from './DashboardMenu.styles';

export function DashboardMenu() {
  const ownerModel = useSelector(selectIsOwnerModel);
  const reviewCount = useSelector(selectReviewCounterModel);
  const isOwner = ownerModel.isLoaded && ownerModel.value === true;
  const classes = useStyles();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsSideMenuOpen((prev) => !prev);
  }, []);

  return (
    <Box display="flex" flexGrow={1}>
      {/* logo */}
      <TopMenuItem
        isActive={false}
        color="secondary"
        className={classes.logoItem}
        to={isOwner ? '/' : '/identities'}
        qa={QATags.Navigation.Top.Logo}
      >
        <img src={MatiLogo} alt="Mati" className={classes.logoImg} />
      </TopMenuItem>

      {/* desktop left menu */}
      <Hidden xsDown>
        <Box flexGrow={1} className={classes.desktopLeft}>
          <PrimaryMenu isOwner={isOwner} reviewCount={reviewCount} color="common.white" />
        </Box>
      </Hidden>

      {/* desktop right menu */}
      <Hidden smDown>
        <Box flexGrow={1} className={classes.desktopRight}>
          {isOwner && <SecondaryMenu color="common.white" />}
          <IntlButton />
        </Box>
      </Hidden>

      {/* mobile menu */}
      <Hidden mdUp>
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <IconButton onClick={handleToggleMenu} color="secondary">
            <FiMenu />
          </IconButton>
        </Box>
        <Drawer
          anchor="right"
          open={isSideMenuOpen}
          onClose={handleToggleMenu}
        >
          <Box className={classes.mobileMenu}>
            {/* left */}
            <Hidden only="sm">
              <Box flexGrow={1} className={classes.mobileLeft}>
                <PrimaryMenu
                  isOwner={isOwner}
                  reviewCount={reviewCount}
                  color="common.black"
                  isMobile
                />
              </Box>
            </Hidden>
            {/* right */}
            <Box flexGrow={1} className={classes.mobileRight}>
              {isOwner && <SecondaryMenu color="common.black" isMobile />}
              <IntlButton />
            </Box>
          </Box>
        </Drawer>
      </Hidden>
    </Box>
  );
}
