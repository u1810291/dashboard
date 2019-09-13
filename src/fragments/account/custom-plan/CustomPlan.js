import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { camelCase } from 'lodash';
import { Card, Items, Text, H2, Click } from 'components';

export default function CustomPlan({ name, current, onClick }) {
  return (
    <Card
      padding="2/4"
      border={current ? 'blue' : 'transparent'}
      flow="column"
      autoColumns="1fr max-content"
      align="center"
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
          <FormattedMessage
            id={current ? 'PricingPlans.currentPlan' : 'PricingPlans.contactUs'}
          />
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
