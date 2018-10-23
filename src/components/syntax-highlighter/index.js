import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { default as lightStyle } from './light'
import { default as darkStyle } from './dark'

export const SyntaxHighlighter = ({
  dark = false,
  ...props
}) => {
  const style = dark ? darkStyle : lightStyle
  return <PrismSyntaxHighlighter
    style={style}
    showLineNumbers={true}
    lineNumberContainerStyle={style.lineNumbers}
    {...props}
  />
}
