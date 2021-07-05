import { Box, IconButton } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FiCopy } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { copyToClipboard } from 'lib/copyToClipboard';
import { notification } from '../Notification/Notification';
import { useStyles } from './CopyToClipboard.styles';

export interface CopyToClipboardProps {
  children: React.ReactNode;
  text: string;
  isOverlay?: boolean;
  withCopyText?: boolean;
  qa?: string;
}

export function CopyToClipboard({ children, text, isOverlay = false, withCopyText = false, qa }: CopyToClipboardProps) {
  const classes = useStyles();
  const intl = useIntl();
  const handleClick = useCallback(() => {
    copyToClipboard(text);
    notification.info(intl.formatMessage({ id: 'copied' }));
  }, [text, intl]);

  return (
    <Box className={classes.root}>
      <Box flexGrow="0" className={isOverlay ? classes.overlayedText : classes.text}>
        {children}
      </Box>
      {text && (
        <Box ml="0.5rem" flexGrow="0" className={isOverlay ? classes.overlayed : null}>
          <IconButton
            size="small"
            className={classes.button}
            onClick={handleClick}
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
