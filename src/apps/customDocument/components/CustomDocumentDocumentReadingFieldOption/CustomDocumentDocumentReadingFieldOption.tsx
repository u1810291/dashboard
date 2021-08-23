import { Grid, Box, Typography, TextField } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { isNil } from 'lib/isNil';
import { useDispatch, useSelector } from 'react-redux';
import { selectCustomDocumentDocumentReadingFieldOption, selectCustomDocumentDocumentEditedReadingFieldOption } from 'apps/customDocument/state/customDocument.selectors';
import { editCustomDocumentDocumentReadingFieldOption, updateCustomDocumentDocumentReadingFieldOption, updateCustomDocumentWizardStep } from 'apps/customDocument/state/customDocument.actions';
import { useIntl } from 'react-intl';
import { useStyles } from './CustomDocumentDocumentReadingFieldOption.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { CustomDocumentWizardStepTypes } from '../../models/customDocument.model';

export function CustomDocumentDocumentReadingFieldOption() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const option: string = useSelector(selectCustomDocumentDocumentReadingFieldOption);
  const edited: number | null = useSelector(selectCustomDocumentDocumentEditedReadingFieldOption);
  const isValid: boolean = useMemo(() => option?.length > 0, [option]);

  const handleUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentDocumentReadingFieldOption(value || null));
  }, [dispatch]);

  const handleDone = useCallback(() => {
    dispatch(editCustomDocumentDocumentReadingFieldOption(edited, option));
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingFieldSettings));
  }, [edited, option, dispatch]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingFieldSettings));
  }, [dispatch]);

  return (
    <Grid container justify="space-between" direction="column" className={classes.root}>
      <Grid item>
        <Box mb={2}>
          <Typography variant="h3">
            {intl.formatMessage({
              id: 'CustomDocuments.settings.addOption',
            })}
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          type="text"
          onChange={handleUpdate}
          value={option}
          placeholder={intl.formatMessage({ id: 'CustomDocuments.settings.addOption.placeholder' })}
          className={classes.input}
        />
      </Grid>
      <Grid item>
        <CustomDocumentWizadFooter
          onBack={handleBack}
          onForward={handleDone}
          canMoveForward={isValid}
          backTitle={intl.formatMessage({ id: 'CustomDocuments.settings.back' })}
          forwardTitle={isNil(edited) ? intl.formatMessage({ id: 'CustomDocuments.settings.add' }) : intl.formatMessage({ id: 'CustomDocuments.settings.done' })}
        />
      </Grid>
    </Grid>
  );
}
