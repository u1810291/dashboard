import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'src/components/card'
import StatusLabel from 'src/fragments/verifications/status-label'

export default function DocumentStatusHelp() {
  return (
    <Card>
      <fieldset className="mgi-fieldset">
        <legend>
          <StatusLabel status="inProgress" coloredText={true} />
        </legend>
        <div>
          <FormattedMessage id="statuses.inProgress.info" />
        </div>
      </fieldset>
      <fieldset className="mgi-fieldset">
        <legend>
          <StatusLabel status="verified" coloredText={true} />
        </legend>
        <div>
          <FormattedMessage id="statuses.verified.info" />
        </div>
      </fieldset>
      <fieldset className="mgi-fieldset">
        <legend>
          <StatusLabel status="manual" coloredText={true} />
        </legend>
        <div>
          <FormattedMessage id="statuses.manual.info" />
        </div>
      </fieldset>
      <fieldset className="mgi-fieldset">
        <legend>
          <StatusLabel status="unverified" coloredText={true} />
        </legend>
        <div>
          <FormattedMessage id="statuses.unverified.info" />
        </div>
      </fieldset>
    </Card>
  )
}
