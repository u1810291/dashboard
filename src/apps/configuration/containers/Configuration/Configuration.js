import { Box, Divider, Grid, Hidden } from '@material-ui/core';
import { AgeCheckConfiguration } from 'apps/AgeCheck';
import { EmailValidationConfiguration } from 'apps/EmailValidation';
import { BiometricStep } from 'apps/biometrics';
import { VerificationSteps } from 'apps/checks';
import { Countries } from 'apps/countries';
import { FacematchConfiguration } from 'apps/facematch';
import { GdprSettings } from 'apps/gdpr';
import { ImageValidationConfiguration } from 'apps/imageValidation';
import { PhoneValidationConfiguration } from 'apps/PhoneValidation';
import { IpChecksConfiguration } from 'apps/IpChecks';
import { OldLogo } from 'apps/logo';
import { ButtonCollapsible } from 'apps/ui';
import { ConfigureColor } from 'apps/WebSDKPreview';
import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { FiAlertOctagon, FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiMail, FiSlash, FiTrash, FiUser, FiSmartphone, FiMapPin } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlow, selectMerchantTags } from 'state/merchant/merchant.selectors';

export function Configuration() {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const currentFlowModel = useSelector(selectCurrentFlow);
  const [flowSteps, setFlowSteps] = useState([]);
  const tags = useSelector(selectMerchantTags);

  const updateConfiguration = useCallback((settings) => dispatch(merchantUpdateFlow(settings)), [dispatch]);

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
        body: <OldLogo />,
      },
      {
        id: 'country',
        title: 'Product.configuration.country',
        icon: <FiFlag />,
        body: <Countries onSubmit={updateConfiguration} />,
      },
      {
        id: 'gdpr',
        title: 'Product.configuration.gdpr',
        icon: <FiTrash />,
        body: <GdprSettings />,
      },
      {
        id: 'facematch',
        title: 'Product.configuration.facematch',
        icon: <FiUser />,
        body: <FacematchConfiguration />,
      },
      {
        id: 'imageValidation',
        title: 'Product.configuration.imageValidation',
        icon: <FiAlertOctagon />,
        body: <ImageValidationConfiguration onChange={updateConfiguration} />,
      },
      {
        id: 'ageCheck',
        title: 'Product.configuration.ageCheck',
        icon: <FiSlash />,
        body: <AgeCheckConfiguration />,
      },
      {
        id: 'emailCheck',
        title: 'EmailValidation.title',
        icon: <FiMail />,
        body: <EmailValidationConfiguration />,
      },
      {
        id: 'phoneValidation',
        title: 'PhoneValidation.title',
        icon: <FiSmartphone />,
        body: <PhoneValidationConfiguration />,
      },
      {
        id: 'ipChecks',
        title: 'Product.configuration.ipCheck',
        icon: <FiMapPin />,
        body: <IpChecksConfiguration />,
      },
    ]);
  }, [currentFlowModel, updateConfiguration, tags]);

  return (
    <Box p={2}>
      <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="stretch">
        {/* menu */}
        <Grid item xs={false} md={5}>
          <Grid container spacing={1} direction="column">
            {flowSteps.filter(({ hidden }) => !hidden).map((item, index) => (
              <Grid item key={item.id}>
                <ButtonCollapsible
                  className={classnames({ active: index === active })}
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
                </ButtonCollapsible>
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
