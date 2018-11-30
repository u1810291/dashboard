import React from 'react'
import { FormattedMessage } from 'react-intl'
import ToggleField from 'src/components/toggle-field'

export default function SafetyProStep({
  onClick = () => {},
  ...props
}) {
  return (
    <div>
      <h4 className="text-success">
        <strong>
          <FormattedMessage id="flow.watchlistStep.title" />
        </strong>
      </h4>
      <div className="mgi-items">
          {['globalWatchList', 'liveness'/*, 'databaseValidation'*/].map(t => (
            <section key={t}>
              <h4>
                <FormattedMessage id={`flow.safetyProStep.${t}`} />
              </h4>
              <ToggleField
                checked={props[t]}
                onClick={onClick.bind(null, { [t]: !props[t] })}
              />
            </section>
          ))}
      </div>
    </div>
  )
}
