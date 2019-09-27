import _ from 'lodash';
import { useSelector } from 'react-redux';

export default () => {
  const merchant = useSelector((state) => state.merchant);

  const providers = _.get(merchant, 'billing.providers', []);
  const hasProvider = providers.length;
  const isPlanActivated = _.get(merchant, 'billing.planDetails.activatedAt')
    && _.get(merchant, 'billing.planDetails.plan');

  return {
    hasProvider,
    isPlanActivated,
  };
};
