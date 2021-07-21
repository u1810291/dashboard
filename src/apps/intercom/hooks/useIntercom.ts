/* eslint-disable camelcase */
import { selectUserEmail, selectUserFullName, selectUserId, selectUserRegistrationDate } from 'apps/user/state/user.selectors';
import { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsOwnerModel, selectLanguage, selectMerchantBusinessName, selectMerchantCreatedAt, selectMerchantId } from 'state/merchant/merchant.selectors';

interface IntercomWindow extends Window{
    intercomSettings: any;
    Intercom: any;
  }

declare const window: IntercomWindow;

// For the Intercom widget script initialization
window.intercomSettings = {
  app_id: process.env.REACT_APP_INTERCOM_APP_ID,
};

// integration: https://www.intercom.com/help/en/articles/170-integrate-intercom-in-a-single-page-app
export function useIntercom() {
  const isIntercomLoaded = useRef(false);
  const isUserBooted = useRef(false);
  const history = useHistory();

  const user_id = useSelector(selectUserId);
  const merchant_id = useSelector(selectMerchantId);
  const merchant_name = useSelector(selectMerchantBusinessName);
  const merchant_created_at = useSelector(selectMerchantCreatedAt);
  const email = useSelector(selectUserEmail);
  const user_created_at = useSelector(selectUserRegistrationDate);
  const name = useSelector(selectUserFullName) || ' ';
  const ownerModel = useSelector(selectIsOwnerModel);
  const language_override = useSelector(selectLanguage);
  const user_role = useMemo(() => {
    if (!ownerModel.isLoading && ownerModel.isLoaded) {
      return ownerModel.value ? 'admin' : 'agent';
    }
    return null;
  },
  [ownerModel.isLoaded, ownerModel.isLoading, ownerModel.value]);

  // https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-data-attributes
  // https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-mapping-of-javascript-attributes-to-intercom-dashboard-and-api
  // https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-company-object
  const intercomSettings = useMemo(() => ({
    // required
    app_id: process.env.REACT_APP_INTERCOM_APP_ID,

    // standard
    ...(user_id && { user_id }),
    ...(email && { email }),
    ...(name && { name }),
    ...(user_created_at && { created_at: user_created_at }),
    ...(merchant_id && {
      company: {
        id: merchant_id,
        created_at: merchant_created_at,
        name: merchant_name,
      },
    }),
    ...(language_override && { language_override }),

    // custom
    ...(merchant_id && { merchant_id }),
    ...(user_role && { user_role }),
  }), [user_id, email, name, user_created_at, merchant_id, merchant_name, user_role, language_override, merchant_created_at]);

  useEffect(() => {
    if (window.Intercom) {
      window.Intercom('reattach_activator');
      isIntercomLoaded.current = true;
    } else if (!isIntercomLoaded.current && user_id) {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.onload = () => { isIntercomLoaded.current = true; };
      script.async = true;
      script.src = `https://widget.intercom.io/widget/${process.env.REACT_APP_INTERCOM_APP_ID}`;
      head.appendChild(script);
    }
  }, [user_id]);

  useEffect(() => {
    if (isIntercomLoaded.current && !isUserBooted.current) {
      window.Intercom('boot', intercomSettings);
      isUserBooted.current = true;
    }
  }, [intercomSettings]);

  useEffect(() => {
    if (isIntercomLoaded.current && isUserBooted.current) {
      window.Intercom('update', intercomSettings);
    }
  }, [intercomSettings]);

  // To trigger a ping for new messages
  useEffect(() => {
    if (isIntercomLoaded.current && isUserBooted.current) {
      window.Intercom('update', {
        ...intercomSettings,
        last_request_at: parseInt(`${(new Date()).getTime() / 1000}`, 10),
      });
    }
  }, [intercomSettings, history.location]);
}
