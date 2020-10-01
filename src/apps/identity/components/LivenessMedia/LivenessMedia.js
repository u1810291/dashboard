import { Box, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStyles } from './LivenessMedia.styles';
import { ReactComponent as Placeholder } from './placeholder.svg';
import { ReactComponent as IconPlay } from './icon-play.svg';

export function LivenessMedia({ title, subtitle, image, video }) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const videoCurrent = videoRef.current;
    return () => {
      if (videoCurrent && video) {
        videoCurrent.removeEventListener('ended', handlePlayEnded);
      }
    };
  }, [handlePlayEnded, video]);

  const handleLoadedMetadata = useCallback(() => {
    if (video) {
      videoRef.current.pause();
      videoRef.current.addEventListener('ended', handlePlayEnded);
    }
  }, [handlePlayEnded, video]);

  const handlePlayerToggle = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  if (!(video || image)) {
    return <Placeholder />;
  }

  return (
    <Box className={classes.root}>
      {image && (
        <Box className={classes.mediaBox}>
          <img className={classes.media} src={image} alt={title} />
        </Box>
      )}
      {video && (
        <Box className={`${classes.mediaBox} ${classes.videoBox}`} onClick={handlePlayerToggle}>
          <video
            ref={videoRef}
            className={classes.media}
            autoPlay
            muted
            onLoadedMetadata={handleLoadedMetadata}
            onFocus={() => {}}
            src={video}
          />
          {!isPlaying && <IconPlay className={classes.play} />}
        </Box>
      )}
      {(title || subtitle) && (
        <Box className={classes.titleBox}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </Box>
      )}
    </Box>
  );
}
