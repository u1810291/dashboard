import clsx from 'clsx';
import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import { difference, without } from 'lodash';
import { IconButton } from '@material-ui/core';
import { Button, Items, Text } from 'components';
import confirm from 'components/confirm';
import { closeOverlay, createOverlay } from 'components/overlay';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { AVAILABLE_DOCUMENT_TYPES } from 'state/merchant/merchant.model';
import VerificationStepModal from '../VerificationStepsModal';
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

export function accessibleItems(available, mandatory, steps, index) {
  return difference(available, mandatory, ...without(steps, steps[index]));
}

export function VerificationSteps({
  steps = [],
  mandatoryDocumentTypes = [],
  onChange = () => {},
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [availableDocumentTypes] = useState(AVAILABLE_DOCUMENT_TYPES);

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
          mandatoryDocumentTypes,
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
    <fieldset className="mgi-fieldset">
      <div className={classes.verificationSteps}>
        <Text size={3} weight={4}>
          {intl.formatMessage({ id: 'flow.documentTypeStep.title' })}
        </Text>
        {mandatoryDocumentTypes.map((doc, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <fieldset className="mgi-fieldset" key={index}>
            <legend className="text-active">
              {intl.formatMessage({ id: 'flow.documentTypeStep.stepNo' })}
              {' '}
              {index + 1}
            </legend>
            <Items templateColumns="minmax(auto, 100%) auto" justifyContent="start">
              {intl.formatMessage({ id: `flow.documentTypeStep.${doc}` })}
              <span className="text-secondary">
                {intl.formatMessage({ id: 'required' })}
              </span>
            </Items>
          </fieldset>
        ))}
        {steps.map((step, index) => (
          <div
            key={index} // eslint-disable-line react/no-array-index-key
            className={classes.verificationInfo}
          >
            <div className={clsx('text-active', [classes.docTitle])}>
              <Items templateColumns="minmax(auto, 100%) auto">
                <Text size={2} weight={4}>
                  {intl.formatMessage({ id: 'flow.documentTypeStep.stepNo' })}
                  {' - '}
                  {index + mandatoryDocumentTypes.length + 1}
                </Text>
              </Items>
            </div>
            <Items gap={1} align="center">
              <Items
                flow="row"
                gap={step.length > 1 ? 0 : 1}
                className={clsx({
                  docWrapper: step.length === 1,
                  docWrapperMany: step.length > 1,
                })}
              >
                {step.sort().map((doc) => (
                  <Items flow="row" key={doc} className="children">
                    <div className="child">
                      <Text>
                        {intl.formatMessage({ id: `flow.documentTypeStep.${doc}` })}
                      </Text>
                    </div>
                  </Items>
                ))}
              </Items>
              <Items flow="row" gap={1}>
                <Items flow="column">
                  <IconButton size="small" color="primary" onClick={() => onEditItem(index)}>
                    <FiEdit2 />
                  </IconButton>
                  <IconButton size="small" onClick={() => onRemoveItem(index)}>
                    <FiTrash2 className="color-red" />
                  </IconButton>
                </Items>
              </Items>
            </Items>
          </div>
        ))}
      </div>
      {difference(availableDocumentTypes, mandatoryDocumentTypes, ...steps).length > 0 && (
        <Button
          className={classes.newStep}
          onClick={() => onEditItem()}
          disabled={difference(availableDocumentTypes, mandatoryDocumentTypes, ...steps).length === 0}
          data-role="newVerificationStep"
        >
          {intl.formatMessage({ id: 'flow.documentTypeStep.button.title' })}
        </Button>
      )}
    </fieldset>
  );
}
