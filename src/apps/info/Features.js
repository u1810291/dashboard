import React from 'react'
import Items from 'src/components/items'
import Features from 'src/fragments/info/features'
import FeaturesPoster from 'src/fragments/info/features-poster'
import Support from 'src/fragments/account/support'
import FAQPanel from 'src/fragments/info/faq-panel'
import Feedback from 'src/fragments/info/feedback'

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
