/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import Card from '../card';

export default function PopupWindow({ children, size, padding = 4, ...props }) {
  return (
    <Card
      padding={padding}
      css={css`
        width: 670px;
      `}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Card>
  );
}

PopupWindow.propTypes = {
  padding: PropTypes.number,
  size: PropTypes.number,
};

PopupWindow.defaultProps = {
  padding: 4,
  size: 0,
};
