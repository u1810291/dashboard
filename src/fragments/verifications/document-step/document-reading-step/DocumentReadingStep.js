import React from 'react'
import moment from 'moment'
import { titleize, underscore, humanize } from 'inflection'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { default as Text } from 'components/text'

function formatDate(value) {
  const INPUT_DATE_FORMATS = [moment.ISO_8601, 'YYYY', 'MMM D, YYYY', 'MMM D, YYYY'];
  const RE_NON_DIGIT = /\D/g;

  const dateAsMoment = moment.utc(value, INPUT_DATE_FORMATS);
  if (dateAsMoment.isValid()) {
    const { length: dateLength } = value.replace(RE_NON_DIGIT, '');

    if (dateLength > 7) {
      return dateAsMoment.format('MMM D, YYYY');
    } else if (dateLength > 4) {
      return dateAsMoment.format('MMM, YYYY');
    } else {
      return dateAsMoment.format('YYYY');
    }
  } else {
    return value;
  }
}

function formatValue(label, string) {
  function checkLabel(name, keys) {
    return keys.some(s => name.toLowerCase().includes(s))
  }

  if (checkLabel(label, ['name', 'address', 'gender', 'nationality'])) {
    return titleize(string)
  }

  if (checkLabel(label, ['date'])) {
    return formatDate(string)
  }

  return string
}

function Success({ step }) {
  return (
    <table className="mgi-table">
      <colgroup>
        <col width="40%"/>
        <col width="60%" />
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
