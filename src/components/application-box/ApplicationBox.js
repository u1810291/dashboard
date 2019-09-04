import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';
import CSS from './ApplicationBox.module.css';

export default function ApplicationBox({ children, menu }) {
  return (
    <div className={CSS.box}>
      {menu}
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>
        {children}
      </div>
    </div>
  );
}

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
