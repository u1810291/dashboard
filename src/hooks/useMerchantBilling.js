import { get } from 'lodash';
import { useSelector } from 'react-redux';

export default () => {
  const merchant = useSelector((state) => state.merchant);

  const providers = get(merchant, 'billing.providers', []);
  const hasProvider = providers.length;
  const isPlanActivated = get(merchant, 'billing.planDetails.activatedAt')
    && get(merchant, 'billing.planDetails.plan');

  return {
    hasProvider,
    isPlanActivated,
  };
};
