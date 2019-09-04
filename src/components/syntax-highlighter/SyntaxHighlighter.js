import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import Button from 'components/button'
import Card from 'components/card'
import Items from 'components/items'
import { copyToClipboard } from '../clipboard'
import style from './light'
import { ReactComponent as Icon } from 'assets/copy-icon.v1.svg'
import CSS from './SyntaxHighlighter.module.scss'

export default function SyntaxHighlighter({
  code = '',
  border = 'blue',
  shadow = 0,
  padding = 2,
  language,
  showCopyToClipboard = true,
  ...cardProps
}) {
  return (
    <Items flow="row" className={CSS.sections}>
      {showCopyToClipboard && (
        <Button
          className={CSS.copy}
          onClick={() => {copyToClipboard(code)}}
        >
          <Icon />
        </Button>
        )}
      <Card
        padding={'0px 0px 0px 20px'}
        border={border}
        className={CSS.codeBlock}
        shadow={shadow}
        {...cardProps}
      >
        <PrismSyntaxHighlighter style={style} className={CSS.content} language={language}>
          {code}
        </PrismSyntaxHighlighter>
      </Card>
    </Items>
  )
}
