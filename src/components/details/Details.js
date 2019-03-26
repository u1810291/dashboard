import React, { useState } from 'react'
import classNames from 'classnames'
import CSS from './Details.scss'

export default function Details({ summary, children, defaultOpened = false }) {
  const [state, setState] = useState({ opened: defaultOpened })

  return (
    <React.Fragment>
      <h3
        className={classNames(CSS.summary, { opened: state.opened })}
        onClick={() => setState({ opened: !state.opened })}
      >
        {summary}
      </h3>
      {state.opened && <div className="text-secondary">{children}</div>}
    </React.Fragment>
  )
}
