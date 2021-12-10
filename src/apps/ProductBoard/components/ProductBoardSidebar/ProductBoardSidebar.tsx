import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Box, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { FiArrowUp, FiBell, FiChevronsRight, FiChevronsLeft, FiMail, FiTruck } from 'react-icons/fi';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import HeaderImage from '../../assets/headerImage.png';
import { useStyles } from './ProductBoardSidebar.styles';

export function ProductBoardSidebar({ toggleDrawer, open }: {
  toggleDrawer: () => void;
  open: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:768px)', { noSsr: true });

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      variant="permanent"
      anchor="right"
      className={classnames({
        [classes.drawer]: open,
        [classes.drawerClosed]: !open,
        [classes.drawerOpenMobile]: open && !isDesktop,
        [classes.drawerClosedMobile]: !open && !isDesktop,
      })}
      classes={{
        paper: classnames({
          [classes.drawer]: open,
          [classes.drawerClosed]: !open,
          [classes.drawerOpenMobile]: open && !isDesktop,
          [classes.drawerClosedMobile]: !open && !isDesktop,
        }),
      }}
    >
      <IconButton className={classes.button} onClick={toggleDrawer}>
        {open ? <FiChevronsRight size={17} /> : <FiChevronsLeft size={17} />}
      </IconButton>
      <Box
        pl={2}
        pr={2}
        className={classnames({
          [classes.drawerContent]: open,
          [classes.drawerContentClosed]: !open,
        })}
      >
        <img src={HeaderImage} alt=" " />
        <Box>
          <Typography variant="h5">
            {intl.formatMessage({ id: 'productBoard.welcome.title' })}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'productBoard.welcome.subtitle' })}
          </Typography>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <FiMail />
          <Typography variant="subtitle2" className={classes.listSubheading}>
            {intl.formatMessage({ id: 'productBoard.submitIdeas.title' })}
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'productBoard.submitIdeas.subtitle' })}
          </Typography>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <FiArrowUp />
          <Typography variant="subtitle2" className={classes.listSubheading}>
            {intl.formatMessage({ id: 'productBoard.upvoteFeatures.title' })}
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'productBoard.upvoteFeatures.subtitle' })}
          </Typography>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <FiBell />
          <Typography variant="subtitle2" className={classes.listSubheading}>
            {intl.formatMessage({ id: 'productBoard.stayInformed.title' })}
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'productBoard.stayInformed.subtitle' })}
          </Typography>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <FiTruck />
          <Typography variant="subtitle2" className={classes.listSubheading}>
            {intl.formatMessage({ id: 'productBoard.reviewAndShip.title' })}
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'productBoard.reviewAndShip.subtitle' })}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
