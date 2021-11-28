import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useStyles } from './Layout.styles';

export function Layout({ children, menu }: {
  children: React.ReactNode;
  menu?: React.ReactNode;
}) {
  const location = useLocation();
  const wrapper = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    // @ts-ignore
    if (window.Appcues) {
      // @ts-ignore
      window.Appcues.page();
    }
    if (wrapper.current && wrapper.current.scrollTo) {
      window.scrollTo(0, 0);
      wrapper.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className={classes.container}>
      {menu}
      <div ref={wrapper} className={classes.content}>
        {children}
      </div>
    </div>
  );
}
