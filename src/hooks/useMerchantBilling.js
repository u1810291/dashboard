import { useSelector } from 'react-redux';

export default () => {
  const merchant = useSelector((state) => state.merchant);

  const hasProvider = merchant.billing.providers.length;
  const isPlanActivated = merchant.billing.planDetails.activatedAt
    && merchant.billing.planDetails.plan;

  return {
    hasProvider,
    isPlanActivated,
  };
};
