import { Grid, Typography } from '@material-ui/core';
import Text from 'components/text';
import TextEditable from 'components/text-editable';
import { humanize, underscore } from 'inflection';
import { normalizeDate } from 'lib/date';
import { formatValue } from 'lib/string';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { patchDocument } from 'state/identities/identities.actions';

const EditableField = ({ label, value, onSubmit }) => (value
  ? (
    <Text weight={4}>
      <TextEditable
        text={formatValue(label, value)}
        onSubmit={onSubmit}
        error={false}
        isEditing={false}
      />
    </Text>
  )
  : (
    <Text weight={2} color="gray">
      <TextEditable />
    </Text>
  ));

export default function DocumentReadingStep({ identityId, documentId, step, fields = {}, isEditable = true }) {
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleSubmit = useCallback((key, value) => {
    dispatch(patchDocument(identityId, documentId, {
      [key]: {
        value: normalizeDate(value),
      },
    }));
  }, [dispatch, identityId, documentId]);

  if (step.error) {
    const message = intl.formatHTMLMessage({ id: 'DocumentReadingStep.error' }, {
      message: step.error.message,
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
      {Object.entries(fields).map(([label, { value }]) => {
        const valueLabel = intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: humanize(underscore(label)),
        });

        return (
          <Grid container item spacing={2} alignItems="center" key={label}>
            <Grid xs={5} item>
              <Typography>{valueLabel}</Typography>
            </Grid>
            <Grid xs={7} item>
              {isEditable
                ? (
                  <EditableField
                    label={label}
                    value={value}
                    onSubmit={(newValue) => handleSubmit(label, newValue)}
                  />
                )
                : formatValue(label, value)}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
