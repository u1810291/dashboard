import React from 'react'
import Items from 'components/items'
import Features from 'fragments/info/features'
import FeaturesPoster from 'fragments/info/features-poster'
import Support from 'fragments/account/support'
import FAQPanel from 'fragments/info/faq-panel'
import Feedback from 'fragments/info/feedback'

export default function FeaturesPage() {
  return (
    <React.Fragment>
      <main>
        <Items flow="row" gap={4}>
          <FeaturesPoster />
          <Features />
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
