import PropTypes from 'prop-types';
import { Card, Click, H2, Items, Text } from 'components';
import { camelCase } from 'lodash';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CSS from './CustomPlan.module.scss';

export default function CustomPlan({ name, current, onClick }) {
  const intl = useIntl();
  return (
    <Card
      padding="2/4"
      border={current ? 'blue' : 'transparent'}
      flow="column"
      align="center"
      className={CSS.block}
    >
      <Items flow="row">
        <H2>{name}</H2>
        <Text>
          <FormattedMessage
            id={`PricingPlans.${camelCase(name)}.description`}
          />
        </Text>
      </Items>

      <Click border="active" onClick={onClick}>
        <Text color="active">
          {intl.formatMessage({ id: current ? 'PricingPlans.currentPlan' : 'PricingPlans.contactUs' })}
        </Text>
      </Click>
    </Card>
  );
}

CustomPlan.propTypes = {
  onClick: PropTypes.func.isRequired,
  current: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

CustomPlan.defaultProps = {
  current: false,
};
