import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import CSS from './mati-docs.scss'
import IconApple from '../../../assets/icon-apple-documents.svg'
import IconAndroid from '../../../assets/icon-android-documents.svg'
import IconWebhook from '../../../assets/icon-webhook.svg'

export default function MatiDocs() {
  return (
    <div className={CSS.content}>
      <Panel>
        <Panel.Body>
          <h3>
            <FormattedMessage id="settings.integrationCode.matiDocumentation" />
          </h3>
          <div className="mgi-items text-center">
            <div className="doc-item">
              <a href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md">
                <div className="doc-item--icon">
                  <IconApple />
                </div>
                <p>
                  <FormattedMessage id="settings.integrationCode.iosDocumentation" />
                </p>
              </a>
            </div>
            <div className="doc-item">
              <a href="https://github.com/MatiFace/mati-global-id-sdk-integration-android">
                <div className="doc-item--icon">
                  <IconAndroid />
                </div>
                <p>
                  <FormattedMessage id="settings.integrationCode.androidDocumentation" />
                </p>
              </a>
            </div>
            <div className="doc-item">
              <a href="https://docs.getmati.com">
                <div className="doc-item--icon">
                  <IconWebhook />
                </div>
                <p>
                  <FormattedMessage id="settings.integrationCode.webhookDocumentation" />
                </p>
              </a>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    </div>
  )
}
