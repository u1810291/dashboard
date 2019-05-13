import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CardWithStub, Stub, Items, Text, H2, Click } from 'components'
import openYoutubeOverlay from 'components/youtube-overlay'
import VideoURL from './Video.svg'

export default function LaunchComplianceStarter() {
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
      <Items flow="row" gap={4} justifyItems="start">
        <Items flow="row" gap={1}>
          <H2>
            <FormattedMessage id="LaunchComplianceStarter.title" />
          </H2>
          <Text color="secondary">
            <FormattedMessage id="LaunchComplianceStarter.description" />
          </Text>
        </Items>
        <Click href="/info" as="a" background="active">
          <FormattedMessage id="LaunchComplianceStarter.cta" />
        </Click>
      </Items>
      <img
        src={VideoURL}
        alt=""
        className="content-cover cursor-pointer"
        onClick={openYoutubeOverlay.bind(null, { id: 'NWRc84vkB5I' })}
      />
    </CardWithStub>
  )
}
