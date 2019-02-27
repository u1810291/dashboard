import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import CSS from './GooglePlayLink.scss'

export default function GooglePlayLink({clientApplicationsList}) {
  return (
    <Panel>
      <Panel.Body>
        <div className={CSS.container}>
          <h3><FormattedMessage id="developers.demo.demo" />
            <p><FormattedMessage id="developers.demo.description" /></p>
          </h3>
          <div className={CSS.googlePlayWrapper}>
            <a href="https://play.google.com/store/apps/details?id=com.matilock.mati_global_demo"
               target="_blank" rel="noopener noreferrer">
              <div className={CSS.googlePlay} />
            </a>
            <p><FormattedMessage id="developers.demo.buttonDescription" /></p>
          </div>
        </div>
        <div>
          <h3><FormattedMessage id="developers.demo.clientId" />
            <p><FormattedMessage id="developers.demo.clientIdDescription" /></p>
          </h3>
          <div className={CSS.clientId}>
            {clientApplicationsList[0] && clientApplicationsList[0].clientId}
          </div>
        </div>
      </Panel.Body>
    </Panel>
  )
}
