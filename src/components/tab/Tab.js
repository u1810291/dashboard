import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Items from '../items';

import CSS from './Tab.module.scss';

export default function Tab({
  active,
  aside,
  align = 'center',
  background = 'white',
  className,
  contents,
  justify = 'center',
  onClick,
  tabs,
  withAside,
}) {
  return (
    <Items flow="row" gap={0}>
      <Items gap={0} flow="column" justifyContent="flex-start" className={CSS.tabAction}>
        {tabs.map((tab, index) => (
          <Items
            gap={0}
            key={tab}
            alignContent={align}
            justifyContent={justify}
          >
            <button
              type="button"
              className={classNames([{
                [`background-${background}`]: active === index,
                ...className,
                [CSS.active]: active === index,
              }, CSS.tab])}
              onClick={onClick.bind(this, index)}
            >
              <FormattedMessage id={tab} />
            </button>
          </Items>
        ))}
      </Items>
      <Items>
        <TabWrapper
          withAside={withAside}
          background={background}
          className={className}
          content={contents[active]}
          aside={aside[active]}
        />
      </Items>
    </Items>
  );
}

export function TabWrapper({
  background = 'white',
  className,
  content,
  withAside,
  aside,
}) {
  return withAside ? (
    <Items gap={2} flow="column" templateColumns="2.5fr 1fr">
      <Items
        className={classNames(CSS.tabWrapper, [`background-${background} ${className || ''}`])}
      >
        {content}
      </Items>
      <Items className={CSS.asideWrapper}>
        { aside }
      </Items>
    </Items>
  ) : (
    <Items
      className={classNames(CSS.tabWrapper, [`background-${background} ${className || ''}`])}
    >
      {content}
    </Items>
  );
}

Tab.propTypes = {
  active: PropTypes.number.isRequired,
  align: PropTypes.string,
  aside: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  background: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  justify: PropTypes.string,
  onClick: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.string),
  withAside: PropTypes.bool.isRequired,
};

Tab.defaultProps = {
  align: 'center',
  background: 'white',
  contents: [],
  justify: 'center',
  onClick: () => {},
  tabs: [],
};

TabWrapper.propTypes = {
  aside: PropTypes.shape({}).isRequired,
  background: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  withAside: PropTypes.bool.isRequired,
};

TabWrapper.defaultProps = {
  background: 'white',
  content: null,
};
