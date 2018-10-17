import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import light from './light'
import dark from './dark'

export const SyntaxHighlighter = props => (
  <PrismSyntaxHighlighter style={props.dark ? dark : light} showLineNumbers={true} {...props}/>
)
