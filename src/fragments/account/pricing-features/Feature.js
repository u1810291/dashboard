import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import CSS from './feature.scss'

export default class Feature extends React.Component {
  render() {
    return (
      <section className="mgi-section mgi-section__huge">
        <h1 className="text-center">
          <FormattedMessage id="pricing.complianceFeature.title" />
        </h1>
        <div className={CSS.panels}>
          <Panel.Body>
            <section className="mgi-section mgi-section__no-border">
              <h2>
                <FormattedMessage id="features.compliance.title" />
              </h2>
            </section>

            <section className="mgi-section mgi-section__no-border">
              <ul className="mgi-list mgi-list--check">
                <li>
                  <FormattedMessage id="features.compliance.description.item.automate" />
                </li>
                <li>
                  <FormattedMessage id="features.compliance.description.item.compliance" />
                </li>
              </ul>
            </section>
          </Panel.Body>

          <Panel.Body>
            <section className="mgi-section mgi-section__no-border">
              <h2>
                <FormattedMessage id="features.feature.title" />
              </h2>
            </section>
            <section className="mgi-section mgi-section__no-border">
              <ul className="mgi-list mgi-list--check">
                <li>
                  <FormattedMessage id="features.feature.description.item.liveness" />
                </li>
                <li>
                  <FormattedMessage id="features.feature.description.item.faceMatch" />
                </li>
                <li>
                  <FormattedMessage id="features.feature.description.item.watchlist" />
                </li>
                <li>
                  <FormattedMessage id="features.feature.description.item.templateMatching" />
                </li>
                <li>
                  <FormattedMessage id="features.feature.description.item.documentReading" />
                </li>
                <li>
                  <FormattedMessage id="features.feature.description.item.alterationDetection" />
                </li>
              </ul>
            </section>
            <section className="mgi-section mgi-section__no-border">
              <a target="_blank" rel="noopener noreferrer" href="https://getmati.com/features">
                <FormattedMessage id="features.feature.button.title" />
              </a>
            </section>
          </Panel.Body>
        </div>
      </section>
    )
  }
}
