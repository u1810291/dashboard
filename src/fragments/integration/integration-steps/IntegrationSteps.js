import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import Button from 'src/components/button'

export default function() {
  const steps = [
    ['configure', '/'],
    ['install', '/integration/integration-code'],
    [
      'receive',
      '/integration/applications',
      <p>
        <a href="https://docs.getmati.com" target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="settings.installationGuide.receive.link" />
        </a>
      </p>
    ]
  ]
  return steps.map(([step, url, extra]) => (
    <Panel>
      <Panel.Body>
        <Items align="center" template="7fr 5fr">
          <section>
            <h2>
              <FormattedMessage id={`settings.installationGuide.${step}.title`} />
              <p>
                <FormattedMessage id={`settings.installationGuide.${step}.description`} />
              </p>
            </h2>
            {extra}
          </section>
          <Button buttonStyle="primary" href={url}>
            <FormattedMessage id={`settings.installationGuide.${step}.button`} />
          </Button>
        </Items>
      </Panel.Body>
    </Panel>
  ))
}
