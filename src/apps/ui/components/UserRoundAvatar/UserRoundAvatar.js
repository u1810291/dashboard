import { Grid } from '@material-ui/core';
import { getCollaboratorColorById } from 'models/Collaborator.model';
import React, { useState } from 'react';
import { useStyles } from './UserRoundAvatar.styles';

export function UserRoundAvatar({ uniqueId, name = ' ' }) {
  const classes = useStyles();
  const [color] = useState(getCollaboratorColorById(`${uniqueId}`));
  return (
    <Grid style={{ backgroundColor: color }} container alignItems="center" justify="center" className={classes.roundAvatar}>
      <Grid item>{`${name[0].toUpperCase()}`}</Grid>
    </Grid>
  );
}
