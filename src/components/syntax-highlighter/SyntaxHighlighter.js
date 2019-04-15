import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Items from 'src/components/items'
import { copyToClipboard } from '../clipboard'
import style from './light'
import { ReactComponent as Icon } from './copy-icon.v2.svg'
import CSS from './SyntaxHighlighter.scss'

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
        <PrismSyntaxHighlighter style={style} language={language}>
          {code}
        </PrismSyntaxHighlighter>
      </Card>

      {showCopyToClipboard && (
        <section>
          <Button
            buttonStyle="primary"
            onClick={copyToClipboard.bind(null, code)}
          >
            <Icon />
            <FormattedMessage id="copy-to-clipboard" />
          </Button>
        </section>
      )}
    </Items>
  )
}
