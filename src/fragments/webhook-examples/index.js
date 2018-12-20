import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { Tabs, TabList, Tab, TabPanel } from 'src/components/tabs'
import WEBHOOK_EXAMPLES_TABS from './webhook-examples-tabs'
import classNames from 'classnames'
import CSS from './style.scss'

export default
@injectIntl
class extends Component {
  render() {
    return (
      <Tabs className={classNames('tabs', 'stretched')}>
        <TabList>
          {WEBHOOK_EXAMPLES_TABS.map((tab, index) => {
            return (
              <Tab key={index}>
                {tab.icon} <FormattedMessage id={tab.label} />
              </Tab>
            )
          })}
        </TabList>
        {WEBHOOK_EXAMPLES_TABS.map((tab, index) => {
          return (
            <TabPanel key={index}>
              <div className={CSS.webhookExamples}>
                <div className={CSS.webhookExample}>
                  <h3 className="text-success">
                    <FormattedMessage id={tab.webhooks[0].label} />
                  </h3>
                  <SyntaxHighlighter
                    language="json"
                    dark={false}
                    wrapperClassName={CSS['webhook-example__code-wrapper']}
                    code={tab.webhooks[0].response}
                  />
                </div>
                <div className={CSS.webhookExample}>
                  <h3 className="text-warning">
                    <FormattedMessage id={tab.webhooks[1].label} />
                  </h3>
                  <SyntaxHighlighter
                    language="json"
                    dark={false}
                    code={tab.webhooks[1].response}
                    wrapperClassName={CSS['webhook-example__code-wrapper']}
                    wrapLines={true}
                    lineProps={line => {
                      return tab.webhooks[1].highlightedLines.includes(line)
                        ? {
                            className: 'webhook-example__highlighted-line'
                          }
                        : null
                    }}
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
