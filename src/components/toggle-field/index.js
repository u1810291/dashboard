import React from 'react'
import classNames from 'classnames'
import CSS from './styles.css'

export default function BooleanField({
  onClick = () => {},
  checked = false
}) {
  return (
    <div className={classNames(CSS.toggle, { checked })} onClick={onClick} />
  )
}
