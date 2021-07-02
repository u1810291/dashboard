import { Box, Typography } from '@material-ui/core';
import { ReactComponent as IconDownload } from 'assets/icon-download.svg';
import { ReactComponent as Spinner } from 'assets/icon-load.svg';
import { ReactComponent as IconSoundOff } from 'assets/icon-sound-off.svg';
import { ReactComponent as IconSoundOn } from 'assets/icon-sound-on.svg';
import axios from 'axios';
import { downloadBlob } from 'lib/file';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as IconPlay } from './icon-play.svg';
import { useStyles } from './LivenessMedia.styles';
import { ReactComponent as Placeholder } from './placeholder.svg';

export interface LivenessMediaProps {
  title: string,
  subtitle?: string,
  image?: string,
  video?: string,
  withSoundButton?: boolean,
  downloadableFileName?: string,
}

export function LivenessMedia({ title, subtitle, image, video, withSoundButton = false, downloadableFileName = 'selfie' }: LivenessMediaProps) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [muted, setMuted] = useState(!withSoundButton);

  const handlePlayEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggleSound = useCallback(() => {
    setMuted((prev) => !prev);
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

  const handleDownload = useCallback(async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      try {
        const { data: blob } = await axios.get(image, { responseType: 'blob' });
        downloadBlob(blob, `${downloadableFileName}.jpeg`);
        setIsDownloading(false);
      } catch (error) {
        console.error(error);
        setIsDownloading(false);
      }
    }
  }, [image, downloadableFileName, isDownloading]);

  if (!(video || image)) {
    return <Placeholder />;
  }

  return (
    <Box className={classes.root}>
      {image && (
        <Box className={classes.mediaBox}>
          <img className={classes.media} src={image} alt={title} />
          {isDownloading ? (
            <Spinner onClick={handleDownload} className={classes.load} />
          ) : (
            <IconDownload onClick={handleDownload} className={classes.load} />
          )}
        </Box>
      )}
      {video && (
        <Box className={`${classes.mediaBox} ${classes.videoBox}`}>
          <Box onClick={handlePlayerToggle}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              className={classes.media}
              autoPlay
              muted={muted}
              onLoadedMetadata={handleLoadedMetadata}
              onFocus={() => {}}
              src={video}
            />
            {!isPlaying && <IconPlay className={classes.play} />}
          </Box>
          {withSoundButton && (
            muted ? (
              <IconSoundOff onClick={toggleSound} className={classes.sound} />
            ) : (
              <IconSoundOn onClick={toggleSound} className={classes.sound} />
            )
          )}
        </Box>
      )}
      {(title || subtitle) && (
        <Box className={classes.titleBox}>
          <Typography variant="body1" className={classes.title}>{title}</Typography>
          <Typography variant="body2" className={classes.subtitle}>{subtitle}</Typography>
        </Box>
      )}
    </Box>
  );
}
