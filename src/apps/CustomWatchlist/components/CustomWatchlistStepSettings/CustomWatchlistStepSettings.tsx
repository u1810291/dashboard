import { Box, Button, Grid, IconButton } from '@material-ui/core';
import { DocumentSelect } from 'apps/documentVerification/components/DocumentSelect/DocumentSelect';
import { useOverlay } from 'apps/overlay';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { DocumentListOrdered, DocumentTypes } from 'models/Document.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStyles } from './CustomWatchlistStepSettings.styles';

export interface CustomWatchlistSettingsProps{
  steps: DocumentTypes[][];
  onUpdate: (steps: DocumentTypes[][]) => void;
}

export function CustomWatchlistStepSettings({ steps, onUpdate }: CustomWatchlistSettingsProps) {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const lastStepNumber = steps?.length;
  const [checkedDocuments, setCheckedDocuments] = useState<DocumentTypes[]>([]);

  const handleSubmitStep = useCallback((stepIndex: number) => (checked: DocumentTypes[]) => {
    if (!steps || !checked) {
      return;
    }

    const newSteps = cloneDeep(steps);
    newSteps[stepIndex] = checked;
    onUpdate(newSteps);
    closeOverlay();
  }, [closeOverlay, onUpdate, steps]);

  const handleChangeStep = useCallback((stepIndex: number) => () => {
    createOverlay(<DocumentSelect variant={stepIndex === lastStepNumber ? 'add' : 'change'} unavailable={checkedDocuments} checked={steps[stepIndex]} onSubmit={handleSubmitStep(stepIndex)} />);
  }, [createOverlay, lastStepNumber, checkedDocuments, steps, handleSubmitStep]);

  const handleDeleteStep = useCallback((stepIndex: number) => () => {
    const newSettings = cloneDeep(steps);
    if (!steps) {
      return;
    }

    newSettings.splice(stepIndex, 1);
    onUpdate(newSettings);
  }, [onUpdate, steps]);

  useEffect(() => {
    setCheckedDocuments(steps?.flat());
  }, [steps]);

  return (
    <Box>
      {steps?.map((step, stepIndex) => (
        <Box className={classes.wrapper} p={2} mb={2} key={stepIndex}>
          <Box mb={2}>
            <Grid container wrap="nowrap" alignItems="center">
              <Box color="common.black90" fontWeight="bold" mr={1}>
                {intl.formatMessage({ id: 'DocumentVerification.settings.CustomWatchlist.title' }, { count: stepIndex + 1 })}
              </Box>
              <Box ml="auto" flexShrink={0}>
                <IconButton className={classNames(classes.button, classes.buttonEdit)} onClick={handleChangeStep(stepIndex)}>
                  <FiEdit size={17} />
                </IconButton>
                <IconButton className={classNames(classes.button, classes.buttonTrash)} onClick={handleDeleteStep(stepIndex)}>
                  <FiTrash2 size={17} />
                </IconButton>
              </Box>
            </Grid>
          </Box>
          <Box>
            {step?.map((documentType, documentTypeIndex) => (
              <React.Fragment key={documentType}>
                <Box color="common.black75" fontWeight="bold">
                  {intl.formatMessage({ id: `flow.documentTypeStep.${documentType}` })}
                </Box>
                {documentTypeIndex + 1 !== step?.length && (
                  <Box my={1} color="common.black75">
                    {intl.formatMessage({ id: 'DocumentVerification.settings.CustomWatchlist.or' })}
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      ))}
      {checkedDocuments?.length < DocumentListOrdered.length && (
      <Button className={classes.buttonAdd} onClick={handleChangeStep(lastStepNumber)} color="primary" variant="outlined">
        <FiPlus size={12} />
        {intl.formatMessage({ id: 'DocumentVerification.settings.button.addStep' }, { count: steps?.length + 1 })}
      </Button>
      )}
    </Box>
  );
}
