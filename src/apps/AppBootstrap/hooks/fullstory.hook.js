import { selectUserEmail } from 'apps/user/state/user.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectClientId, selectMerchantBusinessName, selectMerchantId } from 'state/merchant/merchant.selectors';
import { fullStoryOrgId, isProduction } from 'models/Environment.model';

export function useFullStory() {
  const merchantId = useSelector(selectMerchantId);
  const clientId = useSelector(selectClientId);
  const name = useSelector(selectMerchantBusinessName) || ' ';
  const email = useSelector(selectUserEmail);
  const [isInited, setIsInited] = useState(false);

  useEffect(() => {
    const fullStoryLoad = async () => {
      if (!fullStoryOrgId) {
        return;
      }

      const FullStory = await import('@fullstory/browser');
      if (!isInited) {
        FullStory.init({ orgId: fullStoryOrgId, devMode: !isProduction });
        setIsInited(true);
      }
      FullStory.identify(clientId, {
        name,
        email,
        merchantId,
        from: 'dashboard',
      });
    };

    fullStoryLoad();
  },
  [clientId, email, name, merchantId, isInited]);
}
