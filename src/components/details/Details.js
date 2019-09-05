import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';

import { Text, Items } from 'components';
import CSS from './Details.module.scss';

export default function Details({
  summary,
  children,
  cls,
  defaultOpened = false,
  summaryProps = {},
  ...itemsProps
}) {
  const [state, setState] = useState({ opened: defaultOpened });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Items flow="row" gap={1} {...itemsProps}>
      <Text
        className={classNames(cls, CSS.summary, { opened: state.opened })}
        onClick={() => setState({ opened: !state.opened })}
        {...summaryProps} // eslint-disable-line react/jsx-props-no-spreading
      >
        {summary}
      </Text>
      {state.opened && <div className="text-secondary">{children}</div>}
    </Items>
  );
}

Details.propTypes = {
  cls: PropTypes.string,
  defaultOpened: PropTypes.bool,
  summary: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  summaryProps: PropTypes.shape({}),
};

Details.defaultProps = {
  cls: '',
  defaultOpened: false,
  summary: null,
  summaryProps: {},
};
