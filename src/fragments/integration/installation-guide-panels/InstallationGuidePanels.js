import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Sections from 'src/components/sections'
import Button from 'src/components/button'
import openYoutubeOverlay from 'src/components/youtube-overlay'
import CSS from './InstallationGuidePanels.module.scss'
import { ReactComponent as LetsStartPicture } from './lets-start.svg'
import { ReactComponent as VerificationPicture } from './verification.svg'
import { ReactComponent as ApplicationsPicture } from './applications.svg'
import { ReactComponent as VideoPicture } from './video.svg'

function Aside({ children }) {
  return (
    <aside className={classNames(CSS.aside, 'background-apricot')}>
      <h2 className="text-darkapricot">{children}</h2>
    </aside>
  )
}

export function VerificationPanel() {
  const aside = <Aside>1</Aside>
  return (
    <Panel.Body aside={aside} extraPadding>
      <Items align="center" extraGap template="4fr 5fr">
        <Sections extraGap>
          <Sections smallGap>
            <h2>
              <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.title" />
            </h2>
            <p>
              <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.message" />
            </p>
          </Sections>
          <Button buttonStyle="primary" href="/">
            <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.button" />
          </Button>
        </Sections>
        <VerificationPicture />
      </Items>
    </Panel.Body>
  )
}

export function ApplicationsPanel() {
  const aside = <Aside>2</Aside>
  return (
    <Panel.Body aside={aside} extraPadding>
      <Items align="center" extraGap template="4fr 5fr">
        <Sections extraGap>
          <Sections smallGap>
            <h2>
              <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.title" />
            </h2>
            <p>
              <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.message" />
            </p>
          </Sections>
          <Button buttonStyle="primary" href="/integration/applications">
            <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.button" />
          </Button>
        </Sections>
        <ApplicationsPicture />
      </Items>
    </Panel.Body>
  )
}

export function InstallFrontendCodePanel() {
  const aside = <Aside>3</Aside>
  return (
    <Panel.Body aside={aside} extraPadding>
      <Items align="center" extraGap template="4fr 5fr">
        <Sections extraGap>
          <Sections smallGap>
            <h2>
              <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.title" />
            </h2>
            <p>
              <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.message" />
            </p>
          </Sections>
          <Button buttonStyle="primary" href="/integration/integration-code">
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.button" />
          </Button>
        </Sections>
        <VideoPicture
          className="cursor-pointer"
          onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
        />
      </Items>
    </Panel.Body>
  )
}

export function SetWebhooksPanel() {
  const aside = <Aside>4</Aside>
  return (
    <Panel.Body aside={aside} extraPadding>
      <Items align="center" extraGap template="4fr 5fr">
        <Sections extraGap>
          <Sections smallGap>
            <h2>
              <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.title" />
            </h2>
            <p>
              <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.message" />
            </p>
          </Sections>
          <Button buttonStyle="primary" href="/integration/webhooks">
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.button" />
          </Button>
        </Sections>
        <Sections extraPadding>
          <VideoPicture
            className="cursor-pointer"
            onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
          />
          <section>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.link" />
            {': '}
            <a href="https://docs.getmati.com">docs.getmati.com</a>
          </section>
        </Sections>
      </Items>
    </Panel.Body>
  )
}

export function LetsStartPanel() {
  const aside = <Aside />
  return (
    <Panel.Body aside={aside} className="background-apricot" extraPadding>
      <Items align="center" extraGap template="4fr 5fr">
        <section>
          <h2>
            <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.title" />
          </h2>
          <p>
            <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.message" />
          </p>
        </section>
        <LetsStartPicture />
      </Items>
    </Panel.Body>
  )
}
