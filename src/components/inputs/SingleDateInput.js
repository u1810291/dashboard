import React, { useState } from 'react'
import BaseInput from './BaseInput'
import classNames from 'classnames'
import CSS from './Input.module.css'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

export default function(props) {
  const [focused, setFocused] = useState(false)
  const [date, setDate] = useState(null)

  return (
    <BaseInput
      {...props}
      renderer={({
        value,
        onChange,
        name,
        className,
        onBlur,
        children,
        error,
        ...fieldProps
      }) => {
        function onDateChange(value) {
          setDate(value)
          onChange({
            target: {
              name,
              value
            }
          })
        }

        return (
          <div
            className={classNames(
              className,
              error && CSS.singleDatePickerError
            )}
          >
            <SingleDatePicker
              date={date}
              onDateChange={onDateChange}
              focused={focused}
              onFocusChange={({ focused }) => setFocused(focused)}
              {...fieldProps}
            />
          </div>
        )
      }}
    />
  )
}
