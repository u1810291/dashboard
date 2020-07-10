import { Box, Divider, Grid, Hidden } from '@material-ui/core';
import { FacematchConfiguration } from 'apps/facematch';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiTrash, FiUser } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountriesModel } from 'state/countries/countries.selectors';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { BiometricStep } from '../BiometricStep/BiometricStep';
import { ConfigureColor } from '../ConfigureColor/ConfigureColor';
import { Countries } from '../Countries/Countries';
import { GdprSettings } from '../GdprSettings/GdprSettings';
import { GovChecks } from '../GovChecks/GovChecks';
import { Logo } from '../Logo/Logo';
import { VerificationSteps } from '../VerificationSteps/VerificationSteps';
import { ButtonMenu, useStyles } from './Configuration.styles';

export function Configuration() {
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
      {
        id: 'facematch',
        title: 'Product.configuration.facematch',
        icon: <FiUser />,
        body: <FacematchConfiguration />,
      },
    ]);
  }, [countriesModel, currentFlowModel, updateConfiguration]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="stretch">
        {/* menu */}
        <Grid item xs={false} md={5}>
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
                  <Hidden xsDown>
                    <FormattedMessage id={item.title} />
                  </Hidden>
                </ButtonMenu>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* divider */}
        <Hidden smUp>
          <Grid item xs={false}>
            <Divider orientation="vertical" />
          </Grid>
        </Hidden>
        {/* content */}
        <Grid item xs md={7}>
          {flowSteps[active] && flowSteps[active].body}
        </Grid>
      </Grid>
    </Box>
  );
}
