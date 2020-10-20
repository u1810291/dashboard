import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { copyToClipboard } from './copy-to-clipboard';
import { useStyles } from './CopyToClipboard.styles';

export function CopyToClipboard({ children, text, isOverlay = false, withCopyText = false, qa }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.root}>
      <Box flexGrow="0" maxWidth="100%" width={isOverlay ? '100%' : 'auto'}>
        {children}
      </Box>
      {text && (
        <Box ml="0.5rem" flexGrow="0" className={isOverlay ? classes.overlayed : null}>
          <IconButton
            size="small"
            className={classes.button}
            onClick={() => copyToClipboard(text)}
            data-qa={qa}
          >
            <FiCopy />
            {withCopyText && (
              <Box component="span" ml={1}>{intl.formatMessage({ id: 'copy' })}</Box>
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
