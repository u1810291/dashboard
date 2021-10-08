import React, { useMemo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { FiEdit3 } from 'react-icons/fi';
import { humanize, underscore } from 'inflection';
import { Box, Button, Grid, InputLabel, TextField, Typography } from '@material-ui/core';
import { DateInputField, notification, SkeletonLoader } from 'apps/ui';
import { normalizeDate, addMissingZeros } from 'lib/date';
import { difference } from 'lib/object';
import { formatValue } from 'lib/string';
import { QATags } from 'models/QA.model';
import { FieldsWithDate, EditedDateEmptyField } from 'models/Field.model';
import { DocumentField, DocumentTypes } from 'models/Document.model';
import { IStep } from 'models/Step.model';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { WithAgent } from 'models/Collaborator.model';
import { useStyles } from './DocumentReadingStep.styles';

interface DocumentReadingStepInputs {
  [x: string]: any;
}

export function DocumentReadingStep({ documentType, step, fields = [], isEditable, onReading, onDocumentUpdate, identityId }: {
  documentType: DocumentTypes;
  step: IStep;
  fields: DocumentField[];
  isEditable: boolean;
  onReading: boolean;
  onDocumentUpdate: (normalizedData: any, documentType: DocumentTypes) => Promise<void>;
  identityId: string;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  const firstFieldWithNoDataExtracted = useMemo<number>(() => {
    const fieldIndex = fields.findIndex(({ value }) => value === null);
    return fieldIndex < 0 ? Number.MAX_SAFE_INTEGER : fieldIndex;
  }, [fields]);
  const firstEmptyDataField = useMemo<number>(() => {
    const fieldIndex = fields.findIndex(({ id, value }) => FieldsWithDate.includes(id) && value?.replace('-', '').length < 8);
    return fieldIndex < 0 ? Number.MAX_SAFE_INTEGER : fieldIndex;
  }, [fields]);
  const firstAutoFocusField = useMemo<number>(() => Math.min(firstEmptyDataField, firstFieldWithNoDataExtracted), [firstEmptyDataField, firstFieldWithNoDataExtracted]);

  const defaultValues = useMemo<DocumentReadingStepInputs>(() => fields.reduce((obj, field) => ({
    ...obj,
    [field.id]: field.value,
  }), {}), [fields]);

  const { register, handleSubmit, setValue, watch } = useForm<DocumentReadingStepInputs>({ defaultValues });
  const values = watch();

  const handleFormSubmit: SubmitHandler<DocumentReadingStepInputs> = useCallback(async (data) => {
    try {
      const diff = difference(data, defaultValues);
      // update only changed fields
      const normalizedData = {};
      Object.keys(diff).forEach((key) => {
        if (FieldsWithDate.includes(key)) {
          // set -- that error 'The data was not extracted' is not shown
          const fixedDateString = addMissingZeros(data[key]) || EditedDateEmptyField;
          normalizedData[key] = { value: normalizeDate(fixedDateString) };
          return;
        }
        normalizedData[key] = { value: normalizeDate(data[key]) };
      });
      if (onDocumentUpdate) {
        await onDocumentUpdate(normalizedData, documentType);
      }
      if (identityId) {
        await dispatch(sendWebhook(identityId));
      }
      notification.success(intl.formatMessage({ id: 'identities.details.webhook.success' }));
      setIsEditingMode(false);
    } catch (e) {
      console.error('webhook sending error', e);
    }
  }, [dispatch, defaultValues, documentType, identityId, intl, onDocumentUpdate]);

  if (step.error) {
    return (
      <Box className={classes.result} mb={2}>
        <Typography className={classes.resultTitle} variant="h4" gutterBottom>
          {intl.formatMessage({ id: 'DocumentReadingStep.error' })}
        </Typography>
      </Box>
    );
  }

  if (onReading) {
    const fieldsCount = Object.keys(step.data || {});

    return (
      <Grid container className={classes.inputsWrapper} justify="space-between">
        {fieldsCount.map((key) => (
          <Box className={classes.inputWrapper} key={key}>
            <Typography className={classes.editableInput}>
              <SkeletonLoader animation="wave" variant="text" />
            </Typography>
          </Box>
        ))}
      </Grid>
    );
  }

  if (isEditingMode) {
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.wrapper} data-qa={QATags.Document.Change.Form}>
        {fields.map(({ id }, orderId) => {
          const valueLabel = intl.formatMessage({
            id: `identity.field.${id}`,
            defaultMessage: humanize(underscore(id)),
          });
          return (
            <Box key={id} mb={1.6} className={classes.editInputWrapper}>
              {FieldsWithDate.includes(id) ? (
                <>
                  <DateInputField
                    onChange={setValue}
                    dateString={values[id]}
                    fieldId={id}
                    autoFocus={orderId === 0 || orderId === firstAutoFocusField}
                  />
                  <Typography className={classes.editLabel}>{valueLabel}</Typography>
                </>
              ) : (
                <>
                  <TextField
                    {...register(id)}
                    type="input"
                    variant="outlined"
                    fullWidth
                    disabled={false}
                    autoFocus={orderId === 0 || orderId === firstAutoFocusField}
                  />
                  <InputLabel className={classes.editLabel}>
                    {valueLabel}
                  </InputLabel>
                </>
              )}
            </Box>
          );
        })}
        <Grid container justify="space-between" className={classes.buttonWrapper}>
          <Button
            className={`${classes.button} ${classes.buttonHalf}`}
            type="submit"
            data-qa={QATags.Document.Change.Save}
          >
            {intl.formatMessage({ id: 'DocumentReadingStep.btn.save' })}
          </Button>
          <Button
            className={`${classes.button} ${classes.buttonHalf}`}
            onClick={() => setIsEditingMode(false)}
            data-qa={QATags.Document.Change.Cancel}
          >
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
        </Grid>
      </form>
    );
  }

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid container className={classes.inputsWrapper} justify="space-between">
        {fields.map(({ id, value }) => {
          const valueLabel = intl.formatMessage({
            id: `identity.field.${id}`,
            defaultMessage: humanize(underscore(id)),
          });

          return (
            <Box className={classes.inputWrapper} key={id}>
              {FieldsWithDate.includes(id) ? (
                <>
                  {formatValue(id, value)
                    ? (<DateInputField dateString={value} isEditable={false} />)
                    : (
                      <Typography className={classes.editableInput}>
                        <Box component="span" color="common.red">{intl.formatMessage({ id: 'DocumentReadingStep.notParsed' })}</Box>
                      </Typography>
                    )}
                </>
              ) : (
                <Typography className={classes.editableInput}>
                  {/* <SkeletonLoader animation="wave" variant="text" /> */}
                  {formatValue(id, value) || <Box component="span" color="common.red">{intl.formatMessage({ id: 'DocumentReadingStep.notParsed' })}</Box>}
                </Typography>
              )}
              <InputLabel className={classes.label}>
                {valueLabel}
              </InputLabel>
            </Box>
          );
        })}
      </Grid>

      <RoleRenderGuard roles={WithAgent}>
        {isEditable && (
          <Box className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              fullWidth
              onClick={() => setIsEditingMode(true)}
              data-qa={QATags.Document.Change.EditData}
            >
              <FiEdit3 />
              {intl.formatMessage({ id: 'DocumentReadingStep.btn.edit' })}
            </Button>
          </Box>
        )}
      </RoleRenderGuard>

    </Grid>
  );
}
