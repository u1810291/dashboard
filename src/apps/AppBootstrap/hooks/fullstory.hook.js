import { selectUserEmail } from 'apps/user/state/user.selectors';
import { fullStoryOrgId, isProduction } from 'models/Environment.model';
import { MerchantTags } from 'models/Merchant.model';
import { createRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectClientId, selectMerchantBusinessName, selectMerchantId, selectMerchantTags } from 'state/merchant/merchant.selectors';

const fullStory = createRef();

export function useFullStory() {
  const merchantId = useSelector(selectMerchantId);
  const clientId = useSelector(selectClientId);
  const name = useSelector(selectMerchantBusinessName) || ' ';
  const email = useSelector(selectUserEmail);
  const tags = useSelector(selectMerchantTags);

  const shutdownFullstory = useCallback(() => {
    if (fullStory.current) {
      fullStory.current.shutdown();
      fullStory.current = null;
    }
  }, []);

  useEffect(() => {
    const fullStoryLoad = async () => {
      if (!fullStoryOrgId || !merchantId || tags.includes(MerchantTags.CanDisableFullstory)) {
        return;
      }

      const FullStory = await import('@fullstory/browser');

      if (!fullStory.current) {
        FullStory.init({ orgId: fullStoryOrgId, devMode: !isProduction });
      }

      fullStory.current = FullStory;
      fullStory.current.identify(clientId, {
        name,
        email,
        merchantId,
        from: 'dashboard',
      });
    };

    fullStoryLoad();
  }, [clientId, email, name, merchantId, tags]);

  return shutdownFullstory;
}
