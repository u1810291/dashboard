import { Box } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import React from 'react';
import PrismSyntaxHighlighter from 'react-syntax-highlighter/prism';
import lightTheme from './light';
import lightYellowTheme from './light-yellow';
import darkTheme from './dark';
import { useStyles } from './SyntaxHighligther.styles';

export function SyntaxHighlighter({
  code = '',
  language,
  isCopyToClipboard = true,
  isBorder = true,
  isDarkTheme = false,
  isLightYellowTheme = false,
  qa = {}, // should have `Value` and `Copy` fields
  className = '',
  withCopyText = false,
  showLineNumbers = false,
}) {
  const classes = useStyles();
  let style = lightTheme;
  if (isDarkTheme) {
    style = darkTheme;
  }
  if (isLightYellowTheme) {
    style = lightYellowTheme;
  }
  return (
    <CopyToClipboard text={isCopyToClipboard ? code : null} isOverlay withCopyText={withCopyText} qa={qa.Copy}>
      <Box className={isBorder ? classes.bordered : null}>
        <PrismSyntaxHighlighter
          style={style}
          className={`${classes.content} ${className}`}
          language={language}
          data-qa={qa.Value}
          showLineNumbers={showLineNumbers}
          lineNumberContainerStyle={{ display: 'inline-block', margin: '-1rem 1rem 0 -1rem', padding: '10px 5px 12px 10px', verticalAlign: 'top', backgroundColor: 'rgba(131, 146, 184, .2)', fontSize: '14px', textAlign: 'right', color: '#CBD2E2' }}
        >
          {code}
        </PrismSyntaxHighlighter>
      </Box>
    </CopyToClipboard>
  );
}
