/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

const Text = styled.span(
  ({
    align,
    color,
    lineHeight = 'normal',
    opacity = 1,
    padding = '',
    size = 2,
    textDecoration = 'none',
    uppercase,
    capitalize,
    weight = 2,
    wordBreak,
  }) => ({
    fontSize: size === 2 ? null : `${1 + 0.28 * (size - 2)}rem`,
    color: color ? `var(--mgi-theme-palette-${color})` : null,
    fontWeight: weight === 2 ? null : 400 + 100 * (weight - 2),
    lineHeight,
    textTransform: (() => {
      if (uppercase) return 'uppercase';
      if (capitalize) return 'capitalize';
      return 'inherit';
    })(),
    textAlign: align,
    wordBreak,
    padding,
    opacity,
    textDecoration,
  }),
);

export default Text;

export function H2({ size = 4, weight = 2, ...props }) {
  return <Text size={size} as="h2" weight={weight} {...props} />;
}

export function H3({ size = 2, weight = 4, ...props }) {
  return <Text size={size} weight={weight} as="h3" {...props} />;
}

export function HR({ margin = 10, width = 1, ...props }) {
  return (
    <hr
      css={css`
        margin: ${margin}px 0;
        border-width: ${width}px;
      `}
      {...props}
    />
  );
}

H2.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

H2.defaultProps = {
  size: 3,
  weight: 4,
};

H3.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

H3.defaultProps = {
  size: 2,
  weight: 4,
};

HR.propTypes = {
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

HR.defaultProps = {
  margin: 10,
  width: 1,
};
