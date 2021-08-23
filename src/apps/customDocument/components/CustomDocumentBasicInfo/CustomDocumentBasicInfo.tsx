import { Grid, Typography, TextareaAutosize, Select, MenuItem, TextField } from '@material-ui/core';
import { inputCustomDocumentValidationChecksDefaultValue } from 'apps/imageValidation/models/imageValidation.model';
import { isNil } from 'lib/isNil';
import cloneDeep from 'lodash/cloneDeep';
import { CustomDocumentResponse } from 'models/CustomDocument.model';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FiChevronDown } from 'react-icons/fi';
import { useStyles } from './CustomDocumentBasicInfo.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { CustomDocumentPageTypes, CustomDocumentWizardStepTypes, getNumberOfPages, TEXT_DETECTION_RELEASE } from '../../models/customDocument.model';
import { updateCustomDocumentModal, updateCustomDocumentWizardStep } from '../../state/customDocument.actions';
import { selectEditedCustomDocument, selectCustomDocumentModal } from '../../state/customDocument.selectors';

export function CustomDocumentBasicInfo() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const edited: number = useSelector(selectEditedCustomDocument);
  const customDocument: Partial<CustomDocumentResponse> = useSelector(selectCustomDocumentModal);
  const isNewCustomDocument: boolean = useMemo(() => isNil(edited), [edited]);
  const numberOfPages: CustomDocumentPageTypes = useMemo(() => getNumberOfPages(customDocument), [customDocument]);

  const isInvalidData: boolean = useMemo(() => {
    const regexp = new RegExp('^[a-zA-Z0-9$@$!%*?&#^-_. +]+$');
    return !(customDocument?.name?.length > 0 && customDocument?.name?.length <= 32 && regexp.test(customDocument?.name))
      || !(customDocument?.description?.length > 0 && customDocument?.description?.length <= 128)
      || !(customDocument?.type?.length > 7 && customDocument?.type?.length <= 32);
  }, [customDocument]);

  const handleUpdateName = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentModal({ name: value || null }));
  }, [dispatch]);

  const handleUpdateType = useCallback(({ target: { value } }) => {
    if (!(value as string).startsWith('custom-') || ((value as string).length < 7)) {
      dispatch(updateCustomDocumentModal({ type: 'custom-' }));
      return;
    }

    dispatch(updateCustomDocumentModal({ type: value || null }));
  }, [dispatch]);

  const handleUpdateDescription = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentModal({ description: value || null }));
  }, [dispatch]);

  const handleUpdateNumberOfPages = useCallback(({ target: { value } }) => {
    if (value === CustomDocumentPageTypes.Many) {
      dispatch(updateCustomDocumentModal({
        pages: 0,
        isSingleFile: true,
        example: null,
        inputValidationChecks: TEXT_DETECTION_RELEASE ? cloneDeep(inputCustomDocumentValidationChecksDefaultValue) : undefined,
      }));
      return;
    }

    if (value === CustomDocumentPageTypes.Two) {
      dispatch(updateCustomDocumentModal({
        pages: 2,
        isSingleFile: false,
        example: null,
      }));
      return;
    }

    dispatch(updateCustomDocumentModal({
      pages: 1,
      isSingleFile: false,
      example: null,
    }));
  }, [dispatch]);

  const onDone = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.MediaUpload));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({ id: 'CustomDocuments.settings.title' })}
      </Typography>

      <Grid container spacing={3} className={classes.contentHolder}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.documentName',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.documentName.subtitle',
            })}
          </Typography>

          <TextField
            variant="outlined"
            onChange={handleUpdateName}
            type="text"
            value={customDocument?.name || ''}
            className={classes.input}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.documentName.placeholder',
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.numberOfPages',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.numberOfPages.subtitle',
            })}
          </Typography>
          <Select
            className={classes.select}
            disableUnderline
            onChange={handleUpdateNumberOfPages}
            value={numberOfPages}
            IconComponent={FiChevronDown}
          >
            <MenuItem value={CustomDocumentPageTypes.One}>
              {intl.formatMessage({
                id: `CustomDocuments.settings.numberOfPages.${CustomDocumentPageTypes.One}`,
              })}
            </MenuItem>
            <MenuItem value={CustomDocumentPageTypes.Two}>
              {intl.formatMessage({
                id: `CustomDocuments.settings.numberOfPages.${CustomDocumentPageTypes.Two}`,
              })}
            </MenuItem>
            <MenuItem value={CustomDocumentPageTypes.Many}>
              {intl.formatMessage({
                id: `CustomDocuments.settings.numberOfPages.${CustomDocumentPageTypes.Many}`,
              })}
            </MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.userDescription',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.userDescription.subtitle',
            })}
          </Typography>

          <TextareaAutosize
            onChange={handleUpdateDescription}
            value={customDocument?.description || ''}
            rowsMax={3}
            rowsMin={3}
            className={classes.textarea}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.userDescription.placeholder',
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.variableName',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.variableName.subtitle',
            })}
          </Typography>

          <TextField
            variant="outlined"
            onChange={handleUpdateType}
            value={customDocument?.type || ''}
            type="text"
            className={classes.input}
            disabled={!isNewCustomDocument}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.variableName.placeholder',
            })}
          />
        </Grid>
      </Grid>

      <CustomDocumentWizadFooter
        onForward={onDone}
        canMoveForward={!isInvalidData}
        forwardTitle={intl.formatMessage({ id: 'CustomDocuments.settings.continue' })}
      />

    </>
  );
}
