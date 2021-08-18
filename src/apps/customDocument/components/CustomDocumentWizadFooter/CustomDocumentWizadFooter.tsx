import { Grid, Button } from '@material-ui/core';
import { isNil } from 'lib/isNil';
import React, { ReactNode } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useStyles } from './CustomDocumentWizadFooter.styles';

export function CustomDocumentWizadFooter({
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {!isNil(backTitle) ? (
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            type="button"
            onClick={onBack}
            className={classes.button}
          >
            <FiChevronLeft />
            {backTitle}
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={6}>
        {!isNil(forwardTitle) ? (
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
        ) : null}
      </Grid>
    </Grid>
  );
}
