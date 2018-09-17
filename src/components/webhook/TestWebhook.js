import React from 'react'
import { Card, Label } from 'mgi-ui-components'
import { FormattedMessage } from 'react-intl'
import CSS from './TestWebhook.css'

const DOCUMENT_TYPE_COLORS = {
  'face': 'blue',
  'passport': 'orange',
  'national-id': 'green',
  'driving-license': 'red',
  'proof-of-residency': 'yellow',
}

export default class TestWebhook extends React.Component {
  render() {
    return (
      <div className={CSS.testWebhookContainer}>
        {this.props.webhooks.map(webhook => (
          <Card className='test-webhook-card'>
            <div className="test-webhook-card-types">
              {webhook.types.map(type => (
                <Label labelStyle={`primary bg-${DOCUMENT_TYPE_COLORS[type]} rounded`}>
                  <FormattedMessage id={`flow.documentTypeStep.${type}`} />
                </Label>
              )).reduce((prev, curr) => [prev, ' + ', curr])}
            </div>
            <div className="test-webhook-card-name">{webhook.name}</div>
            <div className="test-webhook-card-date">{webhook.date}</div>
          </Card>
        ))}
      </div>
    )
  }
}

TestWebhook.defaultProps = {
  webhooks: [
    {
      types: ['face', 'passport'],
      name: 'Tommy Foster',
      date: '2018-08-21 03:11:00 pm'
    },
    {
      types: ['national-id', 'passport'],
      name: 'Viola Luna',
      date: '2018-08-21 03:11:00 pm'
    },
    {
      types: ['driving-license'],
      name: 'Bertha Diaz',
      date: '2018-08-21 03:11:00 pm'
    },
    {
      types: ['proof-of-residency'],
      name: 'Tommy Foster',
      date: '2018-08-21 03:11:00 pm'
    }
  ]
}
