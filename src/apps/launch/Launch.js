import React from 'react'
import { Content, PageContentLayout, Items, H1, H2 } from 'components'
import {
  Support,
  LaunchComplianceStarter,
  LaunchCustomize,
  LaunchPricing,
  LaunchIntegrate
} from 'fragments'

export default class Launch extends React.Component {
  render() {
    return (
      <Content>
        <Items flow="row" gap="2">
          <H1>Your Launch list</H1>
          <H2 weight="2">Enterprise level KYC/AML compliance - automated.</H2>
          <PageContentLayout navigation={false}>
            <main>
              <Items flow="row">
                <LaunchComplianceStarter />
                <LaunchCustomize />
                <LaunchPricing />
                <LaunchIntegrate />
              </Items>
            </main>
            <aside>
              <Support />
            </aside>
          </PageContentLayout>
        </Items>
      </Content>
    )
  }
}
