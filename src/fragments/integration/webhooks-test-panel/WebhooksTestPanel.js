import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Sections from 'src/components/sections'
import { ReactComponent as Picture } from './picture.svg'

export default function WebhookTestPanel({ message }) {
  return (
    <Panel.Body className="background-softpink" extraPadding>
      <Sections>
        <h2>
          <FormattedMessage id="fragments.integration.webhooks-test-panel.title" />
        </h2>
        <Items template="1fr 1fr" align="center">
          <ol className="mgi-list">
            {Array.from(Array(4)).map((a, index) => (
              <li key={index}>
                <FormattedHTMLMessage
                  id={`fragments.integration.webhooks-test-panel.list.${index}`}
                />
              </li>
            ))}
          </ol>
          <Picture />
        </Items>
        <section>
          <h3 className="text-darkpink">
            <small>
              <FormattedMessage id="fragments.integration.webhooks-test-panel.pro-tip.caption" />
            </small>
          </h3>
          <Items inline>
            <Panel.Body
              border="darkpink"
              extraSmallPadding
              className="background-transparent text-darkpink"
            >
              <small>
                <FormattedMessage id="fragments.integration.webhooks-test-panel.pro-tip.message" />
              </small>
            </Panel.Body>
          </Items>
        </section>
      </Sections>
    </Panel.Body>
  )
}
