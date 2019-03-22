import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import CSS from './feature.scss'
import Panel from 'src/components/panel'

export default
@injectIntl
class Feature extends React.Component {

  render() {
    const { formatMessage } = this.props.intl

    return (
      <div className={CSS.content}>
        <div className="mgi-items">
          <div className="mgi-items--col-6 legal">
            <Panel className="panel">
              <Panel.Body className="panel-body">
                <h3>
                  <FormattedMessage id="features.compliance.title" />
                </h3>
                <div className="content">
                  <ul>
                    <li><FormattedMessage id="features.compliance.description.item.automate" /></li>
                    <li><FormattedMessage id="features.compliance.description.item.compliance" /></li>
                  </ul>
                </div>
                <div className="link">
                  <a target="_blank" rel="noopener noreferrer" href={`${formatMessage({id: 'features.compliance.button.url'})}`}><FormattedMessage id="features.compliance.button.title" /></a>
                </div>
              </Panel.Body>
            </Panel>
          </div>
          <div className="mgi-items--col-6 feature">
            <Panel className="panel">
              <Panel.Body className="panel-body">
                <h3>
                  <FormattedMessage id="features.feature.title" />
                </h3>
                <div className="content">
                  <ul>
                    <li><FormattedMessage id="features.feature.description.item.liveness" /></li>
                    <li><FormattedMessage id="features.feature.description.item.faceMatch" /></li>
                    <li><FormattedMessage id="features.feature.description.item.watchlist" /></li>
                    <li><FormattedMessage id="features.feature.description.item.templateMatching" /></li>
                    <li><FormattedMessage id="features.feature.description.item.documentReading" /></li>
                    <li><FormattedMessage id="features.feature.description.item.alterationDetection" /></li>
                  </ul>
                </div>
                <div className="link">
                  <a target="_blank" rel="noopener noreferrer" href={`${formatMessage({id: 'features.feature.button.url'})}`}><FormattedMessage id="features.feature.button.title" /></a>
                </div>
              </Panel.Body>
            </Panel>

          </div>
        </div>
      </div>
    )
  }
}