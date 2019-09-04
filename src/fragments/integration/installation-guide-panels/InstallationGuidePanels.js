import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CardWithStub, Items, Stub, Card, Click } from 'components';
import Text, { H2 } from 'components/text';
import openYoutubeOverlay from 'components/youtube-overlay';
import VerificationPicture from './verification.svg';
import ApplicationsPicture from './applications.svg';
import LetsStartPicture from './lets-start.svg';
import VideoPicture from './video.svg';

const PresentationFile = 'https://drive.google.com/file/d/1EQlmq5WpMCWTZQQRYhS0EUw22JrvCSv6/view?usp=sharing';

export function VerificationPanel() {
  return (
    <CardWithStub
      stub={(
        <Stub background="apricot">
          <Text color="darkapricot">1</Text>
        </Stub>
)}
      flow="column"
      align="center"
      padding={4}
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.message" />
          </Text>
        </Items>
        <Click background="active" as="a" href="/configuration">
          <FormattedMessage id="fragments.integration.installation-guide-panels.verification-panel.button" />
        </Click>
      </Items>
      <img src={VerificationPicture} alt="" className="content-cover" />
    </CardWithStub>
  );
}

export function ApplicationsPanel() {
  return (
    <CardWithStub
      stub={(
        <Stub background="apricot">
          <Text color="darkapricot">2</Text>
        </Stub>
)}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.message" />
          </Text>
        </Items>
        <Click background="active" as="a" href="/integration/applications">
          <FormattedMessage id="fragments.integration.installation-guide-panels.applications-panel.button" />
        </Click>
      </Items>
      <img src={ApplicationsPicture} alt="" className="content-cover" />
    </CardWithStub>
  );
}

export function InstallFrontendCodePanel() {
  return (
    <CardWithStub
      stub={(
        <Stub background="apricot">
          <Text color="darkapricot">3</Text>
        </Stub>
)}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.message" />
          </Text>
        </Items>
        <Click background="active" as="a" href="/integration/integration-code">
          <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.button" />
        </Click>
      </Items>
      <img
        alt=""
        className="content-cover cursor-pointer"
        onClick={openYoutubeOverlay.bind(null, { id: 'wm_nG8wfVMU' })}
        onKeyUp={() => {}}
        role="presentation"
        src={VideoPicture}
      />
    </CardWithStub>
  );
}

export function SetWebhooksPanel() {
  return (
    <CardWithStub
      stub={(
        <Stub background="apricot">
          <Text color="darkapricot">4</Text>
        </Stub>
)}
      padding={4}
      flow="column"
      align="center"
      gap={4}
      templateColumns="4fr 5fr"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.message" />
          </Text>
        </Items>
        <Click background="active" as="a" href="/integration/webhooks">
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.button" />
        </Click>
      </Items>
      <Items flow="row" extraPadding>
        <img
          alt=""
          className="content-cover cursor-pointer"
          onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
          onKeyUp={() => {}}
          role="presentation"
          src={VideoPicture}
        />

        <section>
          <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.link" />
          {': '}
          <a href="https://docs.getmati.com">docs.getmati.com</a>
        </section>
      </Items>
    </CardWithStub>
  );
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
        <H2 lineHeight={2}>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.title" />
        </H2>
        <Text lineHeight={1.3}>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.message" />
        </Text>
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
  );
}

export function LetsStartPanelIntegration() {
  return (
    <Card
      gap={2}
      padding={2}
      flow="column"
      align="center"
      templateColumns="4fr 5fr"
      background="apricot"
    >
      <Items flow="row">
        <H2 lineHeight={2}>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.title" />
        </H2>
        <Text lineHeight={1.3}>
          <FormattedMessage id="fragments.integration.installation-guide-panels.start-panel.message" />
        </Text>
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
    </Card>
  );
}

export function InstallFrontendCodePanelIntegration() {
  return (
    <Card
      padding={2}
      flow="column"
      align="center"
      gap={2}
      templateColumns="3fr 6fr"
      background="apricot"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.jssdk-panel.message" />
          </Text>
        </Items>
      </Items>
      <img
        alt=""
        className="content-cover cursor-pointer"
        onClick={openYoutubeOverlay.bind(null, { id: 'wm_nG8wfVMU' })}
        onKeyUp={() => {}}
        role="presentation"
        src={VideoPicture}
      />
    </Card>
  );
}

export function SetWebhooksPanelIntegration() {
  return (
    <Card
      padding={2}
      flow="column"
      align="center"
      gap={2}
      templateColumns="3fr 6fr"
      background="apricot"
    >
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <H2 lineHeight={2}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.title" />
          </H2>
          <Text lineHeight={1.3}>
            <FormattedMessage id="fragments.integration.installation-guide-panels.webhooks-panel.message" />
          </Text>
          <a href="https://docs.getmati.com">docs.getmati.com</a>
        </Items>
      </Items>
      <Items flow="row" extraPadding>
        <img
          alt=""
          className="content-cover cursor-pointer"
          onClick={openYoutubeOverlay.bind(null, { id: 'Gmgl_lxeFlY' })}
          onKeyUp={() => {}}
          role="presentation"
          src={VideoPicture}
        />
      </Items>
    </Card>
  );
}
