import React from 'react'
import { FormattedMessage } from 'react-intl'
import Items from 'src/components/items'
import Click from 'src/components/click'
import PopupWindow from 'src/components/popup-window'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import images from './images'
import gifs from './popup-images'

export const FEATURES = [
  'liveness',
  'template-matching',
  'watchlist',
  'facematch',
  'document-reading',
  'curp-validation',
  'alteration-detection'
]

function showOverlay(feature) {
  createOverlay(<FeatureModal feature={feature} />)
}

function FeatureModal({ feature }) {
  return (
    <PopupWindow flow="column" templateColumns="5fr 4fr" align="center" gap={4}>
      <img src={gifs[feature]} alt={feature} />
      <Items flow="row" gap={4}>
        <Items flow="row" gap={1}>
          <h2>
            <FormattedMessage id={`fragments.info.features.${feature}.title`} />
            <p>
              <FormattedMessage
                id={`fragments.info.features.${feature}.description`}
              />
            </p>
          </h2>
        </Items>
        <Click background="active" onClick={closeOverlay}>
          <FormattedMessage id="close" />
        </Click>
      </Items>
    </PopupWindow>
  )
}

export default function Features() {
  return (
    <Items flow="row">
      <h1>
        <FormattedMessage id="fragments.info.features.title" />
      </h1>
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
            onClick={showOverlay.bind(null, name)}
            key={name}
          >
            <img src={images[name]} alt={name} />
            <h2 className="text-light text-nowrap">
              <FormattedMessage id={`fragments.info.features.${name}.title`} />
            </h2>
          </Click>
        ))}
      </Items>
    </Items>
  )
}
