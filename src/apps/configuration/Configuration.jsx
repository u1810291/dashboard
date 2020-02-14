import classNames from 'classnames';
import { Items } from 'components';
import { Content } from 'components/application-box';
import { ConfigureColor } from 'fragments/configuration/configure-color/ConfigureColor';
import Countries from 'fragments/configuration/countries';
import { GdprSettings } from 'fragments/configuration/gdpr-settings';
import { GovChecks } from 'fragments/configuration/gov-checks';
import { Logo } from 'fragments/configuration/logo/Logo';
import { VerificationSteps } from 'fragments/configuration/verification-steps';
import BiometricStep from 'fragments/configuration/verification-steps/biometric-steps';
import React, { useCallback, useEffect, useState } from 'react';
import { FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiTrash, FiCheckCircle } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from 'state/countries/countries.actions';
import { configurationUpdate } from 'state/merchant/merchant.actions';
import { selectConfigurationModel } from 'state/merchant/merchant.selectors';
import CSS from './Configuration.module.scss';

export default function Configuration() {
  const { countries, isLoading } = useSelector((state) => state.countries);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const cfgModel = useSelector(selectConfigurationModel);
  const [flowSteps, setFlowSteps] = useState([]);

  const updateConfiguration = useCallback((settings) => dispatch(configurationUpdate(settings)), [dispatch]);

  useEffect(() => {
    dispatch(getCountries());
  }, [countries.length, dispatch]);

  useEffect(() => {
    if (cfgModel.isLoaded) {
      setFlowSteps([
        {
          title: 'Product.configuration.buttonsColor',
          icon: <FiDroplet />,
          body: (
            <div id="buttonColor">
              <ConfigureColor />
            </div>
          ),
        },
        {
          title: 'Product.configuration.verification',
          icon: <FiFileText />,
          body: <VerificationSteps
            steps={cfgModel.value.verificationSteps}
            onChange={updateConfiguration}
          />,
        },
        {
          title: 'Product.configuration.biometric',
          icon: <FiEye />,
          body: <BiometricStep
            patterns={cfgModel.value.verificationPatterns}
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
            supportedCountries={cfgModel.value.supportedCountries}
            isLoading={isLoading}
          />,
        },
        {
          title: 'Product.configuration.gdpr',
          icon: <FiTrash />,
          body: <GdprSettings />,
        },
        {
          title: 'Product.configuration.govChecks',
          icon: <FiCheckCircle />,
          body: <GovChecks />,
        },
      ]);
    }
  }, [countries, isLoading, cfgModel, updateConfiguration]);

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
          {flowSteps[active] && flowSteps[active].body}
        </Items>
      </Items>
    </Content>
  );
}
