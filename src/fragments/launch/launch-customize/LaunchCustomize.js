import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CardWithStub, Stub, Items, Text, H2, Click } from 'components'
import ImageURL from './Image.svg'

export default function LaunchCustomize() {
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
            <FormattedMessage id="LaunchCustomize.title" />
          </H2>
          <Text color="secondary">
            <FormattedMessage id="LaunchCustomize.description" />
          </Text>
        </Items>
        <Click href="/configuration" as="a" background="active">
          <FormattedMessage id="LaunchCustomize.cta" />
        </Click>
      </Items>
      <img src={ImageURL} alt="" className="content-cover" />
    </CardWithStub>
  )
}
