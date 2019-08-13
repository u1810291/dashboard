import React from 'react';
import { get } from 'lodash';
import { underscore, humanize } from 'inflection';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { default as Text } from 'components/text';
import TextEditable from 'components/text-editable';
import { formatValue } from 'lib/string';


const EditableField = ({label, value, onSubmit}) => value ?
  <Text weight={4}>
    <TextEditable
      text={formatValue(label, value)}
      onSubmit={onSubmit.bind(null, label)}
      error={false}
      isEditing={false}
    />
  </Text> :
  <Text weight={2} color={'gray'}>
    <TextEditable />
  </Text>

function Success({ step, source, onSubmit, isEditable }) {
  return (
    <table className="mgi-table">
      <colgroup>
        <col width="40%"/>
        <col width="60%" />
      </colgroup>
      <tbody>
      { Object.entries(step.data || {})
          .map(([label, { value }]) => {
            const sourceValue = get(source[label], 'value')
            return (
              <tr key={label}>
                <td className="text-nowrap">
                  <FormattedMessage
                    id={`DocumentReadingStep.fields.${label}`}
                    defaultMessage={humanize(underscore(label))}
                  />
                </td>
                <td>
                  { isEditable ? 
                    <EditableField label={label} value={sourceValue} onSubmit={onSubmit} />
                    : formatValue(label, value)
                  }
                </td>
              </tr>
            )
          }
      )}
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

export default function DocumentReadingStep({ step, source, onSubmit, isEditable=true }) {
  source = get(source, 'fields', {});
  
  if (step.error) {
    return <Error error={step.error} />
  }
  if (step.status === 200 && !step.error) {
    return <Success step={step} source={source} onSubmit={onSubmit} isEditable={isEditable} />
  }
}
