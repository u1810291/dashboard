import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'apps/flowBuilder/components/Tabs/Tabs';
import { ProductIntegrationTypes } from 'models/Product.model';
import { QATags } from 'models/QA.model';
import { selectFlowBuilderIntegrationType } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { IntegrationAPI } from '../IntegrationAPI/IntegrationAPI';
import { IntegrationSDK } from '../IntegrationSDK/IntegrationSDK';

export function IntegrationType() {
  const integrationType = useSelector(selectFlowBuilderIntegrationType);
  const dispatch = useDispatch();

  const [tabs] = useState([
    {
      id: ProductIntegrationTypes.Sdk,
      label: 'FlowBuilder.integration.sdk',
      qa: QATags.FlowBuilder.Integration.API,
      body: <IntegrationSDK />,
    },
    {
      id: ProductIntegrationTypes.Api,
      label: 'FlowBuilder.integration.api',
      qa: QATags.FlowBuilder.Integration.API,
      body: <IntegrationAPI />,
    },
  ]);

  const handleTabChange = useCallback((value: string) => {
    dispatch(flowBuilderChangeableFlowUpdate({ integrationType: value as ProductIntegrationTypes }));
  }, [dispatch]);

  return <Tabs tabs={tabs} activeTab={integrationType} onChange={handleTabChange} />;
}
