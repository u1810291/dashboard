import CSS from 'apps/verification-history/VerificationHistory.module.scss';
import Card from 'components/card/Card';
import Text from 'components/text';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export function ExampleCard({ icon, labelId, link }) {
  return (
    <Link to={{ pathname: link }}>
      <Card border="lightergray" className={CSS.demoCard}>
        <Text align="center">{icon}</Text>
        <Text size={3} color="blue">
          <FormattedMessage id={`verificationDemo.${labelId}.label`} />
        </Text>
      </Card>
    </Link>
  );
}

ExampleCard.propTypes = {
  icon: PropTypes.node.isRequired,
  labelId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
