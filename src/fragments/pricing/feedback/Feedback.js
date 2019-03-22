import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import CSS from './feedback.scss'

export default
@injectIntl
class Feature extends React.Component {

  render() {
    return (
      <div className={CSS.content}>
        <div className="mgi-items">
          <div className="mgi-items--col-6 clients-lopez">
            <div className="client-and-logo text-center">
              <div className="mgi-items--inline">
                <div className="client-photo" />
                <div className="logo" />
              </div>
            </div>
            <div className="feedback">
              <FormattedMessage id="feedbacks.feedback.0.content" />
            </div>
            <div className="company">
              <FormattedMessage id="feedbacks.feedback.0.author" />
            </div>
          </div>
          <div className="mgi-items--col-6 clients-flores">
            <div className="client-and-logo text-center">
              <div className="mgi-items--inline">
                <div className="client-photo" />
                <div className="logo" />
              </div>
            </div>
            <div className="feedback">
              <FormattedMessage id="feedbacks.feedback.1.content" />
            </div>
            <div className="company">
              <FormattedMessage id="feedbacks.feedback.1.author" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}