import React from 'react'
import CheckIcon from './icon.svg'
import CSS from './styles.css'

export default function({
  color = 'blue',
  onChange = () => {},
  checked = false
}) {
  return (
    <div onClick={onChange} data-color={color} className={CSS.checkButton}>
      {checked && <CheckIcon />}
    </div>
  )
}
