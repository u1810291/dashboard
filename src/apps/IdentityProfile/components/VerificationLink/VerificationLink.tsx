import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { VerificationItem } from 'apps/ui';
import { Routes } from 'models/Router.model';

export interface VerificationLinkProps{
  date:string,
  id: string,
  status: any,
  isSelected: boolean,
  onSelect: (id: string) => void,
}

export function VerificationLink({ date, id, status, onSelect, isSelected }: VerificationLinkProps) {
  const { identityId } = useParams();
  const history = useHistory();

  const handleVerificationClick = useCallback(() => {
    onSelect(id);
    history.push(`${Routes.identity.profile.root}/${identityId}${Routes.identity.verification.root}/${id}`);
  }, [history, id, identityId, onSelect]);

  return (<VerificationItem onClick={handleVerificationClick} isSelected={isSelected} date={date} id={id} status={status} />);
}
