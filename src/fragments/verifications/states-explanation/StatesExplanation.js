import React from 'react';
import Card from 'components/card';
import { default as Text, HR } from 'components/text';
import { FormattedMessage } from 'react-intl'

import states from './config';

const InfoPanel = ({ data = states, color = 'gray' }) => {
  return <Card padding={1}>
    <div>
      {states.map(el =>
        <div key={el.id}>
          <Text color={el.labelColor} weight={4} size={3.25} lineHeight={1.6}>
            <FormattedMessage id={el.label} />
          </Text>
          <div>
            <Text color={color}>
              <FormattedMessage id={el.text} />
            </Text>
          </div>
          <HR width={0} margin={5} />
        </div>
      )}
    </div>
  </Card>
}

export default InfoPanel;