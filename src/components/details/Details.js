import React, { useState } from 'react';
import clsx from 'clsx';

import { Text, Items } from 'components';
import { useStyles } from './Details.styles';

export default function Details({
  summary,
  children,
  cls,
  defaultOpened = false,
  summaryProps = {},
  ...itemsProps
}) {
  const classes = useStyles();
  const [state, setState] = useState({ opened: defaultOpened });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Items flow="row" gap={1} {...itemsProps}>
      <Text
        className={clsx(cls, classes.summary, { opened: state.opened })}
        onClick={() => setState({ opened: !state.opened })}
        {...summaryProps} // eslint-disable-line react/jsx-props-no-spreading
      >
        {summary}
      </Text>
      {state.opened && <div className="text-secondary">{children}</div>}
    </Items>
  );
}
