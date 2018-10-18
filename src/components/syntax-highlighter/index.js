import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { default as lightStyle } from './light'
import { default as darkStyle } from './dark'

export const SyntaxHighlighter = ({
  dark = false,
  ...props
}) => (
  <PrismSyntaxHighlighter
    style={dark ? darkStyle : lightStyle}
    showLineNumbers={true}
    {...props}
  />
)
