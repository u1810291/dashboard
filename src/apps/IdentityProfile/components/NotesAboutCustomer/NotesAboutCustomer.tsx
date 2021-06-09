import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, Grid, IconButton } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { FiEdit } from 'react-icons/fi';
import { useStyles } from './NotesAboutCustomer.styles';

export interface NotesAboutCustomerProps {
  notes: string,
  onSubmit: (text: string) => void
}

export function NotesAboutCustomer({ notes, onSubmit }) {
  const intl = useIntl();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [bufferedNote, setBufferedNote] = useState(notes);
  const visibleText = isEditing ? bufferedNote : notes;

  const handleChangeNote = useCallback(({ target }) => {
    if (target) {
      setBufferedNote(target?.value);
    }
  }, []);

  const handleSwitchEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  useEffect(() => setBufferedNote(notes), [notes]);

  useEffect(() => {
    if (!isEditing && notes !== bufferedNote) {
      onSubmit(bufferedNote);
    }
  }, [bufferedNote, isEditing, notes, onSubmit]);

  return (
    <Box>
      <Grid container justify="space-between" alignItems="center">
        <Box color="common.black90" fontWeight="bold">
          {intl.formatMessage({ id: 'IdentityProfile.label.notes' })}
        </Box>
        <IconButton className={classes.button} size="small" onClick={handleSwitchEditing}>
          <FiEdit />
        </IconButton>
      </Grid>
      <TextField className={classes.field} multiline type="text" disabled={!isEditing} value={visibleText} onChange={handleChangeNote} />
    </Box>
  );
}
