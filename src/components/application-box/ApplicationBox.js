import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import CSS from './ApplicationBox.module.css';

const ApplicationBox = ({
  children,
  menu,
  ...props
}) => {
  const { location: { pathname } } = props;

  useEffect(() => {
    window.Appcues.page();
  }, [pathname]);

  return (
    <div className={CSS.box}>
      {menu}
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>
        {children}
      </div>
    </div>
  );
};

export default withRouter(ApplicationBox);

ApplicationBox.propTypes = {
  menu: PropTypes.node.isRequired,
};


export function Content({ className, children, fullwidth }) {
  return (
    <div className={classNames(CSS.content, className, { fullwidth })}>
      {children}
    </div>
  );
}

Content.propTypes = {
  fullwidth: PropTypes.bool,
};

Content.defaultProps = {
  fullwidth: true,
};
