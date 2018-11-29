import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Panel from 'src/components/panel'
import CSS from './UpgradePlan.css'

const details = ['safety-pro', 'liveness', 'new-features']
const detailsIcons = {
  'safety-pro': require('./safety-pro-icon.svg'),
  liveness: require('./liveness-icon.svg'),
  'new-features': require('./new-features-icon.svg')
}

@injectIntl
class DetailCard extends React.Component {
  render() {
    const { type } = this.props
    return (
      <div className={CSS.detailsCard}>
        <p>
          <img src={detailsIcons[type]} alt="" />
        </p>
        <h3>
          <FormattedMessage id={`plan.details.${type}.title`} />
        </h3>
        <p className="text-secondary">
          <FormattedMessage id={`plan.details.${type}.description`} />
        </p>
        {this.props.intl.messages[`plan.details.${type}.extra.title`] && (
          <React.Fragment>
            <p className="text-caption text-info">
              <FormattedMessage id={`plan.details.${type}.extra.title`} />
            </p>
            <ul className={CSS.detailsExtra}>
              {this.props.intl
                .formatMessage({ id: `plan.details.${type}.extra.items` })
                .map((item, index) => (
                  <li key={index}>
                    <small>{item}</small>
                  </li>
                ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default class UpgradePlan extends React.Component {
  render() {
    return (
      <Panel caption={<FormattedMessage id="plan.safety-pro-title" />}>
        <Panel.Body>
          <div className={CSS.detailsContainer}>
            {details.map(type => (
              <DetailCard type={type} key={type} />
            ))}
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}
