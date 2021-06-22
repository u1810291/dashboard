import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './ImageInfo.styles';

interface ImageInfoProps {
  img: ReactNode;
  text: ReactNode;
  title: string;
}

export function ImageInfo({ img, title, text }: ImageInfoProps) {
  const classes = useStyles();

  return (
    <Box className={classes.imageInfo}>
      <Box className={classes.image}>
        {img}
      </Box>
      <Box className={classes.description}>
        <Box className={classes.title}>{title}</Box>
        <Box className={classes.text}>{text}</Box>
      </Box>
    </Box>
  );
}
