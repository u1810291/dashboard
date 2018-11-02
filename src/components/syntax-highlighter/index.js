import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { FormattedMessage } from 'react-intl'
import clipboard from 'clipboard-polyfill'
import Button from 'src/components/button'
import { sendNotification } from 'src/components/notification'
import { default as lightStyle } from './light'
import { default as darkStyle } from './dark'
import CSS from './SyntaxHighlighter.css'
import icon from './copy-icon.svg'

function handleCopyToClipboard(text, notification) {
  clipboard.writeText(text)
  sendNotification(notification)
}

export const SyntaxHighlighter = ({
  dark = true,
  children,
  copyToClipboard = false,
  copyNotification,
  lineNumbers = true,
  ...props
}) => {
  const style = dark ? darkStyle : lightStyle
  return <div className={CSS.container}>
    <PrismSyntaxHighlighter
      style={style}
      showLineNumbers={lineNumbers}
      lineNumberContainerStyle={style.lineNumbers}
      {...props}
    >
      {children}
    </PrismSyntaxHighlighter>
    {copyToClipboard && (
      <div className={CSS.copyToClipboard}>
        <Button
          buttonStyle="no-borders default text-secondary"
          onClick={() => handleCopyToClipboard(children, copyNotification)}
        >
          <img src={icon} alt="" />
          <span className="text-caption text-info">
            <FormattedMessage id="copy-to-clipboard"/>
          </span>
        </Button>
      </div>
    )}
  </div>
}
