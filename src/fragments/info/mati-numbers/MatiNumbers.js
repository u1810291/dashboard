import React from 'react'
import { FormattedMessage } from 'react-intl'
import { times } from 'lodash'
import { Items, Text, H1 } from 'components'

export default function MatiNumbers() {
  return (
    <Items justifyContent="center" gap="12">
      {times(3).map(i => (
        <Items flow="row" gap={1}>
          <H1 color="active">
            <FormattedMessage id={`MatiNumbers.${i}.title`} />
          </H1>
          <Text color="active">
            <FormattedMessage id={`MatiNumbers.${i}.description`} />
          </Text>
        </Items>
      ))}
    </Items>
  )
}
