import PropTypes from 'prop-types';
import React from 'react';
import CSS from './RadioButtonGroupField.module.scss';

export default function RadioButtonGroupField({ options, name, value, ...radioProps }) {
  const radioButtons = options
      && options.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key,jsx-a11y/label-has-associated-control
        <label className={CSS.itemWrapper} key={index}>
          {item.label}
          <input
            type="radio"
            name={name}
            value={item.value}
            defaultChecked={value === item.value}
          />
          <span className={CSS.checkmark} />
          <div className={CSS.itemDescriptionWrapper}>
            {item.imgSrc && (
              <img src={item.imgSrc} alt="" />
            )}
            {item.description && (
              <div className={CSS.itemDescription}>{item.description}</div>
            )}
          </div>
        </label>
      ));

  return (
    <div
      {...radioProps} // eslint-disable-line react/jsx-props-no-spreading
    >
      {radioButtons}
    </div>
  );
}

RadioButtonGroupField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

RadioButtonGroupField.defaultProps = {
  name: '',
  options: [],
  value: '',
};
