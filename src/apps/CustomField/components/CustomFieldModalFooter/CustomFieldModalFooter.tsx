import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { isNil } from 'lib/isNil';
import React, { ReactNode } from 'react';
import { useStyles } from './CustomFieldModalFooter.styles';

export function CustomFieldModalFooter({
  onForward,
  onBack,
  forwardTitle = null,
  backTitle = null,
  canMoveForward = true,
}: {
  onForward?: () => void;
  onBack?: () => void;
  forwardTitle?: ReactNode;
  backTitle?: ReactNode;
  canMoveForward?: boolean;
}) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={6}>
        {!isNil(backTitle) && (
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            type="button"
            onClick={onBack}
            className={classes.button}
          >
            {backTitle}
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        {!isNil(forwardTitle) && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="button"
            onClick={onForward}
            disabled={!canMoveForward}
            className={classes.button}
          >
            {forwardTitle}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
