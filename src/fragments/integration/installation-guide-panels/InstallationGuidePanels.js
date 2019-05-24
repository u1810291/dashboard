import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CardWithStub, Items, Stub, Text, Click } from 'components'
import openYoutubeOverlay from 'components/youtube-overlay'
import VerificationPicture from './verification.svg'
import ApplicationsPicture from './applications.svg'
import LetsStartPicture from './lets-start.svg'
import VideoPicture from './video.svg'

const PresentationFile =
  'https://drive.google.com/file/d/1EQlmq5WpMCWTZQQRYhS0EUw22JrvCSv6/view?usp=sharing'

export function VerificationPanel() {
  return (
    <CardWithStub
      stub={
        <Stub background="apricot">
          <Text color="darkapricot">1</Text>
        </Stub>
      }
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
        <Click background="active" as="a" href="/configuration">
          <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.button" />
        </Click>
      </Items>
      <img src={VerificationPicture} alt="" className="content-cover" />
    </CardWithStub>
  )
}

export function ApplicationsPanel() {
  return (
    <CardWithStub
      stub={
        <Stub background="apricot">
          <Text color="darkapricot">2</Text>
        </Stub>
      }
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
        <Click background="active" as="a" href="/integration/applications">
          <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.button" />
        </Click>
      </Items>
      <img src={ApplicationsPicture} alt="" className="content-cover" />
    </CardWithStub>
  )
}

export function InstallFrontendCodePanel() {
  return (
    <CardWithStub
      stub={
        <Stub background="apricot">
          <Text color="darkapricot">3</Text>
        </Stub>
      }
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
        <Click background="active" as="a" href="/integration/integration-code">
          <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.button" />
        </Click>
      </Items>
      <img
        src={VideoPicture}
        alt=""
        className="content-cover cursor-pointer"
        onClick={openYoutubeOverlay.bind(null, { id: 'wm_nG8wfVMU' })}
      />
    </CardWithStub>
  )
}

export function SetWebhooksPanel() {
  return (
    <CardWithStub
      stub={
        <Stub background="apricot">
          <Text color="darkapricot">3</Text>
        </Stub>
      }
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
        <Click background="active" as="a" href="/integration/webhooks">
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.button" />
        </Click>
      </Items>
      <Items flow="row" extraPadding>
        <img
          src={VideoPicture}
          alt=""
          className="content-cover cursor-pointer"
          onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
        />

        <section>
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.link" />
          {': '}
          <a href="https://docs.getmati.com">docs.getmati.com</a>
        </section>
      </Items>
    </CardWithStub>
  )
}

export function LetsStartPanel() {
  return (
    <CardWithStub
      stub={<Stub background="apricot" />}
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
        <section>
          <Click
            background="active"
            href={PresentationFile}
            as="a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="LetsStartPanel.cta" />
          </Click>
        </section>
      </Items>

      <img src={LetsStartPicture} alt="" className="content-cover" />
    </CardWithStub>
  )
}
