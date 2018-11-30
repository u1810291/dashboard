import React from 'react'
import Panel from 'src/components/panel'
import { times } from 'lodash'
import { injectIntl } from 'react-intl'
import './style.scss'

export default
@injectIntl
class Pricing extends React.Component {
  render() {
    const contactSalesLink =
      'mailto:hello@getmati.com'
    const { formatMessage } = this.props.intl
    const t = variableName => formatMessage({ id: variableName })

    return (
      <Panel caption={t('plan.title')}>
        <Panel.Body className="pricing-plans" padded={false}>
          <div className="pricing-plans__headers">
            <div className="pricing-plan__header">{t('pricing.plans')}</div>
            <div className="pricing-plan__price">{t('pricing')}</div>
            <div className="pricing-plan__features">{t('features')}</div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              {' '}
              <div className="pricing-plan__name">{t('plan.starter')}</div>
              <p className="pricing-plan__description">
                {t('plan.starter.description-1')}
                <br />
                {t('plan.starter.description-2')}
              </p>
            </div>
            <div className="pricing-plan__price">
              <div className="pricing-plan__price-header">
                <strong>{t('plan.price.free')}</strong>
              </div>
            </div>
            <div className="pricing-plan__features">
              <ul>
                {
                  times(5).map(i => (
                    <li>{t(`plan.starter.features.${i}`)}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              <div className="pricing-plan__header-top-hint">
                {t('plan.price.safety-pro.default')}
              </div>
              <div className="pricing-plan__name">{t('plan.safety-pro')}</div>
              <p className="pricing-plan__description">
                {t('plan.safety-pro.description-1')}
                <br />
                {t('plan.safety-pro.description-2')}
              </p>
            </div>
            <div className="pricing-plan__price">
              <div className="">
                <div className="pricing-plan__price-header">
                  <strong>{t('plan.price.safety-pro')}</strong>{' '}
                  <span className="text-muted">
                    / {t('plan.price.safety-pro.per-user')}
                  </span>
                </div>
                <strong className="text-success">
                  <small>{t('plan.price.safety-pro.free-verifications')}</small>
                </strong>
              </div>
            </div>
            <div className="pricing-plan__features">
              {' '}
              <h3>{t('plan.safety-pro.features.header')}</h3>
              <ul>
                <li>
                  <strong>{t('plan.safety-pro.features.watchlist')}</strong>
                  <p>
                    <span>{t('plan.safety-pro.features.watchlist.desc')}</span>{' '}
                    {/* <a href="#">{t('link.read-more')}</a> */}
                  </p>
                </li>
                <li>
                  <strong>{t('plan.safety-pro.features.liveness')}</strong>
                  <p>
                    <span>{t('plan.safety-pro.features.liveness.desc')}</span>{' '}
                    {/* <a href="#">{t('link.find-out-more')}</a> */}
                  </p>
                </li>
                <li>
                  <strong>{t('plan.safety-pro.features.auth')}</strong>
                  <p>
                    <span>{t('plan.safety-pro.features.auth.desc')}</span>{' '}
                    {/* <a href="#">{t('link.read-more')}</a> */}
                  </p>
                </li>
                <li>
                  <strong>{t('plan.safety-pro.features.trial')}</strong>
                  <p>{t('plan.safety-pro.features.trial.desc')}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              <div className="pricing-plan__name">{t('plan.enterprise')}</div>
              <div className="pricing-plan__description">
                {t('plan.enterprise.description-1')}
                <br />
                {t('plan.enterprise.description-2')}
              </div>
            </div>
            <div className="pricing-plan__price">
              <a href={contactSalesLink}>
                <small>{t('plan.price.enterprise.contact-sales')}</small>
              </a>
            </div>
            <div className="pricing-plan__features">
              <h3>{t('plan.enterprise.features.header')}</h3>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}
