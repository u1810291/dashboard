import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { MessageDescriptor, useFormatMessage } from 'apps/intl';
import { useStyles } from './CheckResultLogo.styles';
import { InfoTooltip } from '../InfoTooltip/InfoTooltip';

// TODO Remove newDesign option when all components will be remade

export function CheckResultLogo({ status, type = 'document', subtype = null, newDesign = false, resultDescriptor = null }: {
  status: unknown;
  type?: string;
  subtype?: unknown;
  newDesign?: boolean;
  resultDescriptor?: MessageDescriptor<string | number>;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles({ status, type });
  const subtypeKey = subtype ? `${subtype}.` : '';

  return (
    <Box className={classes.result}>
      <Typography className={newDesign ? classes.resultTitleNew : classes.resultTitle} variant="h4" gutterBottom>
        {formatMessage(`Checks.result.${type}.${status}.title`)}
        {newDesign && <InfoTooltip placement="right" title={formatMessage(`Checks.result.${type}.${status}.${subtypeKey}tooltip`)} />}
      </Typography>
      <Typography className={newDesign ? classes.resultTextNew : classes.resultText} variant="body1" gutterBottom>
        { formatMessage(`Checks.result.${type}.${status}.${subtypeKey}description`, resultDescriptor)}
      </Typography>
    </Box>
  );
}
