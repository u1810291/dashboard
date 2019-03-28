import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import CSS from './mati-docs.scss'
import IconApple from '../../../assets/icon-apple-documents.svg'
import IconAndroid from '../../../assets/icon-android-documents.svg'
import IconWebhook from '../../../assets/icon-webhook.svg'

const docsSections = [
  [
    'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
    <IconApple />,
    'iosDocumentation'
  ],
  [
    'https://github.com/MatiFace/mati-global-id-sdk-integration-android',
    <IconAndroid />,
    'androidDocumentation'
  ],
  ['https://docs.getmati.com', <IconWebhook />, 'webhookDocumentation']
]
export default function MatiDocs() {
  return (
    <div className={CSS.content}>
      <Panel>
        <Panel.Body>
          <h3>
            <FormattedMessage id="settings.integrationCode.matiDocumentation" />
          </h3>

          <Items>
            {docsSections.map(([url, icon, message], index) => (
              <div className="doc-item text-center" key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <div className="doc-item--icon">{icon}</div>
                  <p>
                    <FormattedMessage id={`settings.integrationCode.${message}`} />
                  </p>
                </a>
              </div>
            ))}
          </Items>
        </Panel.Body>
      </Panel>
    </div>
  )
}
