import { AppBar, Toolbar } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useStyles } from './Layout.styles';

export function Layout({ children, menu, banner }) {
  const location = useLocation();
  const wrapper = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (window.Appcues) {
      window.Appcues.page();
    }
    if (wrapper.current && wrapper.current.scrollTo) {
      window.scrollTo(0, 0);
      wrapper.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar className={classes.toolBar}>
          {menu}
        </Toolbar>
        {banner}
      </AppBar>
      <div ref={wrapper} className={classes.content}>
        {children}
      </div>
    </div>
  );
}
