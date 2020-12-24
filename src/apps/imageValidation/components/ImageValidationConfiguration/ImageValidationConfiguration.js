import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography, FormHelperText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SwitchImageValidation } from '../SwitchImageValidation/SwitchImageValidation';
import { selectValidationChecks } from '../../../../state/merchant/merchant.selectors';
import { validationChecksSerialize, InputValidationType, validationChecksParse } from '../../models/imageValidation.model';

export function ImageValidationConfiguration({ onChange }) {
  const intl = useIntl();
  const validationChecks = useSelector(selectValidationChecks);
  const [checks, setChecks] = useState(validationChecksParse(validationChecks));

  const handleGrayscaleChange = useCallback((checked) => {
    const values = {
      ...checks,
      [InputValidationType.GrayscaleImage]: checked,
    };

    setChecks(values);
    onChange({
      inputValidationChecks: validationChecksSerialize(values),
    });
  }, [onChange, checks]);

  const handleSimilarChange = useCallback((checked) => {
    const values = {
      ...checks,
      [InputValidationType.SimilarImages]: checked,
      [InputValidationType.IdenticalImages]: checked,
    };

    setChecks(values);
    onChange({
      inputValidationChecks: validationChecksSerialize(values),
    });
  }, [onChange, checks]);

  return (
    <>
      <Typography variant="h4">
        {intl.formatMessage({ id: 'Product.configuration.imageValidation' })}
      </Typography>
      <Box mt={1}>
        <FormHelperText component="div">
          <Typography>
            {intl.formatMessage({ id: 'Product.configuration.imageValidation.description' })}
          </Typography>
        </FormHelperText>
      </Box>
      <Box mt={1.5}>
        <SwitchImageValidation
          name="grayscaleImage"
          value={checks[InputValidationType.GrayscaleImage]}
          onChange={handleGrayscaleChange}
          label={intl.formatMessage({ id: 'Product.configuration.imageValidation.grayScale.label' })}
          description={intl.formatMessage({ id: 'Product.configuration.imageValidation.grayScale.description' })}
        />

        <Box mt={1}>
          <SwitchImageValidation
            name="similarPhoto"
            value={checks[InputValidationType.IdenticalImages]}
            onChange={handleSimilarChange}
            label={intl.formatMessage({ id: 'Product.configuration.imageValidation.similarPhoto.label' })}
            description={intl.formatMessage({ id: 'Product.configuration.imageValidation.similarPhoto.description' })}
          />
        </Box>
      </Box>
    </>
  );
}
