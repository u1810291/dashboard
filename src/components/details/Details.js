import React, { useState } from 'react'
import classNames from 'classnames'
import { Text, Items } from 'components'
import CSS from './Details.module.scss'

export default function Details({
  summary,
  children,
  cls,
  defaultOpened = false,
  summaryProps = {},
  ...itemsProps
}) {
  const [state, setState] = useState({ opened: defaultOpened })

  return (
    <Items flow="row" gap={1} {...itemsProps}>
      <Text
        className={classNames(cls, CSS.summary, { opened: state.opened })}
        onClick={() => setState({ opened: !state.opened })}
        {...summaryProps}
      >
        {summary}
      </Text>
      {state.opened && <div className="text-secondary">{children}</div>}
    </Items>
  )
}
