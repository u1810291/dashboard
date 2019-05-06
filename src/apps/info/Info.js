import React from 'react'
import { injectIntl } from 'react-intl'
import Items from 'components/items'
import Support from 'fragments/account/support'
import FAQ from 'fragments/info/faq'
import FAQPanel from 'fragments/info/faq-panel'
import Feedback from 'fragments/info/feedback'
import FAQData from './faq-data'

function Info({ intl }) {
  return (
    <React.Fragment>
      <main>
        <Items flow="row" gap={4}>
          <FAQ questions={FAQData[intl.locale]} />
          <FAQPanel />
          <Feedback />
        </Items>
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
  )
}

export default injectIntl(Info)
