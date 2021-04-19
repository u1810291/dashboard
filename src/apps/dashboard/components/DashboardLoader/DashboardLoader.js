import { selectStatistics } from 'apps/analytics/state/metrics.selectors';
import { selectCollaboratorCollection } from 'apps/collaborators/state/collaborator.selectors';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIdentityIsPDFGenerating, selectIdentityModelWithExtras } from 'state/identities/identities.selectors';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { Loader } from '../Loader/Loader';

/**
 * @return {null}
 */
export function DashboardLoader() {
  const statistics = useSelector(selectStatistics); // analytic
  const identityModel = useSelector(selectIdentityModelWithExtras); // verification detail
  const merchantFlowList = useSelector(selectMerchantFlowsModel); // verification flows
  const collaboratorList = useSelector(selectCollaboratorCollection); // team settings
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);

  if (
    (!identityModel.isLoaded && identityModel.isLoading)
    || (!merchantFlowList.isLoaded && merchantFlowList.isLoading)
    || (!collaboratorList.isLoaded && collaboratorList.isLoading)
    || (!statistics[2] && statistics[1])
    || isPDFGenerating
  ) {
    return (
      <Loader qa={QATags.Dashboard.Loader} />
    );
  }
  return null;
}
