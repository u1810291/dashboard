import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectMerchantBusinessName } from 'state/merchant/merchant.selectors';
import { selectUserEmail } from 'apps/user/state/user.selectors';

export function useBeamerScript() {
  const clientIdModel = useSelector(selectClientIdModel);
  const name = useSelector(selectMerchantBusinessName);
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    /* eslint-disable camelcase */
    if (window?.beamer_config) {
      const user_id = clientIdModel?.value;
      const [user_firstname, user_lastname] = name?.split(' ') || [];
      const user_email = email;

      window.beamer_config = {
        ...window.beamer_config,
        ...(user_id && { user_id }),
        ...(user_firstname && { user_firstname }),
        ...(user_lastname && { user_lastname }),
        ...(user_email && { user_email }),
      };
    }
    /* eslint-enable camelcase */
  }, [clientIdModel, email, name]);
}
