/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';

import Card from 'components/card';

export default function TextField({
  padding = 1,
  border = 'darkgray',
  shadow = 0,
  ...props
}) {
  return (
    <Card
      as="input"
      border={border}
      shadow={shadow}
      padding={padding}
      css={css`
        font: inherit;
        width: 100%;
      `}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
}

TextField.propTypes = {
  border: PropTypes.string,
  padding: PropTypes.number,
  shadow: PropTypes.number,
};

TextField.defaultProps = {
  border: 'darkgray',
  padding: 1,
  shadow: 0,
};
