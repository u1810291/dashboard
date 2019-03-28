import React from 'react'
import { FormattedMessage } from 'react-intl'
import Items from 'src/components/items'
import CSS from './feedback.scss'

const logos = {
  profuturo: require('./profuturo.png'),
  doopla: require('./doopla.png')
}

export default function Feedback() {
  return (
    <section className={CSS.content}>
      <h1>
        <FormattedMessage id="fragments.info.feedback.title" />
      </h1>
      <Items template="1fr 1fr">
        {['profuturo', 'doopla'].map((name, index) => (
          <div>
            <p className={CSS.logo}>
              <img src={logos[name]} alt={name} />
            </p>
            <p className="feedback text-center">
              <FormattedMessage id={`feedbacks.feedback.${index}.content`} />
            </p>
            <div className="text-secondary">
              <FormattedMessage id={`feedbacks.feedback.${index}.author`} />
            </div>
          </div>
        ))}
      </Items>
    </section>
  )
}
