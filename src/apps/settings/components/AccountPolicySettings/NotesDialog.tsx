import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ButtonStyled } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),

  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.palette.common.black90,
    marginBottom: theme.spacing(2.5),
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export function NotesDialog({ onSubmit, onReject }: {
  onSubmit: () => void;
  onReject: () => void;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Paper className={classes.root}>
      <Typography variant="body1" className={classes.title}>{formatMessage('Settings.accountPolicySettings.notesDialog.title')}</Typography>
      <ButtonStyled
        color="primary"
        size="large"
        variant="contained"
        className={classes.button}
        onClick={onSubmit}
      >
        {formatMessage('Settings.accountPolicySettings.notesDialog.button.yes')}
      </ButtonStyled>
      <ButtonStyled
        className={classes.button}
        color="common.black75"
        size="small"
        onClick={onReject}
      >
        {formatMessage('cancel')}
      </ButtonStyled>
    </Paper>
  );
}
