import 'react-dates/initialize';
import React, { useState } from 'react';
import classNames from 'classnames';

import { SingleDatePicker } from 'react-dates';

import BaseInput from './BaseInput';

import CSS from './Input.module.css';

export default function (props) {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(null);

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
        function onDateChange(nextDate) {
          setDate(nextDate);
          onChange({
            target: {
              name,
              value: nextDate,
            },
          });
        }

        return (
          <div
            className={classNames(
              className,
              error && CSS.singleDatePickerError,
            )}
          >
            <SingleDatePicker
              date={date}
              onDateChange={onDateChange}
              focused={focused}
              onFocusChange={({ focused: isFocused }) => setFocused(isFocused)}
              {...fieldProps} // eslint-disable-line react/jsx-props-no-spreading
            />
          </div>
        );
      }}
    />
  );
}
