import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import CSS from './pricing-plan.scss'
import Card from 'src/components/card'
import Items from 'src/components/items'
import { ReactComponent as PricingTrialLogo } from './icon-logo-pricing-trial.svg'

function TrialPlanPanel() {
  return (
    <Card padding={4}>
      <Items templateColumns="1fr 1fr" align="center">
        <Items flow="row">
          <header>
            <p>
              <FormattedMessage id="pricing.trial.subTitle" />
            </p>
            <h1>
              <FormattedMessage id="pricing.trial.title" />
            </h1>
          </header>

          <ul className="mgi-list mgi-list--check">
            {['days', 'verifications', 'card'].map(key => (
              <li>
                <FormattedMessage
                  id={`pricing.trial.description.item.${key}`}
                  key={key}
                />
              </li>
            ))}
          </ul>
        </Items>
        <div className={CSS.trialPlanPanelImage}>
          <PricingTrialLogo />
        </div>
      </Items>
    </Card>
  )
}

function ProfessionalPlanPanel() {
  return (
    <Card background="active" padding={4}>
      <Items flow="row">
        <header>
          <p>
            <FormattedMessage id="pricing.professional.subTitle" />
          </p>
          <h1 className={CSS.pricingHeader}>
            <FormattedMessage id="pricing.professional.price" />{' '}
            <small>
              / <FormattedMessage id="pricing.professional.price.item" />
            </small>
          </h1>
        </header>
        <ul className="mgi-list mgi-list--check-inverted">
          {[
            'automate',
            'access',
            'sdk',
            'identity',
            'volumes',
            'dashboard'
          ].map(key => (
            <li>
              <FormattedMessage
                id={`pricing.professional.description.item.${key}`}
              />
            </li>
          ))}
        </ul>
      </Items>
    </Card>
  )
}

function CompanyPlanPanel() {
  return (
    <Card className={CSS.companyPlan} padding={4}>
      <Items flow="row" justifyContent="start">
        <Items flow="row" gap={0}>
          <p>
            <FormattedMessage id="pricing.company.subTitle" />
          </p>
          <h1>
            <FormattedMessage id="pricing.company.title" />
          </h1>
        </Items>

        <ul className="mgi-list--check">
          {['customisation', 'support', 'integration'].map(key => (
            <li>
              <FormattedMessage
                id={`pricing.company.description.item.${key}`}
                key={key}
              />
            </li>
          ))}
        </ul>

        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(CSS.companyPlanLink, 'mgi-btn-link primary')}
            href="https://getmati.com/contact"
          >
            <FormattedMessage id="pricing.company.button.title" />
          </a>
        </section>
      </Items>
    </Card>
  )
}

export default class PricingPlan extends React.Component {
  render() {
    return (
      <Items flow="row" gap={4}>
        <TrialPlanPanel />
        <Items flow="row">
          <h1 className="text-center">
            <FormattedMessage id="pricing.afterTrial.title" />
          </h1>

          <Items align="stretch" templateColumns="1fr 1fr">
            <ProfessionalPlanPanel />
            <CompanyPlanPanel />
          </Items>
        </Items>
      </Items>
    )
  }
}
