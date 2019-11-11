import classNames from 'classnames';
import { Items } from 'components';
import { Content } from 'components/application-box';
import ConfigureColor from 'fragments/configuration/configure-color';
import Countries from 'fragments/configuration/countries';
import Logo from 'fragments/configuration/logo';
import { VerificationSteps } from 'fragments/configuration/verification-steps';
import BiometricStep from 'fragments/configuration/verification-steps/biometric-steps';
import React, { useEffect, useState } from 'react';
import { FiDroplet, FiEye, FiFileText, FiFlag, FiImage } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from 'state/countries/countries.actions';
import { saveConfiguration } from 'state/merchant/merchant.actions';
import { AVAILABLE_DOCUMENT_TYPES, COLOR_PRESETS } from 'state/merchant/merchant.model';
import CSS from './Configuration.module.scss';

export default function Configuration() {
  const { token } = useSelector(({ auth }) => auth);
  const configurations = useSelector(({ merchant }) => merchant.configurations);
  const { countries, isLoading } = useSelector((state) => state.countries);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();

  const updateConfiguration = (settings) => {
    dispatch(saveConfiguration(token, settings));
  };

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
            style={configurations.style}
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
        steps={configurations.verificationSteps}
        onChange={updateConfiguration}
      />,
    },
    {
      title: 'Product.configuration.biometric',
      icon: <FiEye />,
      body: <BiometricStep
        patterns={configurations.verificationPatterns}
        onChange={updateConfiguration}
      />,
    },
    {
      title: 'Product.configuration.logo',
      icon: <FiImage />,
      body: <Logo />,
    },
    {
      title: 'Product.configuration.country',
      icon: <FiFlag />,
      body: <Countries
        countries={countries}
        onSubmit={updateConfiguration}
        supportedCountries={configurations.supportedCountries}
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
