import React from 'react'
import { FormattedMessage } from 'react-intl'
import Items from 'components/items'
import CSS from './feedback.module.scss'

const logos = {
  profuturo: require('./profuturo.png'),
  doopla: require('./doopla.png')
}

export default function Feedback() {
  return (
    <Items className={CSS.content} flow="row">
      <h1>
        <FormattedMessage id="fragments.info.feedback.title" />
      </h1>
      <Items templateColumns="1fr 1fr">
        {['profuturo', 'doopla'].map((name, index) => (
          <Items flow="row" gap={1}>
            <p className={CSS.logo}>
              <img src={logos[name]} alt={name} />
            </p>
            <p className="feedback text-center">
              <FormattedMessage id={`feedbacks.feedback.${index}.content`} />
            </p>
            <div className="text-secondary">
              <FormattedMessage id={`feedbacks.feedback.${index}.author`} />
            </div>
          </Items>
        ))}
      </Items>
    </Items>
  )
}
