/* eslint-disable camelcase */
import { selectUserEmail, selectUserFirstName, selectUserId, selectUserLastName, selectUserRegistrationDate, selectUserType } from 'apps/user/state/user.selectors';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectClientId, selectMerchantBusinessName, selectMerchantId } from 'state/merchant/merchant.selectors';

const isBeamerLoaded = React.createRef();

window.beamer_config = window.beamer_config || {
  product_id: process.env.REACT_APP_BEAMER_PRODUCT_ID,
  button_position: 'bottom-right',
};

export function useBeamerScript() {
  const client_id = useSelector(selectClientId);
  const user_id = useSelector(selectUserId);
  const merchant_id = useSelector(selectMerchantId);
  const businessName = useSelector(selectMerchantBusinessName);
  const user_email = useSelector(selectUserEmail);
  const user_created_at = useSelector(selectUserRegistrationDate);
  const userType = useSelector(selectUserType);
  const userFirstName = useSelector(selectUserFirstName) || ' ';
  const userLastName = useSelector(selectUserLastName) || ' ';

  const [user_firstname, ...otherNames] = businessName ? businessName.split(' ') : [userFirstName, userLastName];
  // If we send an empty lastname, the beamer will generate it automatically
  const user_lastname = otherNames.join(' ') || ' ';

  useEffect(() => {
    if (!window.beamer_config.product_id) {
      return () => {};
    }

    const prevConfig = window.beamer_config;

    const filter = ['registered', userType].filter(Boolean).join(';');

    window.beamer_config = {
      ...window.beamer_config,
      ...(user_id && {
        user_id,
        filter,
      }),
      ...(client_id && { client_id }),
      ...(user_created_at && { user_created_at }),
      ...(merchant_id && { merchant_id }),
      ...(user_firstname && { user_firstname }),
      ...(user_lastname && { user_lastname }),
      ...(user_email && { user_email }),
    };

    return () => {
      window.beamer_config = prevConfig;
    };
  }, [client_id, merchant_id, businessName, userType, user_created_at, user_email, user_id, user_firstname, user_lastname]);

  useEffect(() => {
    if (!isBeamerLoaded.current) {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.onload = () => { isBeamerLoaded.current = true; };
      script.defer = true;
      script.src = 'https://app.getbeamer.com/js/beamer-embed.js';
      head.appendChild(script);
    }
  }, []);
}
