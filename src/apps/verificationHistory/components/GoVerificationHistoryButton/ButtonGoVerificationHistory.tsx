import ScheduleIcon from '@material-ui/icons/Schedule';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { Routes } from 'models/Router.model';
import { useHistory } from 'react-router-dom';
import { ButtonHeaderMenu } from 'apps/ui';
import { useIntl } from 'react-intl';

export interface ButtonGoVerificationHistoryProps {
  identityId: string;
  className?: string;
}

export function ButtonGoVerificationHistory({ identityId, className }: ButtonGoVerificationHistoryProps) {
  const history = useHistory();
  const intl = useIntl();
  const openVerificationHistory = useCallback(() => {
    if (identityId) {
      history.push(`${Routes.list.root}/${identityId}${Routes.list.history.root}`, { from: history.location.pathname + history.location.search });
    }
  }, [history, identityId]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      onClick={openVerificationHistory}
      startIcon={<ScheduleIcon />}
      data-qa={QATags.Verification.Buttons.History}
      className={className}
    >
      {intl.formatMessage({ id: 'VerificationHistory.button.pageHistory' })}
    </ButtonHeaderMenu>
  );
}
