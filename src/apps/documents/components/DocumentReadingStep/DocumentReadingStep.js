import { Box, Button, Grid, InputLabel, Typography } from '@material-ui/core';
import { DateInputField, notification, SkeletonLoader } from 'apps/ui';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { humanize, underscore } from 'inflection';
import { normalizeDate, addMissingZeros } from 'lib/date';
import { difference } from 'lib/object';
import { formatValue } from 'lib/string';
import { QATags } from 'models/QA.model';
import React, { useMemo, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { FieldsWithDate, EditedDateEmptyField } from 'models/Field.model';
import { useStyles } from './DocumentReadingStep.styles';

export function DocumentReadingStep({ documentType, step, fields = [], identityId, isEditable, onReading, onDocumentUpdate }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const firstFieldWithNoDataExtracted = useMemo(() => {
    const fieldIndex = fields.findIndex(({ value }) => value === null);
    return fieldIndex < 0 ? Number.MAX_SAFE_INTEGER : fieldIndex;
  }, [fields]);
  const firstEmptyDataField = useMemo(() => {
    const fieldIndex = fields.findIndex(({ id, value }) => FieldsWithDate.includes(id) && value?.replace('-', '').length < 8);
    return fieldIndex < 0 ? Number.MAX_SAFE_INTEGER : fieldIndex;
  }, [fields]);
  const firstAutoFocusField = useMemo(() => Math.min(firstEmptyDataField, firstFieldWithNoDataExtracted), [firstEmptyDataField, firstFieldWithNoDataExtracted]);

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
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.id] = field.value;
    });
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const diff = difference(values, initialValues);
            // update only changed fields
            const normalizedData = {};
            Object.keys(diff).forEach((key) => {
              if (FieldsWithDate.includes(key)) {
                // set -- that error 'The data was not extracted' is not shown
                const fixedDateString = addMissingZeros(values[key]) || EditedDateEmptyField;
                normalizedData[key] = { value: normalizeDate(fixedDateString) };
                return;
              }
              normalizedData[key] = { value: normalizeDate(values[key]) };
            });
            if (onDocumentUpdate) {
              await onDocumentUpdate(normalizedData, documentType);
            }
            await dispatch(sendWebhook(identityId));
            notification.success(intl.formatMessage({ id: 'identities.details.webhook.success' }));
            setIsEditingMode(false);
          } catch (e) {
            console.error('webhook sending error', e);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.wrapper} data-qa={QATags.Document.Change.Form}>
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
                        onChange={setFieldValue}
                        dateString={values[id]}
                        fieldId={id}
                        autoFocus={orderId === 0 || orderId === firstAutoFocusField}
                      />
                      <Typography className={classes.editLabel}>{valueLabel}</Typography>
                    </>
                  ) : (
                    <>
                      <Field
                        name={id}
                        type="input"
                        variant="outlined"
                        fullWidth
                        component={TextField}
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
          </Form>
        )}
      </Formik>
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

    </Grid>
  );
}
