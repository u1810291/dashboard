import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'mgi-ui-components'
import { ConfigureFlow } from 'src/components/flow'
import { TestWebhook } from 'src/components/webhook'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import { MatiButton } from 'src/components/mati-button'
import styles from './Onboarding.css'

export default function Onboarding() {
  return (
    <div className={styles.onboarding}>
      <div className={styles.content}>
        <section>
          <h2><FormattedMessage id="onboarding.flow.title"/></h2>
          <ConfigureFlow />
        </section>
        <section>
          <h2><FormattedMessage id="onboarding.webhook.title"/></h2>
          <TestWebhook />
        </section>
        <section>
          <h2><FormattedMessage id="onboarding.webhookUrl.title"/></h2>
          <WebhookURLForm />
        </section>
        <section>
          <h2><FormattedMessage id="onboarding.pricing.title"/></h2>
          <Button buttonStyle="primary">
            <FormattedMessage id="onboarding.pricing.button" />
          </Button>
        </section>
      </div>
      <div className={styles.sidebar}>
        <h3>
          <FormattedMessage id="onboarding.demo.title"/>
        </h3>
        <p className="text-secondary">
          <FormattedMessage id="onboarding.demo.help-text"/>
        </p>
        <MatiButton />
      </div>
    </div>
  )
}
