import React from 'react'
import { CardExpandable } from 'src/components/card-expandable'
import Label from 'src/components/label'
import { FormattedMessage } from 'react-intl'
import MediaQuery from 'react-responsive'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import stringify from 'src/lib/stringify'
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

    const info = <React.Fragment>
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
    </React.Fragment>

    const details = () => (
      <div className="test-webhook-card-details">
        <div className="test-webhook-card-details-pictures">
          {(webhook.pictures || []).map(pic => (
            <div className="test-webhook-card-details-picture" key={pic.label}>
              <h4 className="text-caption text-secondary">
                {pic.label}
              </h4>
              <img src={pic.url} alt="" />
              {
                pic.label === 'Face Verification' && (
                  <React.Fragment>
                    <div className={CSS.faceMatchStatus}>
                      <FormattedMessage id="onboarding.webhook.facematch" />
                      {': '}
                      <span className={webhook.faceMatch ? 'text-success': 'text-failure'}>
                        <FormattedMessage id={webhook.faceMatch ? 'yes' : 'no'} />
                      </span>
                    </div>
                    <div className={CSS.faceMatchStatus}>
                      <FormattedMessage id="onboarding.webhook.liveness" />
                      {': '}
                      <span className={webhook.alive ? 'text-success': 'text-failure'}>
                        <FormattedMessage id={webhook.alive ? 'passed' : 'flagged'} />
                      </span>
                    </div>
                  </React.Fragment>
                )
              }
            </div>
          ))}
        </div>
        <h4 className="text-caption text-secondary">
          <FormattedMessage id="onboarding.webhook.webhook" />
        </h4>
        <SyntaxHighlighter language='json' dark>
          {stringify(JSON.parse(webhook.contents))}
        </SyntaxHighlighter>
      </div>
    )

    return <CardExpandable info={info} details={details} />
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
