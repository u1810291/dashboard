import PropTypes from 'prop-types';
import React from 'react';
import { createOverlay } from 'components/overlay';

function YoutubeOverlay({ id }) {
  return (
    <div>
      <iframe
        title="Youtube overlay"
        width="919"
        height="517"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function openYoutubeOverlay({ id }) {
  createOverlay(<YoutubeOverlay id={id} />);
}

YoutubeOverlay.propTypes = {
  id: PropTypes.string.isRequired,
};
