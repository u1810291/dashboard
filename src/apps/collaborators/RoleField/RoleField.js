import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, InputLabel, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useStyles } from './RoleField.styles';

export function RoleField({
  field,
  options,
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box>
      <InputLabel>
        {intl.formatMessage({ id: 'teamTable.invite.form.labels.role' })}
      </InputLabel>
      <RadioGroup name={field.name} value={Number(field.value)} onChange={field.onChange}>
        {options.map((role) => {
          const label = (
            <Box display="flex" pt={1} className={classes.image}>
              <Box width={40} height={40} color="textSecondary">
                {role.image}
              </Box>
              <Box ml={1}>
                <Box>
                  <Typography color="textPrimary" variant="subtitle2">{role.label}</Typography>
                </Box>
                <Box mt={1}>
                  <Typography variant="body2" className={classes.labelDescription}>
                    {role.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );

          return (
            <FormControlLabel
              className={classes.label}
              value={role.value}
              control={<Radio data-qa={role.qaTag} color="default" className={classes.radio} />}
              label={label}
              key={role.value}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
}
