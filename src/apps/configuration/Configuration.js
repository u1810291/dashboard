import classNames from 'classnames';
import { Content, Items } from 'components';
import { BiometricStep } from 'apps/configuration/components/VerificationSteps/biometric-steps/BiometricStep';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiTrash } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { selectCountriesModel } from 'state/countries/countries.selectors';
import { Logo } from './components/Logo/Logo';
import { GovChecks } from './components/GovChecks';
import { GdprSettings } from './components/GdprSettings';
import { Countries } from './components/Countries';
import { VerificationSteps } from './components/VerificationSteps';
import { ConfigureColor } from './components/ConfigureColor/ConfigureColor';
import CSS from './Configuration.module.scss';

export default function Configuration() {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const currentFlowModel = useSelector(selectCurrentFlow);
  const [flowSteps, setFlowSteps] = useState([]);
  const countriesModel = useSelector(selectCountriesModel);

  const updateConfiguration = useCallback((settings) => dispatch(configurationFlowUpdate(settings)), [dispatch]);

  useEffect(() => {
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
          steps={currentFlowModel.verificationSteps}
          onChange={updateConfiguration}
        />,
      },
      {
        title: 'Product.configuration.biometric',
        icon: <FiEye />,
        body: <BiometricStep />,
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
          countries={countriesModel.value}
          onSubmit={updateConfiguration}
          supportedCountries={currentFlowModel.supportedCountries}
          isLoading={countriesModel.isLoading}
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
  }, [countriesModel, currentFlowModel, updateConfiguration]);

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
