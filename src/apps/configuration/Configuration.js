import { Box, Grid } from '@material-ui/core';
import { BiometricStep } from 'apps/configuration/components/VerificationSteps/biometric-steps/BiometricStep';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiTrash } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountriesModel } from 'state/countries/countries.selectors';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { ConfigureColor } from './components/ConfigureColor/ConfigureColor';
import { Countries } from './components/Countries';
import { GdprSettings } from './components/GdprSettings';
import { GovChecks } from './components/GovChecks';
import { Logo } from './components/Logo/Logo';
import { VerificationSteps } from './components/VerificationSteps';
import { ButtonMenu, useStyles } from './Configuration.styles';

export default function Configuration() {
  const [active, setActive] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentFlowModel = useSelector(selectCurrentFlow);
  const [flowSteps, setFlowSteps] = useState([]);
  const countriesModel = useSelector(selectCountriesModel);

  const updateConfiguration = useCallback((settings) => dispatch(configurationFlowUpdate(settings)), [dispatch]);

  useEffect(() => {
    setFlowSteps([
      {
        id: 'color',
        title: 'Product.configuration.buttonsColor',
        icon: <FiDroplet />,
        body: <ConfigureColor />,
      },
      {
        id: 'steps',
        title: 'Product.configuration.verification',
        icon: <FiFileText />,
        body: <VerificationSteps
          steps={currentFlowModel.verificationSteps}
          onChange={updateConfiguration}
        />,
      },
      {
        id: 'biometric',
        title: 'Product.configuration.biometric',
        icon: <FiEye />,
        body: <BiometricStep />,
      },
      {
        id: 'logo',
        title: 'Product.configuration.logo',
        icon: <FiImage />,
        body: <Logo />,
      },
      {
        id: 'country',
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
        id: 'gdpr',
        title: 'Product.configuration.gdpr',
        icon: <FiTrash />,
        body: <GdprSettings />,
      },
      {
        id: 'govChecks',
        title: 'Product.configuration.govChecks',
        icon: <FiCheckCircle />,
        body: <GovChecks />,
      },
    ]);
  }, [countriesModel, currentFlowModel, updateConfiguration]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={1} direction="row">
        {/* menu */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={1} direction="column">
            {flowSteps.map((item, index) => (
              <Grid item key={item.id}>
                <ButtonMenu
                  className={clsx({ active: index === active })}
                  fullWidth
                  variant="contained"
                  disableElevation
                  size="large"
                  startIcon={item.icon}
                  onClick={() => setActive(index)}
                >
                  <FormattedMessage id={item.title} />
                </ButtonMenu>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* content */}
        <Grid item xs={12} md={7}>
          {flowSteps[active] && flowSteps[active].body}
        </Grid>
      </Grid>
    </Box>
  );
}
