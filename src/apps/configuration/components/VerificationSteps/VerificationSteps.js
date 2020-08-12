import { Box, Button, IconButton, Typography } from '@material-ui/core';
import confirm from 'components/confirm';
import { closeOverlay, createOverlay } from 'components/overlay';
import { difference, without } from 'lodash';
import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { getDocumentList } from 'models/Document.model';
import VerificationStepModal from '../VerificationStepsModal/VerificationStepsModal';
import { useStyles } from './VerificationSteps.styles';

export function removeItem(steps, index) {
  const updatedSteps = [...steps];
  updatedSteps.splice(index, 1);
  return updatedSteps;
}

export function replaceItem(steps, index, values) {
  const updatedSteps = [...steps];
  updatedSteps[index] = values;
  return updatedSteps;
}

export function addItem(steps, values) {
  const updatedSteps = [...steps];
  updatedSteps.push(values);
  return updatedSteps;
}

export function accessibleItems(available, steps, index) {
  return difference(available, ...without(steps, steps[index]));
}

export function VerificationSteps({ steps = [], onChange }) {
  const intl = useIntl();
  const classes = useStyles();
  const [availableDocumentTypes] = useState(getDocumentList());

  const onRemoveItem = async (index) => {
    try {
      await confirm(intl.formatMessage({ id: 'confirm_string' }));
      onChange({ verificationSteps: removeItem(steps, index) });
    } catch (e) {
      // none, canceled
    }
  };

  const onEditItem = (index) => {
    createOverlay(
      <VerificationStepModal
        values={index !== undefined ? steps[index] : []}
        items={accessibleItems(
          availableDocumentTypes,
          steps,
          index,
        )}
        onSave={(values) => {
          closeOverlay();
          onChange({
            verificationSteps:
              index !== undefined
                ? replaceItem(steps, index, values)
                : addItem(steps, values),
          });
        }}
      />,
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.documentTypeStep.title' })}
      </Typography>

      {steps.map((step, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6" color="primary" gutterBottom>
            {intl.formatMessage({ id: 'flow.documentTypeStep.stepNo' })}
            {' - '}
            {index + 1}
          </Typography>

          <Box display="flex" mt={1}>
            {/* step list */}
            <Box flexGrow={1}>
              {step.sort().map((item) => (
                <Box key={item} className={classes.value}>
                  <Typography variant="body1" gutterBottom>
                    {intl.formatMessage({ id: `flow.documentTypeStep.${item}` })}
                  </Typography>
                </Box>
              ))}
            </Box>
            {/* actions */}
            <Box flexGrow={0} display="flex" ml={1} alignItems="center">
              <IconButton size="small" color="primary" onClick={() => onEditItem(index)}>
                <FiEdit2 />
              </IconButton>
              <Box ml={1}>
                <IconButton size="small" onClick={() => onRemoveItem(index)}>
                  <FiTrash2 className="color-red" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {difference(availableDocumentTypes, ...steps).length > 0 && (
        <Box mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={() => onEditItem()}
            disabled={difference(availableDocumentTypes, ...steps).length === 0}
          >
            {intl.formatMessage({ id: 'flow.documentTypeStep.button.title' })}
          </Button>
        </Box>
      )}
    </Box>
  );
}
