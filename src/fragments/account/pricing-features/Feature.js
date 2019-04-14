import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Items from 'src/components/items'

export default class Feature extends React.Component {
  render() {
    return (
      <Items flow="row">
        <h1 className="text-center">
          <FormattedMessage id="pricing.complianceFeature.title" />
        </h1>
        <Items align="stretch" templateColumns="1fr 1fr">
          <Card padding={4}>
            <Items flow="row">
              <h2>
                <FormattedMessage id="features.compliance.title" />
              </h2>
              <ul className="mgi-list mgi-list--check">
                {['automate', 'compliance'].map(key => (
                  <li>
                    <FormattedMessage
                      id={`features.compliance.description.item.${key}`}
                      key={key}
                    />
                  </li>
                ))}
              </ul>
            </Items>
          </Card>

          <Card padding={4}>
            <Items flow="row">
              <h2>
                <FormattedMessage id="features.feature.title" />
              </h2>
              <ul className="mgi-list mgi-list--check">
                {[
                  'liveness',
                  'faceMatch',
                  'watchlist',
                  'templateMatching',
                  'documentReading',
                  'alterationDetection'
                ].map(key => (
                  <li>
                    <FormattedMessage
                      id={`features.feature.description.item.${key}`}
                      key={key}
                    />
                  </li>
                ))}
              </ul>
              <section>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://getmati.com/features"
                >
                  <FormattedMessage id="features.feature.button.title" />
                </a>
              </section>
            </Items>
          </Card>
        </Items>
      </Items>
    )
  }
}
