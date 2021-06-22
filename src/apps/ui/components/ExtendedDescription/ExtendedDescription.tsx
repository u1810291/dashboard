import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './ExtendedDescription.styles';

interface ExtendedDescriptionProps {
  title: string;
  text: ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  className?: string;
}

export function ExtendedDescription({ title, text, prefix, postfix, className }: ExtendedDescriptionProps) {
  const classes = useStyles();

  return (
    <Box className={`${classes.extendedDescription} ${className}`}>
      {prefix && <Box mr={0.7}>{prefix}</Box>}
      <Box mr={0.7}>
        <Box mb={0.5} fontWeight="bold" color="common.black90">{title}</Box>
        <Box color="common.black75">{text}</Box>
      </Box>
      {postfix && (
        <Box ml={0.7}>
          {postfix}
        </Box>
      )}
    </Box>
  );
}

ExtendedDescription.defaultProps = {
  prefix: null,
  postfix: null,
  className: '',
};
