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
  qa = {}, // should have `Value` and `Copy` fields
}) {
  const classes = useStyles();
  return (
    <CopyToClipboard text={isCopyToClipboard ? code : null} isOverlay qa={qa.Copy}>
      <Box className={isBorder ? classes.bordered : null}>
        <PrismSyntaxHighlighter
          style={style}
          className={classes.content}
          language={language}
          data-qa={qa.Value}
        >
          {code}
        </PrismSyntaxHighlighter>
      </Box>
    </CopyToClipboard>
  );
}
