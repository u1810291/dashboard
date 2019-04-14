import React from 'react'
import { FormattedMessage } from 'react-intl'
import Items from 'src/components/items'
import Click from 'src/components/click'
import images from './images'

export const FEATURES = [
  'liveness',
  'template-matching',
  'watchlist',
  'facematch',
  'document-reading',
  'curp-validation',
  'alteration-detection'
]

export default function Features() {
  return (
    <Items flow="row">
      <h2>Security Features</h2>
      <Items
        flow="row"
        gap={1}
        templateColumns="repeat(3, 1fr)"
        align="stretch"
      >
        {FEATURES.map(name => (
          <Click
            shadow={1}
            padding={2}
            inline={false}
            align="end"
            flow="row"
            alignContent="end"
            onClick={() => alert('abc')}
            key={name}
          >
            <img src={images[name]} alt={name} />
            <h2 className="text-light">
              <FormattedMessage id={`fragments.info.features.${name}.title`} />
            </h2>
          </Click>
        ))}
      </Items>
    </Items>
  )
}
