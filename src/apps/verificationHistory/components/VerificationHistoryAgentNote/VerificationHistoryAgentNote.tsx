import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { TextFieldEditAdornment } from 'apps/ui';
import { selectUserId } from 'apps/user/state/user.selectors';
import { updateVerificationHistoryAgentNote } from '../../state/verificationHistory.actions';

export function VerificationHistoryAgentNote({ audit }: {
  audit: any;
}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [value, setValue] = useState(audit?.agentNote || '');
  const [prevValue, setPrevValue] = useState(value);

  const handleChange = (event) => setValue(event.target.value);

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
