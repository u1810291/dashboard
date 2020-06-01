import React from 'react';
import { useStyles } from './LivenessStep.styles';
import { ReactComponent as Placeholder } from './placeholder.svg';

export function LivenessVideo({ url }) {
  const classes = useStyles();

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
      className={classes.video}
    />
  );
}
