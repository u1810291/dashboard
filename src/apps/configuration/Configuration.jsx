import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { FiDroplet, FiEye, FiFileText, FiFlag } from 'react-icons/fi';
import classNames from 'classnames';

import { Content } from 'components/application-box';
import { Items } from 'components';
import {
  AVAILABLE_DOCUMENT_TYPES,
  COLOR_PRESETS,
  getMerchantApps,
  MANDATORY_DOCUMENT_TYPES,
  saveConfiguration,
} from 'state/merchant';
import { getCountries } from 'state/countries';
import ConfigureColor from 'fragments/configuration/configure-color';
import VerificationSteps from 'fragments/configuration/verification-steps';
import Countries from 'fragments/configuration/countries';

import CSS from './Configuration.module.scss';

export default function Configuration() {
  const { token } = useSelector(({ auth }) => auth);
  const { apps, configuration } = useSelector(({ merchant }) => merchant);
  const { countries, isLoading } = useSelector((state) => state.countries);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();

  const updateConfiguration = (settings) => {
    dispatch(
      saveConfiguration(token, settings),
    );
  };

  useEffect(() => {
    dispatch(
      getMerchantApps(token),
    );
  }, [token, apps.length, dispatch]);

  useEffect(() => {
    dispatch(
      getCountries(token),
    );
  }, [token, countries.length, dispatch]);

  const flowSteps = [
    {
      title: 'Product.configuration.buttonsColor',
      icon: <FiDroplet />,
      body: (
        <div id="buttonColor">
          <ConfigureColor
            presets={COLOR_PRESETS}
            style={configuration.style}
            onClick={updateConfiguration}
          />
        </div>
      ),
    },
    {
      title: 'Product.configuration.verification',
      icon: <FiFileText />,
      body: <VerificationSteps
        availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
        mandatoryDocumentTypes={MANDATORY_DOCUMENT_TYPES}
        steps={configuration.verificationSteps}
        patterns={configuration.verificationPatterns}
        onChange={updateConfiguration}
      />,
    },
    {
      title: 'Product.configuration.biometric',
      icon: <FiEye />,
      body: <VerificationSteps
        bio
        availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
        mandatoryDocumentTypes={MANDATORY_DOCUMENT_TYPES}
        steps={configuration.verificationSteps}
        patterns={configuration.verificationPatterns}
        onChange={updateConfiguration}
      />,
    },
    {
      title: 'Product.configuration.country',
      icon: <FiFlag />,
      body: <Countries
        countries={countries}
        onSubmit={updateConfiguration}
        supportedCountries={configuration.supportedCountries}
        isLoading={isLoading}
      />,
    },
  ];

  return (
    <Content fullwidth={false} className={CSS.content}>
      <Items gap={0} justifyContent="left">
        <ul className={CSS.list}>
          {flowSteps.map((step, index) => (
            <li
              key={step.title}
              className={classNames({
                [CSS.active]: index === active,
              })}
            >
              <Items
                gap={0}
                align="center"
                justifyContent="left"
                onClick={() => setActive(index)}
              >
                {step.icon}
                <FormattedMessage id={step.title} />
              </Items>
            </li>
          ))}
        </ul>
        <Items>
          {flowSteps[active].body}
        </Items>
      </Items>
    </Content>
  );
}
