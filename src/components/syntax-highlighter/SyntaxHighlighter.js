import { Box } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import React from 'react';
import PrismSyntaxHighlighter from 'react-syntax-highlighter/prism';
import style from './light';
import { useStyles } from './SyntaxHighligther.styles';

export function SyntaxHighlighter({
  code = '',
  language,
  isCopyToClipboard = true,
  isBorder = true,
}) {
  const classes = useStyles();
  return (
    <CopyToClipboard text={isCopyToClipboard ? code : null} isOverlay>
      <Box className={isBorder ? classes.bordered : null}>
        <PrismSyntaxHighlighter
          style={style}
          className={classes.content}
          language={language}
        >
          {code}
        </PrismSyntaxHighlighter>
      </Box>
    </CopyToClipboard>
  );
}
