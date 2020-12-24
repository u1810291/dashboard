import React, { useCallback } from 'react';
import { Box, Typography, FormHelperText, Switch } from '@material-ui/core';
import { BoxBordered } from 'apps/ui';

export function SwitchImageValidation({
  name,
  label,
  description,
  value,
  onChange,
}) {
  const handleChange = useCallback((_, checked) => {
    onChange(checked);
  }, [onChange]);

  return (
    <BoxBordered width="100%" display="flex" pt={2} pb={2}>
      <Switch
        name={name}
        color="primary"
        size="small"
        checked={value}
        onChange={handleChange}
      />
      <Box ml={1}>
        <FormHelperText variant="filled" component="div">
          <Typography variant="subtitle2">
            {label}
          </Typography>
          <Box mt={0.5}>
            {description}
          </Box>
        </FormHelperText>
      </Box>
    </BoxBordered>
  );
}
