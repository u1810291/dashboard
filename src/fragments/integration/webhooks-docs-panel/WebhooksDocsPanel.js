import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Button from 'src/components/button'
import Sections from 'src/components/sections'
import { createOverlay } from 'src/components/overlay'
import { ReactComponent as Picture } from './picture.svg'
import { ReactComponent as InstallationVideo } from './installation-video.svg'

function showVideo() {
  createOverlay(<InstallationVideoOverlay />)
}

function InstallationVideoOverlay() {
  return (
    <div>
      <iframe
        title="Installation Video"
        width="919"
        height="517"
        src="https://www.youtube.com/embed/Gmgl_lxeFlY"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default function WebhooksDocsPanel({ message }) {
  return (
    <Panel.Body extraPadding>
      <Sections extraGap>
        <h2>
          <FormattedMessage id="fragments.integration.webhooks-docs-panel.title" />
          <p>
            <FormattedMessage id="fragments.integration.webhooks-docs-panel.subtitle" />
          </p>
        </h2>
        <Items template="1fr 1fr" extraGap>
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
      </Sections>
    </Panel.Body>
  )
}
