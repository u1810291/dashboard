import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createOverlay } from 'src/components/overlay'
import Panel from 'src/components/panel'
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
        <div className="mgi-items mgi-items--centered">
          <section className="mgi-items--col-5">
            <h2>
              <FormattedMessage id="settings.installationGuide.video.title" />
              <p>
                <FormattedMessage id="settings.installationGuide.video.description" />
              </p>
            </h2>
          </section>
          <section className="mgi-items--col-7">
            <InstallationVideoImage onClick={showVideo} className={CSS.installationVideoImage} />
          </section>
        </div>
      </Panel.Body>
    </Panel>
  )
}
