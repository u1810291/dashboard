import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { UsecaseModal } from 'fragments';
import {
  MatiButton,
  Click,
  Icons,
  Items,
  createOverlay
} from 'components';

import CSS from './Configuration.module.scss';


function redirectToIdentity({ identityId }) {
  this.props.history.push(`/verifications/${identityId}`);
}

function showUsecaseModal() {
  createOverlay(<UsecaseModal />)
}

export default function MatiButtonAside() {
  const { apps, configuration } = useSelector(s => s.merchant);
  const intl = useIntl();

  return (
    <Items flow="row" gap={2} className={CSS.sidebar}>
      <Items
        gap={0}
        align="center"
        justifyContent="center"
        className={CSS.matiButtonWrapper}
      >
        <MatiButton
          language={configuration.style.language}
          color={configuration.style.color}
          clientId={apps[0] && apps[0].clientId}
          onSuccess={redirectToIdentity}
        />
      </Items>
      <Click onClick={showUsecaseModal} background="active" shadow="2">
        <Icons.Play />
        { intl.formatMessage({ id: 'fragments.configuration.usecase-modal' }) }
      </Click>
    </Items>
  );
}
