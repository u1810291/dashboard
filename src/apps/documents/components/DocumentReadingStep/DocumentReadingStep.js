import { Box, Button, Grid, InputLabel, Typography } from '@material-ui/core';
import { notification, SkeletonLoader } from 'apps/ui';
import Icon from 'assets/icon-document-edit.svg';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { humanize, underscore } from 'inflection';
import { normalizeDate } from 'lib/date';
import { difference } from 'lib/object';
import { formatValue } from 'lib/string';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { documentUpdate } from 'state/identities/identities.actions';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import { QATags } from '../../../../models/QA.model';
import { useStyles } from './DocumentReadingStep.styles';

export function DocumentReadingStep({ documentId, step, fields = [], identityId, isEditable, onReading }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditingMode, setIsEditingMode] = useState(false);

  if (step.error) {
    const message = intl.formatMessage({ id: 'DocumentReadingStep.error' }, {
      message: <span className="text-error">{step.error.message}</span>,
    });
    return (
      <Typography>{message}</Typography>
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
              normalizedData[key] = { value: normalizeDate(values[key]) };
            });
            await dispatch(documentUpdate(documentId, normalizedData));
            await dispatch(sendWebhook(identityId));
            notification.success(intl.formatMessage({ id: 'identities.details.webhook.success' }));
            setIsEditingMode(false);
          } catch (e) {
            console.error('webhook sending error', e);
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className={classes.wrapper} data-qa={QATags.Document.Change.Form}>
            {fields.map(({ id }) => {
              const valueLabel = intl.formatMessage({
                id: `identity.field.${id}`,
                defaultMessage: humanize(underscore(id)),
              });
              return (
                <Box mb={1.6} className={classes.editInputWrapper}>
                  <Field
                    name={id}
                    type="input"
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    disabled={false}
                  />
                  <InputLabel className={classes.editLabel}>
                    {valueLabel}
                  </InputLabel>
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
              <Typography className={classes.editableInput}>
                {/* <SkeletonLoader animation="wave" variant="text" /> */}
                {formatValue(id, value) || <Box component="span" color="common.red">{intl.formatMessage({ id: 'DocumentReadingStep.notParsed' })}</Box>}
              </Typography>
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
            <img src={Icon} alt="" />
            {intl.formatMessage({ id: 'DocumentReadingStep.btn.edit' })}
          </Button>
        </Box>
      )}
    </Grid>
  );
}
