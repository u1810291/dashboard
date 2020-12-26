import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Box } from '@material-ui/core';
import { useStyles } from './VideoPlayer.styles';

export function VideoPlayer({ aspectRatio, ...props }) {
  const [width, height] = aspectRatio.split(':');
  const iframeHeight = (100 * parseInt(height, 10)) / parseInt(width, 10);
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} style={{ paddingTop: `${iframeHeight}%` }}>
      <ReactPlayer
        width="100%"
        height="100%"
        className={classes.player}
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      />
    </Box>
  );
}

VideoPlayer.propTypes = {
  aspectRatio: PropTypes.string,
};

VideoPlayer.defaultProps = {
  aspectRatio: '16:9',
};
