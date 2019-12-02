import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { copyToClipboard } from './copy-to-clipboard';
import { useStyles } from './CopyToClipboard.styles';

export function CopyToClipboard({ children, text, isOverlay = false }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box flexGrow="0" maxWidth="100%" width={isOverlay ? '100%' : 'auto'}>
        {children}
      </Box>
      {text && (
        <Box ml="0.5rem" flexGrow="0" className={isOverlay ? classes.overlayed : null}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => copyToClipboard(text)}
          >
            <FiCopy />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
