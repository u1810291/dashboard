import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { useFormatMessage } from 'apps/intl';
import { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled } from './CustomWatchlistValidatedInputsError.styles';
import { selectCurrentCustomWatchlistErrorsFormated } from '../../state/CustomWatchlist.selectors';
import { ICustomWatchlistValidationErrorFormated, ValidatedInputsKeys } from '../../models/CustomWatchlist.models';

const ERRORS_LIMIT = 10;

export const CustomWatchlistValidatedInputsError = ({ inputValue }: {
  inputValue: ValidatedInputsKeys;
}) => {
  const formatMessage = useFormatMessage();
  const currentWatchlistErrors = useSelector(selectCurrentCustomWatchlistErrorsFormated);

  // TODO: @richvoronov errors should be splitted by type and fieldName
  const errors: ICustomWatchlistValidationErrorFormated[] | boolean = useMemo(() => currentWatchlistErrors && currentWatchlistErrors[inputValue]?.filter((_, index) => index < ERRORS_LIMIT), [inputValue, currentWatchlistErrors]);

  if (!errors) {
    return null;
  }

  // TODO: @richvoronov return must use cycle throught the type filed and filedName
  return (
    <AccordionStyled>
      <AccordionSummaryStyled
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${inputValue}-content`}
        id={`${inputValue}-header`}
      >
        <Typography>{formatMessage(`CustomWatchlist.settings.modal.validationFields.error.${errors[0].type}`, { messageValues: { count: errors.length } })}</Typography>
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        {errors.map((error, index) => (
          <Box key={`${error.systemField}-${index}`} mt={index !== 0 ? 1 : 0}>
            <Typography>
              {formatMessage('CustomWatchlist.settings.modal.validationFields.error.description', { messageValues: { count: error.row } })}
            </Typography>
          </Box>
        ))}
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};
