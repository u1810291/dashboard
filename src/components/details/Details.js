import React, { useState } from 'react'
import classNames from 'classnames'
import Items from 'src/components/items'
import CSS from './Details.scss'

export default function Details({
  summary,
  children,
  defaultOpened = false,
  ...itemsProps
}) {
  const [state, setState] = useState({ opened: defaultOpened })

  return (
    <Items flow="row" gap={1} {...itemsProps}>
      <h3
        className={classNames(CSS.summary, { opened: state.opened })}
        onClick={() => setState({ opened: !state.opened })}
      >
        {summary}
      </h3>
      {state.opened && <div className="text-secondary">{children}</div>}
    </Items>
  )
}
