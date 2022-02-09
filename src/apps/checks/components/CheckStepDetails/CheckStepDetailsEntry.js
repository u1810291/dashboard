import { Box } from '@material-ui/core';
import { useFormattedValue } from 'lib/formatValue.hook';
import React from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { PrivateImage } from 'apps/media';
import { useStyles } from './CheckStepDetails.styles';
import { ChecksWithImage } from '../../models/checks.model';

const CheckStepDetailsImage = (label, value) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center">
      <PrivateImage src={value} className={classes.groupImage} alt={label} />
    </Box>
  );
};

export function CheckStepDetailsEntry({ label, value, isMarkedAsFailed = false, isCentered = false }) {
  const classes = useStyles();
  const intl = useIntl();
  const formatted = useFormattedValue(label, value, ChecksWithImage, CheckStepDetailsImage);

  return (
    <Box key={label} className={classnames(classes.item, { [classes.centeredItem]: isCentered })}>
      <Box mb={0.4} className={classnames(classes.value, { [classes.failed]: isMarkedAsFailed })}>{formatted}</Box>
      <Box className={classes.label}>
        {intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: label,
        })}
      </Box>
    </Box>
  );
}
