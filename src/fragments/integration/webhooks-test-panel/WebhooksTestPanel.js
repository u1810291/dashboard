import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Card from 'components/card'
import Items from 'components/items'
import Picture from './picture.svg'

export default function WebhookTestPanel({ message }) {
  return (
    <Card background="softpink" padding={4}>
      <Items flow="row">
        <h2>
          <FormattedMessage id="fragments.integration.webhooks-test-panel.title" />
        </h2>
        <Items templateColumns="1fr 1fr" align="center">
          <ol className="mgi-list">
            {Array.from(Array(4)).map((a, index) => (
              <li key={index}>
                <FormattedHTMLMessage
                  id={`fragments.integration.webhooks-test-panel.list.${index}`}
                />
              </li>
            ))}
          </ol>
          <img src={Picture} alt="" className="content-cover" />
        </Items>
        <Items flow="row" gap={0}>
          <h3 className="text-darkpink">
            <small>
              <FormattedMessage id="fragments.integration.webhooks-test-panel.pro-tip.caption" />
            </small>
          </h3>
          <Items inline justifyContent="start">
            <Card
              border="darkpink"
              padding={1}
              shadow={0}
              background="transparent"
            >
              <small className="text-darkpink">
                <FormattedMessage id="fragments.integration.webhooks-test-panel.pro-tip.message" />
              </small>
            </Card>
          </Items>
        </Items>
      </Items>
    </Card>
  )
}
