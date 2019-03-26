import React from 'react'
import { FormattedMessage } from 'react-intl'
import CSS from './feedback.scss'

export default function Feedback() {
  return (
    <section className={CSS.content}>
      <h1>
        <FormattedMessage id="fragments.info.feedback.title" />
      </h1>
      <div className="mgi-items">
        {['lopez', 'flores'].map((name, index) => (
          <div className={`mgi-items--col-6 clients-${name}`}>
            <p className="client-and-logo text-center">
              <div className="mgi-items--inline">
                <div className="client-photo" />
                <div className="logo" />
              </div>
            </p>
            <p className="feedback">
              <FormattedMessage id={`feedbacks.feedback.${index}.content`} />
            </p>
            <div className="text-secondary">
              <FormattedMessage id={`feedbacks.feedback.${index}.author`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
