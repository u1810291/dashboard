import React from 'react'
import { FormattedMessage } from 'react-intl'
import ToggleField from 'src/components/toggle-field'

export default function SafetyProStep({ onClick = () => {}, ...props }) {
  return (
    <div>
      <h3 className="text-success">
        <strong>
          <FormattedMessage id="flow.watchlistStep.title" />
        </strong>
      </h3>
      <div className="mgi-items">
        {['globalWatchList', 'liveness' /*, 'databaseValidation'*/].map(t => (
          <section key={t}>
            <h3>
              <FormattedMessage id={`flow.safetyProStep.${t}`} />
            </h3>
            <ToggleField
              // checked={props[t]}
              // TODO: remove next two lines after mati.io migration.
              checked
              disabled
              onClick={onClick.bind(null, { [t]: !props[t] })}
            />
          </section>
        ))}
      </div>
    </div>
  )
}
