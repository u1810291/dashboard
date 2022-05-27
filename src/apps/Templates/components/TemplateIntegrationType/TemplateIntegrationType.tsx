import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'apps/WorkflowBuilder';
import { ProductIntegrationTypes } from 'models/Product.model';
import { QATags } from 'models/QA.model';
import { selectFlowBuilderIntegrationType } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { TemplateIntegrationAPI } from '../TemplateIntegrationAPI/TemplateIntegrationAPI';
import { TemplateIntegrationSDK } from '../TemplateIntegrationSDK/TemplateIntegrationSDK';

const tabs = [
  {
    id: ProductIntegrationTypes.Sdk,
    label: 'FlowBuilder.integration.sdk',
    qa: QATags.FlowBuilder.Integration.API,
    body: <TemplateIntegrationSDK />,
  },
  {
    id: ProductIntegrationTypes.Api,
    label: 'FlowBuilder.integration.api',
    qa: QATags.FlowBuilder.Integration.API,
    body: <TemplateIntegrationAPI />,
  },
];

export function TemplateIntegrationType() {
  const integrationType = useSelector(selectFlowBuilderIntegrationType);
  const dispatch = useDispatch();

  const handleTabChange = useCallback((value: string) => {
    dispatch(flowBuilderChangeableFlowUpdate({ integrationType: value as ProductIntegrationTypes }));
  }, [dispatch]);

  return <Tabs tabs={tabs} activeTab={integrationType} onChange={handleTabChange} />;
}
