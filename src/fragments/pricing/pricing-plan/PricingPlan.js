import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import CSS from './pricing-plan.scss'
import Panel from 'src/components/panel'
import PricingTrialLogo from 'src/assets/icon-logo-pricing-trial.svg'

export default
@injectIntl
class PricingPlan extends React.Component {

  render() {
    const { formatMessage } = this.props.intl

    return (
      <div className={CSS.content}>
        <div className="pricing-plan__trial">
          <Panel className="panel">
            <Panel.Body className="panel-body">
              <div className="mgi-items">
                <div className="mgi-items--col-6 trial-content">
                  <div className="sub-title">
                    <FormattedMessage id="pricing.trial.subTitle" />
                  </div>
                  <h3 className="title">
                    <FormattedMessage id="pricing.trial.title" />
                  </h3>
                  <div className="content">
                    <ul>
                      <li><FormattedMessage id="pricing.trial.description.item.days" /></li>
                      <li><FormattedMessage id="pricing.trial.description.item.verifications" /></li>
                      <li><FormattedMessage id="pricing.trial.description.item.card" /></li>
                    </ul>
                  </div>
                </div>
                <div className="mgi-items--col-6 trial-image text-center">
                  <PricingTrialLogo />
                </div>
              </div>
            </Panel.Body>
          </Panel>
        </div>

        <h2 className="text-center">
          <FormattedMessage id="pricing.afterTrial.title" />
        </h2>

        <div className="pricing-plan__after-trial">
          <div className="mgi-items">
            <div className="mgi-items--col-6 professional">
              <Panel className="panel">
                <Panel.Body className="panel-body">
                  <div className="sub-title">
                    <FormattedMessage id="pricing.professional.subTitle" />
                  </div>
                  <h3>
                    <FormattedMessage id="pricing.professional.price" /> <span> / <FormattedMessage id="pricing.professional.price.item" /></span>
                  </h3>
                  <div className="content">
                    <ul>
                      <li><FormattedMessage id="pricing.professional.description.item.automate" /></li>
                      <li><FormattedMessage id="pricing.professional.description.item.access" /></li>
                      <li><FormattedMessage id="pricing.professional.description.item.sdk" /></li>
                      <li><FormattedMessage id="pricing.professional.description.item.identity" /></li>
                      <li><FormattedMessage id="pricing.professional.description.item.volumes" /></li>
                      <li><FormattedMessage id="pricing.professional.description.item.dashboard" /></li>
                    </ul>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
            <div className="mgi-items--col-6 company">
              <Panel className="panel">
                <Panel.Body className="panel-body">
                  <div className="sub-title">
                    <FormattedMessage id="pricing.company.subTitle" />
                  </div>
                  <h3>
                    <FormattedMessage id="pricing.company.title" />
                  </h3>
                  <div className="content">
                    <ul>
                      <li><FormattedMessage id="pricing.company.description.item.customisation" /></li>
                      <li><FormattedMessage id="pricing.company.description.item.support" /></li>
                      <li><FormattedMessage id="pricing.company.description.item.integration" /></li>
                    </ul>
                  </div>
                  <div className="link">
                    <a target="_blank" rel="noopener noreferrer" className="mgi-btn-link primary" href={`${formatMessage({id: 'pricing.company.button.url'})}`}><FormattedMessage id="pricing.company.button.title" /></a>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}