/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ aspectRatio, ...props }) {
  const [width, height] = aspectRatio.split(':');
  const iframeHeight = (100 * parseInt(height, 10)) / parseInt(width, 10);

  return (
    <div
      css={css`
        position: relative;
        padding-top: ${iframeHeight}%;
      `}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      />
    </div>
  );
}

VideoPlayer.propTypes = {
  aspectRatio: PropTypes.string,
};

VideoPlayer.defaultProps = {
  aspectRatio: '16:9',
};
