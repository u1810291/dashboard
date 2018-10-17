import React from 'react'
import Card from 'src/components/card'
import Label from 'src/components/label'
import { FormattedMessage } from 'react-intl'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import CSS from './TestWebhook.css'

const DOCUMENT_TYPE_COLORS = {
  'face': 'blue',
  'passport': 'orange',
  'national-id': 'green',
  'driving-license': 'red',
  'proof-of-residency': 'yellow',
}

class WebhookLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { webhook } = this.props
    return (
      <Card className='test-webhook-card'>
        <div className="test-webhook-card-expand" onClick={this.handleExpand}>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.86171 5.72211L1.28481 0.120295C1.205 0.0402105 1.11316 0 1.0095 0C0.905799 0 0.814003 0.0402105 0.734236 0.120295L0.135967 0.721389C0.0560748 0.801516 0.0162964 0.893558 0.0162964 0.997895C0.0162964 1.10223 0.0560748 1.19427 0.135967 1.2744L4.83913 5.99878L0.135967 10.7232C0.0560748 10.8034 0.0162964 10.8956 0.0162964 10.9996C0.0162964 11.1039 0.0560748 11.1961 0.135967 11.2763L0.734278 11.8771C0.814045 11.9573 0.905841 11.9973 1.00954 11.9973C1.1132 11.9973 1.205 11.9573 1.28481 11.8771L6.86142 6.27528C6.94114 6.1952 6.98104 6.10295 6.98104 5.99878C6.98104 5.89461 6.94143 5.8024 6.86171 5.72211Z" fill="black"/>
          </svg>
        </div>
        <div className="test-webhook-card-name">
          <small><strong>{webhook.fullName}</strong></small>
        </div>
        <div className="test-webhook-card-types">
          {webhook.steps.map(type => (
            <Label key={type} labelStyle={`${DOCUMENT_TYPE_COLORS[type]}`}>
              <FormattedMessage id={`flow.documentTypeStep.${type}`} />
            </Label>
          )).reduce((prev, curr, i) => [prev, <Label key={i}>+</Label>, curr])}
        </div>
        <div className="test-webhook-card-date">
          <small>{(new Date(webhook.dateCreated)).toLocaleDateString()}</small>
        </div>
        <div className="test-webhook-card-details" hidden={!this.state.expanded}>
          <div className="test-webhook-card-details-pictures">
            {(webhook.pictures || []).map(pic => (
              <div className="test-webhook-card-details-picture" key={pic.label}>
                <div className="text-caption text-secondary">
                  {pic.label}
                </div>
                <img src={pic.url} alt="" />
              </div>
            ))}
          </div>
          <div className="text-caption text-secondary">
            <FormattedMessage id="onboarding.webhook.webhook" />
          </div>
          <SyntaxHighlighter language='javascript' dark>
            {JSON.stringify(JSON.parse(webhook.contents), null, 1)}
          </SyntaxHighlighter>
        </div>
      </Card>
    )
  }
}

export default class TestWebhook extends React.Component {
  render() {
    return (
      <div className={CSS.testWebhookContainer}>
        {this.props.webhooks.map((webhook, i) => (
          <WebhookLine webhook={webhook} key={i} />
        ))}
      </div>
    )
  }
}
