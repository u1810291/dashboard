import { selectChartStatisticsModel } from 'apps/Analytics/state/Analytics.selectors';
import { selectCollaboratorCollection } from 'apps/collaborators/state/collaborator.selectors';
import { Loader } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIdentityIsPDFGenerating, selectIdentityModelWithExtras } from 'state/identities/identities.selectors';

/**
 * @return {null}
 */
export function DashboardLoader() {
  const statistics = useSelector(selectChartStatisticsModel); // analytic
  const identityModel = useSelector(selectIdentityModelWithExtras); // verification detail
  const collaboratorList = useSelector(selectCollaboratorCollection); // team settings
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);

  if (
    (!identityModel.isLoaded && identityModel.isLoading)
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
