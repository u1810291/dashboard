import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectMerchantBusinessName } from 'state/merchant/merchant.selectors';
import { selectUserEmail } from 'apps/user/state/user.selectors';

const isBeamerLoaded = React.createRef();

export function useBeamerScript() {
  const clientIdModel = useSelector(selectClientIdModel);
  const name = useSelector(selectMerchantBusinessName) || ' ';
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    /* eslint-disable camelcase */
    const user_id = clientIdModel?.value;
    const [user_firstname, user_lastname] = name.split(' ');
    const user_email = email;

    window.beamer_config = {
      product_id: process.env.REACT_APP_BEAMER_PRODUCT_ID,
      button_position: 'bottom-right',
      ...(user_id && {
        user_id,
        filter: 'registered',
      }),
      ...(user_firstname && { user_firstname }),
      ...(user_lastname && { user_lastname }),
      ...(user_email && { user_email }),
    };
    /* eslint-enable camelcase */
  }, [clientIdModel, email, name]);

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
