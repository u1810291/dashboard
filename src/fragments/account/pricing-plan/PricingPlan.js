import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './pricing-plan.scss'
import Panel from 'src/components/panel'
import Sections from 'src/components/sections'
import Items from 'src/components/items'
import PricingTrialLogo from './icon-logo-pricing-trial.svg'

function TrialPlanPanel() {
  return (
    <Panel>
      <Panel.Body>
        <Items className={CSS.trialPlanPanel} template="1fr 1fr">
          <div>
            <p>
              <FormattedMessage id="pricing.trial.subTitle" />
            </p>
            <h1>
              <FormattedMessage id="pricing.trial.title" />
            </h1>

            <ul className="mgi-list mgi-list--check">
              {['days', 'verifications', 'card'].map(key => (
                <li>
                  <FormattedMessage id={`pricing.trial.description.item.${key}`} key={key} />
                </li>
              ))}
            </ul>
          </div>
          <div className={CSS.trialPlanPanelImage}>
            <PricingTrialLogo />
          </div>
        </Items>
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
        {['automate', 'access', 'sdk', 'identity', 'volumes', 'dashboard'].map(key => (
          <li>
            <FormattedMessage id={`pricing.professional.description.item.${key}`} />
          </li>
        ))}
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
        {['customisation', 'support', 'integration'].map(key => (
          <li>
            <FormattedMessage id={`pricing.company.description.item.${key}`} key={key} />
          </li>
        ))}
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
      <Sections extraGap>
        <TrialPlanPanel />
        <section>
          <h1 className="text-center">
            <FormattedMessage id="pricing.afterTrial.title" />
          </h1>

          <Items align="stretch" template="1fr 1fr">
            <ProfessionalPlanPanel />
            <CompanyPlanPanel />
          </Items>
        </section>
      </Sections>
    )
  }
}