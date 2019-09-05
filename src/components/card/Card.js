/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';

import Items from '../items';

function splitCSSValues(value, transform = (item) => item) {
  return value
    .toString()
    .split('/')
    .map(transform)
    .join(' ');
}

export const shadowValue = (shadow) => css`
  0px 2px calc(2px + 2px * ${shadow})
    rgba(52, 73, 94, calc(0.1 * ${shadow}));
`;

export const paddingValue = (padding) => css(
  splitCSSValues(
    padding,
    (value) => `calc(var(--mgi-spacing) * 0.5 * ${value})`,
  ),
);

export default function Card({
  children,
  background = 'white',
  border = 'transparent',
  padding = 2,
  shadow = 1,
  borderRadius = 1,
  className,
  ...props
}) {
  const cardStyles = css`
    --mgi-card-border-radius: 4px;
    overflow: hidden;
    border-radius: ${splitCSSValues(
    borderRadius,
    (value) => `calc(var(--mgi-card-border-radius) * ${value})`,
  )};
    box-shadow: ${shadowValue(shadow)};
    transition: box-shadow 0.2s ease-in-out;
    padding: ${typeof padding === 'string' ? padding : paddingValue(padding)};
  `;

  return (
    <Items
      flow="row"
      css={cardStyles}
      className={`background-${background} border-${border} ${className || ''}`}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Items>
  );
}

Card.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  shadow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

Card.defaultProps = {
  background: 'white',
  border: 'transparent',
  borderRadius: 1,
  padding: 2,
  shadow: 1,
};
