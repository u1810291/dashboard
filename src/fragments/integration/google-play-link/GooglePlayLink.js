import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Items from 'src/components/items'
import CSS from './GooglePlayLink.scss'
import GooglePlayImage from './google-play.png'

export default function GooglePlayLink({ clientId }) {
  return (
    <Panel>
      <Panel.Body>
        <Items flow="row">
          <Items flow="row" gap={4}>
            <h3>
              <FormattedMessage id="developers.demo.demo" />
              <p>
                <FormattedMessage id="developers.demo.description" />
              </p>
            </h3>
            <Items flow="row" justifyContent="center" gap={1}>
              <a
                href="https://play.google.com/store/apps/details?id=com.matilock.mati_global_demo"
                target="_blank"
                rel="noopener noreferrer"
                className={CSS.googlePlay}
              >
                <img src={GooglePlayImage} alt="Google Play" />
              </a>
              <p>
                <FormattedMessage id="developers.demo.buttonDescription" />
              </p>
            </Items>
            <Items flow="row" gap={1}>
              <h3>
                <FormattedMessage id="developers.demo.clientId" />
                <p>
                  <FormattedMessage id="developers.demo.clientIdDescription" />
                </p>
              </h3>
              <div className={CSS.clientId}>{clientId}</div>
            </Items>
          </Items>
        </Items>
      </Panel.Body>
    </Panel>
  )
}
