import { Box } from '@material-ui/core';
import { HelpMessage, Items, QuestionMark } from 'components';
import { createOverlay } from 'components/overlay';
import { getStepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';

function showHelpMessage(id) {
  createOverlay(<HelpMessage id={id} />);
}

export function SecurityCheckCollection({ steps = [] }) {
  const intl = useIntl();

  return (
    <Items flow="row" gap={1}>
      {steps.map(({ id, error, status }) => (
        <Box display="flex" key={id}>
          <Box whiteSpace="nowrap" flex="0 0 190px">
            {intl.formatMessage({ id: `SecurityCheckStep.${id}.title` })}
            <QuestionMark onClick={() => showHelpMessage(id)} />
          </Box>
          <Box flex="1 1 auto">
            <Box className={error ? 'text-error' : 'text-normal'}>
              {intl.formatMessage({
                id: `SecurityCheckStep.${id}.${getStepStatus(status, error)}`,
              })}
            </Box>
          </Box>
        </Box>
      ))}
    </Items>
  );
}
