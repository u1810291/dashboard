import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'components/card'
import SyntaxHighlighter from 'components/syntax-highlighter'
import stringify from 'lib/stringify'

export default function VerificationMetadata({ metadata = {} }) {
  return (
    <Card>
      <h2>
        <FormattedMessage id="VerificationMetadata.title" />
      </h2>
      <SyntaxHighlighter
        code={stringify(metadata)}
        language="javascript"
        padding={0}
        border="transparent"
        showCopyToClipboard={false}
      />
    </Card>
  )
}
