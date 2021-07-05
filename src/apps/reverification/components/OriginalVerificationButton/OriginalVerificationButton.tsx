import { ButtonHeaderMenu } from 'apps/ui';
import { Routes } from 'models/Router.model';
import { FiExternalLink } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './OriginalVerificationButton.styles';

export function OriginalVerificationButton({
  verification,
  identity,
}: {
  verification: string;
  identity: string;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const openIntialVerification = useCallback((): void => {
    history.push(`${Routes.identity.profile.root}/${identity}${Routes.identity.verification.root}/${verification}`);
  }, [history, identity, verification]);

  return (
    <ButtonHeaderMenu
      className={classes.originalVerificationButton}
      variant="contained"
      startIcon={<FiExternalLink />}
      onClick={openIntialVerification}
    >
      {intl.formatMessage({ id: 'ReVerification.result.initialVerification' })}
    </ButtonHeaderMenu>
  );
}
