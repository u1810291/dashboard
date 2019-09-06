/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

const Text = styled.span(
  ({
    align,
    color,
    lineHeight = 1,
    opacity = 1,
    padding = '',
    size = 2,
    textDecoration = 'none',
    uppercase,
    weight = 2,
  }) => ({
    fontSize: size === 2 ? null : `${1 + 0.28 * (size - 2)}rem`,
    color: color ? `var(--mgi-theme-palette-${color})` : null,
    fontWeight: weight === 2 ? null : 400 + 100 * (weight - 2),
    lineHeight,
    textTransform: uppercase ? 'uppercase' : null,
    textAlign: align,
    padding,
    opacity,
    textDecoration,
  }),
);

export default Text;

export function H1({ size = 4, weight = 4, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text size={size} weight={weight} as="h1" {...props} />;
}

export function H2({ size = 3, weight = 4, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text size={size} weight={weight} as="h2" {...props} />;
}

export function H3({ size = 2, weight = 4, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text size={size} weight={weight} as="h3" {...props} />;
}

export function Small({ size = 1.5, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text size={size} as="small" {...props} />;
}

export function HR({ margin = 10, width = 1, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <hr css={css`margin: ${margin}px 0; border-width: ${width}px;`} {...props} />;
}

H1.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

H1.defaultProps = {
  size: 4,
  weight: 4,
};

H2.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

H2.defaultProps = {
  size: 3,
  weight: 4,
};

H3.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

H3.defaultProps = {
  size: 2,
  weight: 4,
};

Small.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

Small.defaultProps = {
  size: 1.5,
};

HR.propTypes = {
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

HR.defaultProps = {
  margin: 10,
  width: 1,
};
