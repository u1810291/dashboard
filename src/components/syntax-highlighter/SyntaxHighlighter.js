import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Items from 'src/components/items'
import { copyToClipboard } from '../clipboard'
import style from './light'
import Icon from './copy-icon.v2.svg'
import CSS from './SyntaxHighlighter.scss'

export default function SyntaxHighlighter({
  code = '',
  copyNotification,
  ...props
}) {
  return (
    <Items flow="row" className={CSS.sections}>
      <Card padding={0} border="blue" className={CSS.codeBlock} shadow={0}>
        <PrismSyntaxHighlighter style={style} {...props}>
          {code}
        </PrismSyntaxHighlighter>
      </Card>

      <section>
        <Button
          buttonStyle="primary"
          onClick={copyToClipboard.bind(null, code)}
        >
          <Icon />
          <FormattedMessage id="copy-to-clipboard" />
        </Button>
      </section>
    </Items>
  )
}
