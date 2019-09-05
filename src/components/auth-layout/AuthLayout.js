import React from 'react';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';

import CSS from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={CSS.layout}>
      <Helmet>
        <title>Mati Dashboard</title>
      </Helmet>
      <MediaQuery query="(min-width: 769px)">
        <div className={CSS.layoutBackground} />
      </MediaQuery>
      <div className={CSS.layoutContent}>{children}</div>
    </div>
  );
}
