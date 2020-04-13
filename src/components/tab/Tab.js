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
  ...props
}) {
  return (
    <Items flow="row" gap={0} {...props}>
      <Items gap={0} flow="column" justifyContent="flex-start" className={CSS.tabAction}>
        {tabs.map(({ tab, badge, qa }, index) => (
          <Items
            data-qa={qa}
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
              { badge && badge }
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
  return withAside && aside ? (
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
  aside: PropTypes.arrayOf(PropTypes.shape({})),
  background: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  justify: PropTypes.string,
  onClick: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.object),
  withAside: PropTypes.bool.isRequired,
};

Tab.defaultProps = {
  align: 'center',
  background: 'white',
  contents: [],
  justify: 'center',
  onClick: () => {},
  tabs: [],
  aside: null,
};

TabWrapper.propTypes = {
  aside: PropTypes.shape({}),
  background: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  withAside: PropTypes.bool.isRequired,
};

TabWrapper.defaultProps = {
  background: 'white',
  content: null,
  aside: null,
};
