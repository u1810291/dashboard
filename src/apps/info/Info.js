import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Items from 'src/components/items'
import Support from 'src/fragments/account/support'
import FAQ from 'src/fragments/info/faq'
import FAQPanel from 'src/fragments/info/faq-panel'
import Feedback from 'src/fragments/info/feedback'
import InfoLayout from './InfoLayout'
import FAQData from './faq-data'

function Info({ intl }) {
  return (
    <React.Fragment>
      <Items flow="row">
        <h1>
          <FormattedMessage id="apps.info.info.title" />
        </h1>
        <InfoLayout>
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
        </InfoLayout>
      </Items>
    </React.Fragment>
  )
}

export default injectIntl(Info)
