import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { TextFieldEditAdornment } from 'apps/ui';
import { selectUserId } from 'apps/user/state/user.selectors';
import { IVerificationChange } from 'models/History.model';
import { updateVerificationHistoryAgentNote } from '../../state/verificationHistory.actions';

export function VerificationHistoryAgentNote({ audit }: {
  audit: IVerificationChange;
}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [value, setValue] = useState<string>(audit?.agentNote || '');
  const [prevValue, setPrevValue] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleSave = useCallback(() => {
    setPrevValue(value);
    dispatch(updateVerificationHistoryAgentNote(audit?.identityId, audit?._id, value));
  }, [value, dispatch, audit]);

  const handleCancel = useCallback(() => {
    setValue(prevValue);
  }, [prevValue]);

  if (!audit?.updatedBy) {
    return null;
  }

  return (
    <TextFieldEditAdornment
      multiline
      value={value}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      isEditable={userId === audit?.updatedBy?._id}
    />
  );
}
