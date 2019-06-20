import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Content, PageContentLayout, Items, H1, H2 } from 'components'
import {
  Support,
  LaunchCustomize,
  LaunchPricing,
  LaunchIntegrate
} from 'fragments'

export default class Launch extends React.Component {
  render() {
    return (
      <Content>
        <Items flow="row" gap="2">
          <H1><FormattedMessage id="Launch.title" /></H1>
          <H2 weight="2">
            <FormattedMessage id="Launch.subtitle" />
          </H2>
          <PageContentLayout navigation={false}>
            <main>
              <Items flow="row">
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
