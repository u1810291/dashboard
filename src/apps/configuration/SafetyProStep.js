import React from 'react'
import { FormattedMessage } from 'react-intl'
import ToggleField from 'src/components/toggle-field'

export default function SafetyProStep({ onClick = () => {}, system }) {
  const handleClick = value => {
    onClick({ system: { ...system, ...value } })
  }
  return (
    <fieldset className="mgi-fieldset">
      <legend>
        <h3 className="text-success">
          <FormattedMessage id="flow.watchlistStep.title" />
        </h3>
      </legend>
      <div className="mgi-items">
        {['watchlists', 'liveness' /*, 'databases'*/].map(t => (
          <section key={t}>
            <h3>
              <FormattedMessage id={`flow.safetyProStep.${t}`} />
            </h3>
            <ToggleField
              // checked={system[t]}
              // TODO: remove next two lines after mati.io migration.
              checked
              disabled
              onClick={() => handleClick({ [t]: !system[t] })}
            />
          </section>
        ))}
      </div>
    </fieldset>
  )
}
