import React from 'react'
import moment from 'moment'
import { titleize, underscore, humanize } from 'inflection'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { default as Text } from 'components/text'

function formatValue(label, string) {
  function checkLabel(name, keys) {
    return keys.some(s => name.toLowerCase().includes(s))
  }

  if (checkLabel(label, ['name', 'address', 'gender', 'nationality'])) {
    return titleize(string)
  }

  if (checkLabel(label, ['date'])) {
    const attempts = [
      moment.utc(string),
      moment.utc(string, 'DD-MM-YYYY')
    ].filter(date => date.toDate().getDate())
    return attempts.length > 0 ? attempts[0].format('MMM D, YYYY') : string
  }

  return string
}

function Success({ step }) {
  return (
    <table className="mgi-table">
      <colgroup>
        <col />
        <col width="100%" />
      </colgroup>
      <tbody>
        {Object.entries(step.data || {}).map(([label, { value }]) => (
          <tr key={label}>
            <td className="text-nowrap">
              <FormattedMessage
                id={`DocumentReadingStep.fields.${label}`}
                defaultMessage={humanize(underscore(label))}
              />
            </td>
            <td>
              {value ?
                <Text weight={4}>
                  {formatValue(label, value)}
                </Text>
              : (
                <Text weight={2} color={'gray'}>
                  <FormattedMessage id="DocumentReadingStep.notParsed" />
                </Text>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Error({ error: { message } }) {
  return (
    <span>
      <FormattedHTMLMessage
        id="DocumentReadingStep.error"
        values={{ message }}
      />
    </span>
  )
}

export default function DocumentReadingStep({ step }) {
  if (step.error) {
    return <Error error={step.error} />
  }

  if (step.status === 200 && !step.error) {
    return <Success step={step} />
  }
}
