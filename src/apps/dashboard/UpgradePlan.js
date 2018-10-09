import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import classNames from 'classnames'
import { Content } from 'src/components/application-box'
import Button from 'src/components/button'
import Card from 'src/components/card'
import CSS from './UpgradePlan.css'

const plans = ['starter', 'safety-pro', 'enterprise']

const details = ['safety-pro', 'liveness', 'new-features']
const detailsIcons = {
  'safety-pro': require('./safety-pro-icon.svg'),
  liveness: require('./liveness-icon.svg'),
  'new-features': require('./new-features-icon.svg')
}

@injectIntl
class PlanCard extends React.Component {
  getI18nMessage = id => {
    return this.props.intl.messages[id] ? this.props.intl.formatMessage({ id }) : null
  }

  render() {
    const id = this.props.plan
    const caption = this.getI18nMessage(`plan.cards.${id}.caption`)
    const price = this.getI18nMessage(`plan.cards.${id}.price`)
    const subPrice = this.getI18nMessage(`plan.cards.${id}.sub-price`)
    const alternativePrice = this.getI18nMessage(`plan.cards.${id}.alternative-price`)
    const priceDescription = this.getI18nMessage(`plan.cards.${id}.price-description`)
    const CTA = this.getI18nMessage(`plan.cards.${id}.CTA`)
    const features = this.getI18nMessage(`plan.cards.${id}.features`)
    return (
      <Card className={classNames(CSS.card, id)}>
        <header>
          <div class="text-caption text-secondary">{caption}</div>
          <div class={CSS.price}>
            {price && <em>{price}</em>}
            {subPrice && <small>/ {subPrice}</small>}
            {alternativePrice && <span className="alternative">{alternativePrice}</span>}
          </div>
          {priceDescription && <small className="text-secondary">{priceDescription}</small>}
        </header>
        <Button disabled className={CSS.cardButton}>{CTA}</Button>
        {features && (
          <ul className={CSS.features}>
            {features.map(feature => (
              <li>
                {Array.isArray(feature) ? (
                  <React.Fragment>
                    <strong>
                      <small>{feature[0]}</small>
                    </strong>
                    <small>{feature[1]}</small>
                  </React.Fragment>
                ) : (
                  <small>{feature}</small>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    )
  }
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
            <p className="text-caption text-success">
              <FormattedMessage id={`plan.details.${type}.extra.title`} />
            </p>
            <ul className={CSS.detailsExtra}>
              {this.props.intl
                .formatMessage({ id: `plan.details.${type}.extra.items` })
                .map(item => <li><small>{item}</small></li>)}
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
      <Content>
        <h2>
          <FormattedMessage id="plan.title" />
        </h2>

        <div class={CSS.cardsContainer}>{plans.map(plan => <PlanCard plan={plan} />)}</div>

        <div class={CSS.detailsContainer}>{details.map(type => <DetailCard type={type} />)}</div>
      </Content>
    )
  }
}
