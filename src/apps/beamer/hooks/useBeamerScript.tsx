/* eslint-disable camelcase */
// noinspection JSConstantReassignment

import { selectUserEmail, selectUserFirstName, selectUserId, selectUserLastName, selectUserRegistrationDate } from 'apps/user/state/user.selectors';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectClientId, selectMerchantBusinessName, selectMerchantId } from 'state/merchant/merchant.selectors';
import { NamesByRoles } from 'models/Collaborator.model';
import { useRole } from 'apps/collaborators';
import { BeamerScriptUrl, BeamerSelectorId, BeamerWindow } from '../models/Beamer.model';

declare const window: BeamerWindow;

const isBeamerLoaded = React.createRef();

window.beamer_config = window.beamer_config || {
  product_id: process.env.REACT_APP_BEAMER_PRODUCT_ID,
  button: false,
  selector: BeamerSelectorId,
  standalone: true,
  bounce: false,
};

export function useBeamerScript() {
  const client_id = useSelector(selectClientId);
  const user_id = useSelector(selectUserId);
  const merchant_id = useSelector(selectMerchantId);
  const businessName = useSelector(selectMerchantBusinessName);
  const email = useSelector(selectUserEmail);
  const user_created_at = useSelector(selectUserRegistrationDate);
  const userFirstName = useSelector(selectUserFirstName) || ' ';
  const userLastName = useSelector(selectUserLastName) || ' ';
  const role = useRole();
  const user_role = useMemo(() => NamesByRoles[role], [role]);

  const [user_firstname, ...otherNames] = businessName ? businessName.split(' ') : [userFirstName, userLastName];
  // If we send an empty lastname, the beamer will generate it automatically
  const user_lastname = otherNames.join(' ') || ' ';

  useEffect(() => {
    if (!window.beamer_config.product_id) {
      return () => {};
    }

    const prevConfig = window.beamer_config;

    const user_email = `${email}${user_role ? ` | ${user_role}` : ''}`;
    const filter = ['registered', user_role].filter(Boolean).join(';');

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
      ...(user_role && { user_role }),
    };

    return () => {
      window.beamer_config = prevConfig;
    };
  }, [client_id, merchant_id, businessName, user_created_at, user_id, user_firstname, user_lastname, email, user_role]);

  useEffect(() => {
    if (!isBeamerLoaded.current) {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.onload = () => {
        // @ts-ignore
        isBeamerLoaded.current = true;
      };
      script.defer = true;
      script.src = BeamerScriptUrl;
      head.appendChild(script);
    }
  }, []);
}
