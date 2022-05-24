import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { TextFieldEditAdornment } from 'apps/ui';
import { selectUserId } from 'apps/user/state/user.selectors';
import { IVerificationChange, VerificationHistoryEventTypes } from 'models/History.model';
import { UserId } from 'models/Collaborator.model';
import { updateVerificationHistoryAgentNote } from '../../state/verificationHistory.actions';

export function VerificationHistoryAgentNote({ historyEvent }: {
  historyEvent: IVerificationChange;
}) {
  const dispatch = useDispatch();
  const userId = useSelector<any, UserId>(selectUserId);
  const [value, setValue] = useState<string>(historyEvent?.agentNote || '');
  const [prevValue, setPrevValue] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleSave = useCallback(() => {
    setPrevValue(value);
    dispatch(updateVerificationHistoryAgentNote(historyEvent?.identityId, new Date(historyEvent?.updatedAt).valueOf(), value));
  }, [value, dispatch, historyEvent]);

  const handleCancel = useCallback(() => {
    setValue(prevValue);
  }, [prevValue]);

  if (!historyEvent?.updatedBy || ![VerificationHistoryEventTypes.DocumentFieldsUpdated, VerificationHistoryEventTypes.StatusUpdated].includes(historyEvent?.eventType)) {
    return null;
  }

  return (
    <TextFieldEditAdornment
      multiline
      value={value}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      isEditable={userId === historyEvent?.updatedBy?._id}
    />
  );
}
