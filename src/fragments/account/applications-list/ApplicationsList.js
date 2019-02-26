import React from 'react'
import Button from 'src/components/button'
import { FormattedMessage } from 'react-intl'

export default function ApplicationsList({ clientApplicationsList, createApplication }) {
  return (
    <React.Fragment>
      {clientApplicationsList.map((item, index) => (
        <section className="mgi-section" key={index}>
          <h3>
            <FormattedMessage id="manage_applications.labels.clientId" />
          </h3>
          <p>{item.clientId}</p>
          <h3>
            <FormattedMessage id="manage_applications.labels.clientSecret" />
          </h3>
          <p>{item.clientSecret}</p>
        </section>
      ))}
      <section className="mgi-section">
        <Button onClick={createApplication} buttonStyle="primary">
          <FormattedMessage id="manage_applications.generate" />
        </Button>
      </section>
    </React.Fragment>
  )
}
