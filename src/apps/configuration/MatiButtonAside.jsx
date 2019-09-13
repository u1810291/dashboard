import React from 'react';
import { useSelector } from 'react-redux';
import 'mati-button';
import { useIntl } from 'react-intl';
import { UsecaseModal } from 'fragments';
import {
  Click,
  Icons,
  Items,
  createOverlay,
} from 'components';

import { trackEvent } from 'lib/mixpanel';

import CSS from './Configuration.module.scss';

function showUsecaseModal() {
  trackEvent('merchant_clicked_videos_usecases');
  createOverlay(<UsecaseModal />);
}

export default function MatiButtonAside() {
  const { apps, configuration } = useSelector(({ merchant }) => merchant);
  const intl = useIntl();

  return (
    <Items flow="row" gap={2} className={CSS.sidebar}>
      <Items
        gap={0}
        align="center"
        justifyContent="center"
        className={CSS.matiButtonWrapper}
      >
        {
          (apps[0] && apps[0].clientId)
          && (
          <mati-button
            color={configuration.style.color}
            clientId={apps[0] && apps[0].clientId}
            language={configuration.style.language}
            apiHost={process.env.REACT_APP_API_URL}
            signupHost={process.env.REACT_APP_SIGNUP_URL}
          />
          )
        }
      </Items>
      <Click onClick={showUsecaseModal} background="active" shadow="2">
        <Icons.Play />
        { intl.formatMessage({ id: 'fragments.configuration.usecase-modal' }) }
      </Click>
    </Items>
  );
}
