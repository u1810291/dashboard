import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'
import Click from 'src/components/click'
import openYoutubeOverlay from 'src/components/youtube-overlay'
import Picture from './picture.svg'
import InstallationVideo from './installation-video.svg'

function showVideo() {
  openYoutubeOverlay({ id: 'Gmgl_lxeFlY' })
}

export default function WebhooksDocsPanel({ message }) {
  return (
    <Card padding={4}>
      <Items flow="row" gap={4}>
        <h2>
          <FormattedMessage id="fragments.integration.webhooks-docs-panel.title" />
          <p>
            <FormattedMessage id="fragments.integration.webhooks-docs-panel.subtitle" />
          </p>
        </h2>
        <Items templateColumns="1fr 1fr" gap={4}>
          <img src={Picture} className="content-cover" alt="" />
          <img
            src={InstallationVideo}
            className="content-cover cursor-pointer"
            alt=""
            onClick={showVideo}
          />
        </Items>
        <section>
          <Click
            as="a"
            href="https://docs.getmati.com"
            target="_blank"
            rel="noopener noreferrer"
            background="active"
          >
            <FormattedMessage id="fragments.integration.webhooks-docs-panel.button" />
          </Click>
        </section>
      </Items>
    </Card>
  )
}
