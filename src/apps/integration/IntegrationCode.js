import React from 'react';
import IntegrationCode from 'fragments/integration/integration-code';
import { useSelector } from 'react-redux';
import { oldCodeTemplate } from './codeTemplates';

const generateIntegrationCode = (codeTemplate, codeParameters = {}) => codeTemplate.replace(/%\w+%/g, (placeholder) => {
  const parameter = placeholder.slice(1, placeholder.length - 1);
  return codeParameters[parameter] || parameter;
});

const IntegrationCodePage = () => {
  const { clientId } = useSelector((state) => state.merchant.apps[0], []);
  const { color } = useSelector((state) => state.merchant.configuration.style, []);
  const buttonLink = process.env.REACT_APP_SDK_URL;
  const oldIntegrationCode = generateIntegrationCode(oldCodeTemplate, {
    clientId,
    buttonLink,
    color,
  });
  return (
    <IntegrationCode
      oldIntegrationCode={oldIntegrationCode}
    />
  );
};

export default IntegrationCodePage;
