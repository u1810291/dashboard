import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'

export default function ClientApplicationsHelp() {
  return (
    <Panel>
      <Panel.Body>
        <section className="mgi-section">
          <h3 className="text-active">
            <FormattedMessage id="fragments.account.client_applications_help.title" />
          </h3>
        </section>
      </Panel.Body>
    </Panel>
  )
}
