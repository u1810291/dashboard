import { Box } from '@material-ui/core';
import React from 'react';
import PrismLight from 'react-syntax-highlighter/prism-light';
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import lightTheme from './light';
import lightYellowTheme from './light-yellow';
import lightBlueTheme from './light-blue';
import darkTheme from './dark';
import { useStyles } from './SyntaxHighligther.styles';
import { SyntaxHighlighterLanguages } from '../../models/SyntaxHighlighter.model';

export function SyntaxHighlighter({
  code = '',
  language,
  isCopyToClipboard = true,
  isBorder = true,
  isDarkTheme = false,
  isLightYellowTheme = false,
  isLightBlueTheme = false,
  qa = {}, // should have `Value` and `Copy` fields
  className = '',
  withCopyText = false,
  showLineNumbers = false,
}: {
    code?: string;
    language?: SyntaxHighlighterLanguages;
    isCopyToClipboard?: boolean;
    isBorder?: boolean;
    isDarkTheme?: boolean;
    isLightYellowTheme?: boolean;
    isLightBlueTheme?: boolean;
    qa?: any;
    className?: string;
    withCopyText?: boolean;
    showLineNumbers?: boolean;
}) {
  const classes = useStyles();
  let style = lightTheme;
  if (isDarkTheme) {
    style = darkTheme;
  }
  if (isLightYellowTheme) {
    style = lightYellowTheme;
  }
  if (isLightBlueTheme) {
    style = lightBlueTheme;
  }
  return (
    <CopyToClipboard text={isCopyToClipboard ? code : null} isOverlay withCopyText={withCopyText} qa={qa.Copy}>
      <Box className={isBorder ? classes.bordered : null}>
        <PrismLight
          style={style}
          className={`${classes.content} ${className}`}
          language={language}
          data-qa={qa.Value}
          showLineNumbers={showLineNumbers}
          lineNumberContainerStyle={{ display: 'inline-block', margin: '-1rem 1rem 0 -1rem', padding: '10px 5px 12px 10px', verticalAlign: 'top', backgroundColor: 'rgba(131, 146, 184, .2)', fontSize: '14px', textAlign: 'right', color: '#CBD2E2' }}
        >
          {code}
        </PrismLight>
      </Box>
    </CopyToClipboard>
  );
}
