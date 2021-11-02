import React from 'react';
import { useIntl } from 'react-intl';
import { Box, RadioGroup, FormControlLabel, Radio, InputLabel, Typography } from '@material-ui/core';
import { CollaboratorOption, CollaboratorRoles } from 'models/Collaborator.model';
import { ReactComponent as ImgAgent } from '../assets/modal-role-agent.svg';
import { useStyles } from './RoleField.styles';

export function RoleField({ name, value, onChange, options }: {
  name: string;
  value: CollaboratorRoles;
  onChange: () => void;
  options: CollaboratorOption[];
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box>
      <InputLabel>
        {intl.formatMessage({ id: 'teamTable.invite.form.labels.role' })}
      </InputLabel>
      <RadioGroup name={name} value={Number(value)} onChange={onChange}>
        {options.map((role) => (
          <FormControlLabel
            className={classes.label}
            value={role.value}
            control={<Radio data-qa={role.qaTag} color="default" className={classes.radio} />}
            label={(
              <Box display="flex" pt={1} className={classes.image}>
                <Box width={40} height={40} color="textSecondary">
                  {/* @ts-ignore */}
                  {role.icon ? <role.icon style={role.value === CollaboratorRoles.AUDITOR ? { marginTop: -4 } : null} /> : <ImgAgent />}
                </Box>
                <Box ml={1}>
                  <Box>
                    <Typography color="textPrimary" variant="subtitle2">{intl.formatMessage({ id: role.label })}</Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body2" className={classes.labelDescription}>
                      {intl.formatMessage({ id: role.description })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              )}
            key={role.value}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
