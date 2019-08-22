import React from 'react';
import { useSelector } from 'react-redux';
import { Items } from '../../components';
import { MatiButton } from '../../components/mati-button';

import CSS from './Configuration.module.scss';

function redirectToIdentity({ identityId }) {
  this.props.history.push(`/verifications/${identityId}`)
}

export default function MatiButtonAside() {
  const { apps, configuration } = useSelector(s => s.merchant);

  return (
    <Items flow="row" gap={4} className={CSS.sidebar}>
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
    </Items>
  );
}
