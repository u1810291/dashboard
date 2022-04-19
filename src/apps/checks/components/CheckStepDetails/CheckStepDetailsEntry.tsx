import Box from '@material-ui/core/Box';
import { useFormattedValue } from 'lib/formatValue.hook';
import React from 'react';
import classnames from 'classnames';
import { ImageContainer } from 'apps/media';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './CheckStepDetails.styles';
import { ChecksWithImage, ICheckStepDetailsEntry } from '../../models/checks.model';

const CheckStepDetailsImage = (label: string, value: string) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center">
      <ImageContainer src={value} className={classes.groupImage} alt={label} />
    </Box>
  );
};

export function CheckStepDetailsEntry({ label, value, isMarkedAsFailed = false, isCentered = false }: ICheckStepDetailsEntry) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const formatted = useFormattedValue(label, value, ChecksWithImage, CheckStepDetailsImage);
  if (!label) return null;
  return (
    <Box className={classnames(classes.item, { [classes.centeredItem]: isCentered })}>
      <Box mb={0.4} className={classnames(classes.value, { [classes.failed]: isMarkedAsFailed })}>{formatted}</Box>
      <Box className={classes.label}>
        {formatMessage(`identity.field.${label}`, { defaultMessage: label })}
      </Box>
    </Box>
  );
}
