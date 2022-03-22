import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState, useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { Modal } from 'apps/overlay';
import { IdentityStatus, getIdentityStatusLabel } from 'models/Status.model';
import { useStyles } from './VerificationStatusChangeDialog.styles';

export function VerificationStatusChangeDialog({ onSubmit, onCancel, from, to }: {
    onSubmit: (note: string) => void;
    onCancel: () => void;
    from: IdentityStatus;
    to: IdentityStatus;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const [note, setNote] = useState<string>('');

  const handleNoteChange = (event) => setNote(event.target.value);

  const handleSubmit = () => onSubmit(note.trim());

  const fromStatus = useMemo(() => <Box component="span" color={from?.color}>{formatMessage(getIdentityStatusLabel(from.id))}</Box>, [formatMessage, from]);
  const toStatus = useMemo(() => <Box component="span" color={to?.color}>{formatMessage(getIdentityStatusLabel(to.id))}</Box>, [formatMessage, to]);
  const subtitle = useMemo(() => formatMessage(
    'VerificationStatusChangeDialog.subtitle',
    {
      messageValues: {
        from: fromStatus,
        to: toStatus,
      },
    },
  ), [fromStatus, toStatus, formatMessage]);

  return (
    <Modal className={classes.modal}>
      <FormControl className={classes.control}>
        <Box mb={1} color="common.black90" fontWeight="bold" fontSize={18}>
          {formatMessage('VerificationStatusChangeDialog.title')}
        </Box>
        <Box mb={2} color="common.black75">
          {subtitle}
        </Box>
        <Box mb={2} color="common.black75">{formatMessage('VerificationStatusChangeDialog.description')}</Box>
        <Box mb={3} className={classes.wrapper}>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            rows={5}
            placeholder={formatMessage('VerificationStatusChangeDialog.placeholder')}
            value={note}
            onChange={handleNoteChange}
            className={classes.input}
          />
        </Box>
        <Box mt="auto" textAlign="right">
          <Button className={classes.button} variant="outlined" size="small" color="primary" onClick={onCancel}>
            {formatMessage('cancel')}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
            disabled={!note}
          >
            {formatMessage('VerificationStatusChangeDialog.changeStatus')}
          </Button>
        </Box>
      </FormControl>
    </Modal>
  );
}
