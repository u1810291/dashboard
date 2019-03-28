import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createOverlay } from 'src/components/overlay'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import InstallationVideoImage from './installation-video.svg'

export function showVideo() {
  createOverlay(<InstallationVideoOverlay />)
}

export function InstallationVideoOverlay() {
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

export default function InstallationVideo() {
  return (
    <Panel>
      <Panel.Body>
        <Items align="center" template="5fr 7fr">
          <section>
            <h2>
              <FormattedMessage id="settings.installationGuide.video.title" />
              <p>
                <FormattedMessage id="settings.installationGuide.video.description" />
              </p>
            </h2>
          </section>
          <InstallationVideoImage onClick={showVideo} className={CSS.installationVideoImage} />
        </Items>
      </Panel.Body>
    </Panel>
  )
}
