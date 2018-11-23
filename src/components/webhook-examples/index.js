import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import Icons from 'src/components/icons'
import { Tabs, TabList, Tab, TabPanel } from 'src/components/tabs'
import classNames from 'classnames'
import CSS from './style.scss'

const TABS_CONFIG = [
  {
    label: 'global_watchlist',
    icon: <Icons.Spy />,
    webhooks: [
      { label: 'developers.webhook.example.user.verified', response: '{}' },
      { label: 'developers.webhook.example.user.found.watchlist', response: '{}' }
    ]
  },
  {
    label: 'face_match',
    icon: <Icons.FaceMatch />,
    webhooks: [
      { label: 'developers.webhook.example.user.verified', response: '{}' },
      { label: 'developers.webhook.example.user.found.watchlist', response: '{}' }
    ]
  },
  {
    label: 'liveness',
    icon: <Icons.TickFilled />,
    webhooks: [
      { label: 'developers.webhook.example.user.verified', response: '{}' },
      { label: 'developers.webhook.example.user.found.watchlist', response: '{}' }
    ]
  },
  {
    label: 'ocr_data',
    icon: <Icons.WarningTriangle />,
    webhooks: [
      { label: 'developers.webhook.example.user.verified', response: '{}' },
      { label: 'developers.webhook.example.user.found.watchlist', response: '{}' }
    ]
  }
]

export default
@injectIntl
class extends Component {
  render() {
    return (
      <Tabs className={classNames('tabs', 'stretched')}>
        <TabList>
          {TABS_CONFIG.map(tab => {
            return (
              <Tab>
                {tab.icon} <FormattedMessage id={tab.label} />
              </Tab>
            )
          })}
        </TabList>
        {TABS_CONFIG.map(tab => {
          return (
            <TabPanel>
              <div className={CSS.webhookExamples}>
                <div className={CSS.webhookExample}>
                  <h5>
                    <FormattedMessage id={tab.webhooks[0].label} />
                  </h5>
                  <SyntaxHighlighter
                    language="json"
                    code={tab.webhooks[0].response}
                  />
                </div>
                <div className={CSS.webhookExample}>
                  <h5>
                    <FormattedMessage id={tab.webhooks[1].label} />
                  </h5>
                  <SyntaxHighlighter
                    language="json"
                    code={tab.webhooks[1].response}
                  />
                </div>
              </div>
            </TabPanel>
          )
        })}
      </Tabs>
    )
  }
}
