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
      <Card
        padding={padding}
        border={border}
        className={CSS.codeBlock}
        shadow={shadow}
        {...cardProps}
      >
        {showCopyToClipboard && (
          <Button
            className={CSS.copy}
            onClick={copyToClipboard.bind(null, code)}
          >
            <Icon />
          </Button>
        )}
        <PrismSyntaxHighlighter style={style} language={language}>
          {code}
        </PrismSyntaxHighlighter>
      </Card>
    </Items>
  )
}
