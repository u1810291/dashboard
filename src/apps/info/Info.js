import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Support from 'src/fragments/account/support'
import FAQ from 'src/fragments/info/faq'
import FAQPanel from 'src/fragments/info/faq-panel'
import Feedback from 'src/fragments/info/feedback'
import Sections from 'src/components/sections'
import InfoLayout from './InfoLayout'
import FAQData from './faq-data'

function Info({ intl }) {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id="apps.info.info.title" />
      </h1>
      <InfoLayout>
        <main>
          <Sections extraGap>
            <FAQ questions={FAQData[intl.locale]} />
            <FAQPanel />
            <Feedback />
          </Sections>
        </main>
        <aside>
          <Support />
        </aside>
      </InfoLayout>
    </React.Fragment>
  )
}

export default injectIntl(Info)
