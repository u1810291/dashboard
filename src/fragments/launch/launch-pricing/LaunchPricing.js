import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CardWithStub, Stub, Items, Text, H2, Click } from 'components'
import ImageURL from './Image.svg'

export default function LaunchPricing() {
  return (
    <CardWithStub
      stub={
        <Stub background="apricot">
          <Text color="darkapricot">2</Text>
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
            <FormattedMessage id="LaunchPricing.title" />
          </H2>
          <Text color="secondary">
            <FormattedMessage id="LaunchPricing.description" />
          </Text>
        </Items>
        <Click href="/settings/pricing" as="a" background="active">
          <FormattedMessage id="LaunchPricing.cta" />
        </Click>
      </Items>
      <img src={ImageURL} alt="" className="content-cover" />
    </CardWithStub>
  )
}
