import React from 'react';
import { useIntl } from 'react-intl';
import { Items, Card, Click, H3, Text } from 'components';
import Icons from './icons.png';

export default function EndToEndCompliance({ goToComplianceSection }) {
  const intl = useIntl();
  return (
    <Card border="lightgray" shadow="0">
      <Items align="center">
        <H3>{intl.formatMessage({ id: 'EndToEndCompliance.title' })}</H3>
        <img src={Icons} alt="End to End Compliance" />
      </Items>
      <Items flow="row">
        <p>
          {intl.formatMessage({ id: 'EndToEndCompliance.t1' })}
        </p>

        <p>
          {intl.formatMessage({ id: 'EndToEndCompliance.t2' })}
        </p>

        <Text color="active">
          <Click
            padding="0"
            hoverShadow={false}
            onClick={goToComplianceSection}
          >
            {intl.formatMessage({ id: 'EndToEndCompliance.cta' })}
          </Click>
        </Text>
      </Items>
    </Card>
  );
}
