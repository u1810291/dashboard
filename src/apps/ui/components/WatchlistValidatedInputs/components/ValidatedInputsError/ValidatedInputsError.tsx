import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { useFormatMessage } from 'apps/intl';
import { IValidationErrorFormated, WatchlistValidatedInputsErrors, ValidatedInputsKeys, ERRORS_LIMIT } from '../../../../models/WatchlistValidatedInputs.model';
import { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled } from './ValidatedInputsError.styles';

export const ValidatedInputsError = ({ inputValue, errors }: {
  inputValue: ValidatedInputsKeys;
  errors: WatchlistValidatedInputsErrors;
}) => {
  const formatMessage = useFormatMessage();

  const validationErrors: IValidationErrorFormated[] | boolean = useMemo(() => errors && errors[inputValue]?.filter((_, index) => index < ERRORS_LIMIT), [inputValue, errors]);

  if (!validationErrors) {
    return null;
  }

  return (
    <AccordionStyled>
      <AccordionSummaryStyled
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${inputValue}-content`}
        id={`${inputValue}-header`}
      >
        <Typography>{formatMessage(`Watchlist.validationFields.error.${validationErrors[0].type}`, { messageValues: { count: validationErrors.length } })}</Typography>
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        {validationErrors.map((error, index) => (
          <Box key={`${error.systemField}-${index}`} mt={index !== 0 ? 1 : 0}>
            <Typography>
              {formatMessage('Watchlist.validationFields.error.description', { messageValues: { count: error.row } })}
            </Typography>
          </Box>
        ))}
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};
