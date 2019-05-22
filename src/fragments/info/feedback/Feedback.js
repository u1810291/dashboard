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
    <Items templateColumns="1fr 1fr" gap="4">
      {['profuturo', 'doopla'].map((name, index) => (
        <Items flow="row" gap={1} key={index}>
          <p className={CSS.logo}>
            <img src={logos[name]} alt={name} />
          </p>
          <p className={`${CSS.feedback} text-center`}>
            <FormattedMessage id={`feedbacks.feedback.${index}.content`} />
          </p>
          <div className="text-secondary text-center">
            <FormattedMessage id={`feedbacks.feedback.${index}.author`} />
          </div>
        </Items>
      ))}
    </Items>
  )
}
