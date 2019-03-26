import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './pricing-plan.scss'
import Panel from 'src/components/panel'
import PricingTrialLogo from './icon-logo-pricing-trial.svg'

function TrialPlanPanel() {
  return (
    <Panel>
      <Panel.Body>
        <div className={classNames('mgi-items', CSS.trialPlanPanel)}>
          <div className="mgi-items--col-6">
            <p>
              <FormattedMessage id="pricing.trial.subTitle" />
            </p>
            <h1>
              <FormattedMessage id="pricing.trial.title" />
            </h1>

            <ul className="mgi-list mgi-list--check">
              <li>
                <FormattedMessage id="pricing.trial.description.item.days" />
              </li>
              <li>
                <FormattedMessage id="pricing.trial.description.item.verifications" />
              </li>
              <li>
                <FormattedMessage id="pricing.trial.description.item.card" />
              </li>
            </ul>
          </div>
          <div className={classNames('mgi-items--col-6', CSS.trialPlanPanelImage)}>
            <PricingTrialLogo />
          </div>
        </div>
      </Panel.Body>
    </Panel>
  )
}

function ProfessionalPlanPanel() {
  return (
    <Panel.Body className="background-active">
      <p>
        <FormattedMessage id="pricing.professional.subTitle" />
      </p>
      <h1 className={CSS.pricingHeader}>
        <FormattedMessage id="pricing.professional.price" />{' '}
        <small>
          / <FormattedMessage id="pricing.professional.price.item" />
        </small>
      </h1>
      <ul className="mgi-list mgi-list--check-inverted">
        <li>
          <FormattedMessage id="pricing.professional.description.item.automate" />
        </li>
        <li>
          <FormattedMessage id="pricing.professional.description.item.access" />
        </li>
        <li>
          <FormattedMessage id="pricing.professional.description.item.sdk" />
        </li>
        <li>
          <FormattedMessage id="pricing.professional.description.item.identity" />
        </li>
        <li>
          <FormattedMessage id="pricing.professional.description.item.volumes" />
        </li>
        <li>
          <FormattedMessage id="pricing.professional.description.item.dashboard" />
        </li>
      </ul>
    </Panel.Body>
  )
}

function CompanyPlanPanel() {
  return (
    <Panel.Body className={CSS.companyPlan}>
      <p>
        <FormattedMessage id="pricing.company.subTitle" />
      </p>
      <h1>
        <FormattedMessage id="pricing.company.title" />
      </h1>

      <ul className="mgi-list--check">
        <li>
          <FormattedMessage id="pricing.company.description.item.customisation" />
        </li>
        <li>
          <FormattedMessage id="pricing.company.description.item.support" />
        </li>
        <li>
          <FormattedMessage id="pricing.company.description.item.integration" />
        </li>
      </ul>

      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(CSS.companyPlanLink, 'mgi-btn-link primary')}
        href="https://getmati.com/contact"
      >
        <FormattedMessage id="pricing.company.button.title" />
      </a>
    </Panel.Body>
  )
}

export default class PricingPlan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="mgi-section mgi-section__huge">
          <TrialPlanPanel />
        </section>
        <section className="mgi-section mgi-section__huge">
          <h1 className="text-center">
            <FormattedMessage id="pricing.afterTrial.title" />
          </h1>

          <div className={CSS.otherPlans}>
            <ProfessionalPlanPanel />
            <CompanyPlanPanel />
          </div>
        </section>
      </React.Fragment>
    )
  }
}
