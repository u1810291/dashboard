import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'
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

function CardWithAside({ aside, children, shadow, ...cardProps }) {
  return (
    <Card padding={0} gap={0} shadow={shadow} flow="column" align="stretch">
      {aside}
      <Card shadow={0} {...cardProps}>
        {children}
      </Card>
    </Card>
  )
}

export function VerificationPanel() {
  return (
    <CardWithAside
      aside={<Aside>1</Aside>}
      flow="column"
      align="center"
      padding={4}
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <h2>
            <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.title" />
          </h2>
          <p>
            <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.message" />
          </p>
        </Items>
        <Button buttonStyle="primary" href="/">
          <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.button" />
        </Button>
      </Items>
      <VerificationPicture />
    </CardWithAside>
  )
}

export function ApplicationsPanel() {
  return (
    <CardWithAside
      aside={<Aside>2</Aside>}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <h2>
            <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.title" />
          </h2>
          <p>
            <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.message" />
          </p>
        </Items>
        <Button buttonStyle="primary" href="/integration/applications">
          <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.button" />
        </Button>
      </Items>
      <ApplicationsPicture />
    </CardWithAside>
  )
}

export function InstallFrontendCodePanel() {
  return (
    <CardWithAside
      aside={<Aside>3</Aside>}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <h2>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.title" />
          </h2>
          <p>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.message" />
          </p>
        </Items>
        <Button buttonStyle="primary" href="/integration/integration-code">
          <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.button" />
        </Button>
      </Items>
      <VideoPicture
        className="cursor-pointer"
        onClick={openYoutubeOverlay.bind(null, { id: 'wm_nG8wfVMU' })}
      />
    </CardWithAside>
  )
}

export function SetWebhooksPanel() {
  return (
    <CardWithAside
      aside={<Aside>4</Aside>}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <h2>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.title" />
          </h2>
          <p>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.message" />
          </p>
        </Items>
        <Button buttonStyle="primary" href="/integration/webhooks">
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.button" />
        </Button>
      </Items>
      <Items flow="row" extraPadding>
        <VideoPicture
          className="cursor-pointer"
          onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
        />
        <section>
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.link" />
          {': '}
          <a href="https://docs.getmati.com">docs.getmati.com</a>
        </section>
      </Items>
    </CardWithAside>
  )
}

export function LetsStartPanel() {
  return (
    <CardWithAside
      aside={<Aside />}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
      background="apricot"
    >
      <Items flow="row">
        <h2>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.title" />
        </h2>
        <p>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.message" />
        </p>
      </Items>
      <LetsStartPicture />
    </CardWithAside>
  )
}