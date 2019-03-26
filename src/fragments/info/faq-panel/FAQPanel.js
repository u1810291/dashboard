import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Panel from 'src/components/panel'
import Button from 'src/components/button'
import CSS from './FAQPanel.scss'
import Background from './background.svg'

export default function FAQPanel() {
  return (
    <Panel>
      <Panel.Body className={classNames('mgi-items', CSS.panel)}>
        <div className={CSS.label}>
          <FormattedMessage id="fragments.info.faq-panel.subtitle" />
          <h1>
            <FormattedMessage id="fragments.info.faq-panel.title" />
          </h1>
        </div>
        <Background />
        <Button buttonStyle="primary-revert" external href="https://faq.getmati.com/">
          <FormattedMessage id="fragments.info.faq-panel.cta" />
        </Button>
      </Panel.Body>
    </Panel>
  )
}
