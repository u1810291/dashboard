import React from 'react'
import { default as PrismSyntaxHighlighter } from 'react-syntax-highlighter/prism'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import clipboard from 'clipboard-polyfill'
import Button from 'src/components/button'
import { notification } from 'src/components/notification'
import { default as lightStyle } from './light'
import { default as darkStyle } from './dark'
import CSS from './SyntaxHighlighter.css'
import Icon from './copy-icon.svg'

function handleCopyToClipboard(text, notificationMessage) {
  clipboard.writeText(text)
  if (notificationMessage) {
    notification.info(notificationMessage)
  }
}

export const SyntaxHighlighter = ({
  dark = true,
  code='',
  copyToClipboard = false,
  onCopy = () => {},
  lineNumbers = true,
  wrapperClassName = undefined,
  wrapperStyle = {},
  ...props
}) => {
  const style = dark ? darkStyle : lightStyle
  return <div className={CSS.container}>
    <div className={classNames(CSS.wrapper, wrapperClassName)} style={wrapperStyle}>
      <PrismSyntaxHighlighter
        style={style}
        showLineNumbers={lineNumbers}
        lineNumberContainerStyle={style.lineNumbers}
        {...props}
      >
        {code}
      </PrismSyntaxHighlighter>
    </div>
    {copyToClipboard && (
      <div className={CSS.copyToClipboard}>
        <Button
          buttonStyle="no-borders default text-secondary"
          onClick={() => handleCopyToClipboard(code, onCopy)}
        >
          <Icon />
          <span className="text-caption text-info">
            <FormattedMessage id="copy-to-clipboard"/>
          </span>
        </Button>
      </div>
    )}
  </div>
}
