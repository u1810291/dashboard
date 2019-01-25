import React from 'react'
import CSS from './styles.css'

export default function({
  color = 'blue',
  onChange = () => {},
  checked = false
}) {
  return (
    <div
      onClick={onChange}
      data-color={color}
      className={CSS.checkButton}
      data-checked={checked}
    />
  )
}
