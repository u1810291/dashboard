import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'
import Click from 'src/components/click'
import { ReactComponent as Picture } from './picture.svg'

export default function FeaturesPoster() {
  return (
    <Card background="apricot" padding={4}>
      <p>
        <FormattedMessage id="fragments.info.features-poster.label" />
      </p>
      <Items flow="column" gap={4} templateColumns="3fr 2fr" align="center">
        <h1>
          <FormattedMessage id="fragments.info.features-poster.title" />
          <p>
            <FormattedMessage id="fragments.info.features-poster.description" />
          </p>
        </h1>
        <Picture />
      </Items>
      <section>
        <Click as="a" href="/integration" background="active">
          <FormattedMessage id="fragments.info.features-poster.cta" />
        </Click>
      </section>
    </Card>
  )
}
