import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function SecurityCheckStep({ error, id }) {
  return (
    <span>
      <FormattedMessage
        id={`SecurityCheckStep.${id}`}
        values={{
          message: (
            <span className={error ? 'text-error' : 'text-success'}>
              <FormattedMessage
                id={`SecurityCheckStep.${id}.${error ? 'failure' : 'success'}`}
              />
            </span>
          ),
        }}
      />
    </span>
  );
}

SecurityCheckStep.propTypes = {
  error: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
};
