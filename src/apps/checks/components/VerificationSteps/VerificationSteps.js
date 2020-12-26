import { Box, Button, IconButton, Typography } from '@material-ui/core';
import { useConfirm, useOverlay } from 'apps/overlay';
import { useSelector } from 'react-redux';
import { difference, without } from 'lodash';
import { getDocumentList } from 'models/Document.model';
import React, { useCallback, useState } from 'react';
import { selectDenialUploadAvailability } from 'state/merchant/merchant.selectors';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { VerificationStepsModal } from '../VerificationStepsModal/VerificationStepsModal';
import { useStyles } from './VerificationSteps.styles';
import { DenyUploadRequirement } from '../../../configuration/containers/DenyUploadRequirement/DenyUploadRequirement';

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
  const [createOverlay, closeOverlay] = useOverlay();
  const confirm = useConfirm();
  const [availableDocumentTypes] = useState(getDocumentList());
  const isUploadDenyAvailable = useSelector(selectDenialUploadAvailability);

  const handleRemoveItem = useCallback(async (index) => {
    try {
      await confirm(intl.formatMessage({ id: 'confirm_string' }));
      onChange({ verificationSteps: removeItem(steps, index) });
    } catch (e) {
      // none, canceled
    }
  }, [confirm, intl, onChange, steps]);

  const onEditItem = useCallback((index) => {
    createOverlay(
      <VerificationStepsModal
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
  }, [createOverlay, onChange, availableDocumentTypes, closeOverlay, steps]);

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
                <IconButton size="small" onClick={() => handleRemoveItem(index)}>
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
      {isUploadDenyAvailable && (
        <Box mt={2} mr={6}>
          <DenyUploadRequirement />
        </Box>
      )}
    </Box>
  );
}
