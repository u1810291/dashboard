import React from 'react'
import { times } from 'lodash'
import classNames from 'classnames'
import CSS from './Pager.css'

export const Pager = ({ count = 0, active = 0, onClick = () => {} }) => {
  return (
    <div className={CSS.pager}>
      {times(count).map(i => (
        <span
          key={i}
          className={classNames({ active: i === active })}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  )
}
