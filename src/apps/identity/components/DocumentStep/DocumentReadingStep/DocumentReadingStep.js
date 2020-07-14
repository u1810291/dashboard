import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { humanize, underscore } from 'inflection';
import { Grid, Typography } from '@material-ui/core';
import { documentUpdate } from 'state/identities/identities.actions';
import { normalizeDate } from 'lib/date';
import { formatValue } from 'lib/string';
import TextEditable from 'components/text-editable';
import Text from 'components/text';

// TODO @dkchv: refactor this
function EditableField({ label, value, isValid, onSubmit }) {
  if (!value) {
    return (
      <Text weight={2} color="gray">
        <TextEditable onSubmit={onSubmit} />
      </Text>
    );
  }

  return (
    <Text weight={4}>
      <TextEditable
        text={formatValue(label, value)}
        onSubmit={onSubmit}
        isValid={isValid}
        error={false}
        isEditing={false}
      />
    </Text>
  );
}

export function DocumentReadingStep({ documentId, step, fields = [], isEditable = true }) {
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleSubmit = useCallback((key, value) => {
    dispatch(documentUpdate(documentId, {
      [key]: {
        value: normalizeDate(value),
      },
    }));
  }, [dispatch, documentId]);

  if (step.error) {
    const message = intl.formatMessage({ id: 'DocumentReadingStep.error' }, {
      message: <span className="text-error">{step.error.message}</span>,
    });
    return (
      <Typography>{message}</Typography>
    );
  }

  if (step.status !== 200) {
    return null;
  }

  return (
    <Grid container spacing={1} direction="column">
      {fields.map(({ id, value, isValid }) => {
        const valueLabel = intl.formatMessage({
          id: `identity.field.${id}`,
          defaultMessage: humanize(underscore(id)),
        });

        return (
          <Grid container item spacing={2} alignItems="center" key={id}>
            <Grid xs={5} item>
              <Typography>{valueLabel}</Typography>
            </Grid>
            <Grid xs={7} item>
              {isEditable
                ? (
                  <EditableField
                    isValid={isValid}
                    label={id}
                    value={value}
                    onSubmit={(newValue) => handleSubmit(id, newValue)}
                  />
                )
                : formatValue(id, value)}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
