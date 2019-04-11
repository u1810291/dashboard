import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Button from 'src/components/button'
import openYoutubeOverlay from 'src/components/youtube-overlay'
import { ReactComponent as Picture } from './picture.svg'
import { ReactComponent as InstallationVideo } from './installation-video.svg'

function showVideo() {
  openYoutubeOverlay({ id: 'Gmgl_lxeFlY' })
}

export default function WebhooksDocsPanel({ message }) {
  return (
    <Panel.Body extraPadding>
      <Items flow="row" gap={4}>
        <h2>
          <FormattedMessage id="fragments.integration.webhooks-docs-panel.title" />
          <p>
            <FormattedMessage id="fragments.integration.webhooks-docs-panel.subtitle" />
          </p>
        </h2>
        <Items templateColumns="1fr 1fr" gap={4}>
          <Picture />
          <InstallationVideo onClick={showVideo} className="cursor-pointer" />
        </Items>
        <section>
          <Button
            href="https://docs.getmati.com"
            external
            buttonStyle="primary"
          >
            <FormattedMessage id="fragments.integration.webhooks-docs-panel.button" />
          </Button>
        </section>
      </Items>
    </Panel.Body>
  )
}
