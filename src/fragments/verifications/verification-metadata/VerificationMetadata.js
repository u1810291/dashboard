import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import SyntaxHighlighter from 'src/components/syntax-highlighter'
import stringify from 'src/lib/stringify'

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
