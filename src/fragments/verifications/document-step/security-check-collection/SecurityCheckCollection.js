import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import {
  Items,
  HelpMessage,
  QuestionMark,
} from 'components';
import {
  Box,
} from '@material-ui/core';
import { createOverlay } from 'components/overlay';

function showHelpMessage(id) {
  createOverlay(<HelpMessage id={id} />);
}

function getStepStatus(id, error, status) {
  if (status === 200) {
    return error ? 'failure' : 'success';
  }
  return 'checking';
}

const SecurityCheckCollection = ({ steps = [] }) => {
  const intl = useIntl();

  return (
    <Items flow="row" gap={1}>
      { steps.map(({ id, error, status }) => (
        <Box display="flex" key={id}>
          <Box whiteSpace="nowrap" flex="0 0 190px">
            { intl.formatMessage({ id: `SecurityCheckStep.${id}.title` }) }
            <QuestionMark onClick={() => showHelpMessage(id)} />
          </Box>
          <Box flex="1 1 auto">
            <Box className={error ? 'text-error' : 'text-normal'}>
              { intl.formatMessage({ id: `SecurityCheckStep.${id}.${getStepStatus(id, error, status)}` }) }
            </Box>
          </Box>
        </Box>
      ))}
    </Items>
  );
};

export default SecurityCheckCollection;

SecurityCheckCollection.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({})),
};

SecurityCheckCollection.defaultProps = {
  steps: [],
};
