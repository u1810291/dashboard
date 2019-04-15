import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import Button from 'src/components/button'
import Items from 'src/components/items'
import CSS from './FAQPanel.scss'
import Background from './background.svg'

export default function FAQPanel() {
  return (
    <Card background="active" className={CSS.panel}>
      <Items align="center" templateColumns="auto minmax(auto, 100%) auto">
        <div className={CSS.label}>
          <FormattedMessage id="fragments.info.faq-panel.subtitle" />
          <h1>
            <FormattedMessage id="fragments.info.faq-panel.title" />
          </h1>
        </div>
        <div className="text-center">
          <Background />
        </div>
        <Button
          buttonStyle="primary-revert"
          external
          href="https://getmati.com/faq"
        >
          <FormattedMessage id="fragments.info.faq-panel.cta" />
        </Button>
      </Items>
    </Card>
  )
}
