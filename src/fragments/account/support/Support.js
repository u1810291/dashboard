import React from 'react'
import { FormattedMessage } from 'react-intl'
import { showIntercom } from 'src/lib/intercom'
import Panel from 'src/components/panel'
import Button from 'src/components/button'
import CSS from './Support.scss'
import SupportIcon from './support.svg'


export default function Support() {

  return (
    <Panel>
      <Panel.Body>
        <div>
          <p className={CSS.titleWrapper}>
            <SupportIcon />
            <span className={CSS.title}>
              <FormattedMessage id="settings.support.title"/>
            </span>
          </p>
          <p>
            <FormattedMessage id="settings.support.chat" />
          </p>
          <p>
            <Button buttonStyle="primary" className={CSS.supportButton} onClick={showIntercom}>
              <FormattedMessage id="settings.support.contact" />
            </Button>
          </p>
        </div>
      </Panel.Body>
    </Panel>
  )
}
