import React from 'react'
import { FormattedMessage } from 'react-intl'
import clipboard from 'clipboard-polyfill'
import Panel from 'src/components/panel'
import Button from 'src/components/button'
import TextField from 'src/components/text-field'
import { notification } from 'src/components/notification'

function copyToClipboard(text) {
  clipboard.writeText(text)
  notification.info(<FormattedMessage id="copied" />)
}

export default function Permalink({ urlBase, clientId }) {
  const url = `${urlBase}?merchantToken=${clientId}&metadata={}`

  return (
    <Panel>
      <Panel.Body>
        <section className="mgi-section">
          <h3>
            <FormattedMessage id="developers.permalink.caption" />
            <p>
              <FormattedMessage id="developers.permalink.description" />
            </p>
            <p />
          </h3>
        </section>
        <section className="mgi-section mgi-section__no-border">
          <TextField value={url || ''} readOnly />
        </section>
        <p className="text-secondary" />
        <Button buttonStyle="primary" onClick={copyToClipboard.bind(null, url)}>
          <FormattedMessage id="copy-to-clipboard" />
        </Button>
      </Panel.Body>
    </Panel>
  )
}
