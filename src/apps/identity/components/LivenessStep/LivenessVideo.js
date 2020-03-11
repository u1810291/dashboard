import PropTypes from 'prop-types';
import React from 'react';
import CSS from './LivenessStep.module.scss';
import { ReactComponent as Placeholder } from './placeholder.svg';

export function LivenessVideo({ url }) {
  if (!url) {
    return <Placeholder />;
  }

  return (
    <video
      autoPlay
      muted
      onMouseOver={({ target }) => {
        target.loop = true;
        target.play();
      }}
      onMouseLeave={({ target }) => {
        target.loop = false;
        target.pause();
      }}
      onFocus={() => {}}
      src={url}
      className={CSS.video}
    />
  );
}

LivenessVideo.propTypes = {
  url: PropTypes.string.isRequired,
};
