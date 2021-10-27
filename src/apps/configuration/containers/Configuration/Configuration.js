import { Box, Divider, Grid, Hidden } from '@material-ui/core';
import { AgeCheckConfiguration } from 'apps/AgeCheck';
import { EmailValidationConfiguration } from 'apps/EmailValidation';
import { CustomDocumentConfiguration } from 'apps/customDocument';
import { BiometricStep } from 'apps/biometrics';
import { VerificationSteps } from 'apps/checks';
import { Countries } from 'apps/countries';
import { FacematchConfiguration } from 'apps/facematch';
import { GdprSettings } from 'apps/gdpr';
import { ImageValidationConfiguration } from 'apps/imageValidation';
import { PhoneValidationConfiguration } from 'apps/PhoneValidation';
import { IpChecksConfiguration } from 'apps/IpChecks';
import { ESignatureConfiguration } from 'apps/ESignature';
import { OldLogo } from 'apps/logo';
import { ButtonCollapsible, BoxBordered, Warning, WarningSize, WarningTypes } from 'apps/ui';
import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { FiAlertOctagon, FiDroplet, FiEye, FiFileText, FiFlag, FiImage, FiMail, FiSlash, FiTrash, FiUser, FiSmartphone, FiMapPin, FiFilePlus, FiEdit3 } from 'react-icons/fi';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlow, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { appPalette } from 'apps/theme/app.palette';

export function Configuration() {
  const [active, setActive] = useState('color');
  const dispatch = useDispatch();
  const currentFlowModel = useSelector(selectCurrentFlow);
  const [flowSteps, setFlowSteps] = useState([]);
  const tags = useSelector(selectMerchantTags);
  const intl = useIntl();

  const updateConfiguration = useCallback((settings) => dispatch(merchantUpdateFlow(settings)), [dispatch]);

  useEffect(() => {
    setFlowSteps([
      {
        id: 'color',
        title: 'Product.configuration.buttonsColor',
        icon: <FiDroplet />,
        body: (
          <BoxBordered borderColor={appPalette.yellow} mt={1} mb={1}>
            <Warning
              type={WarningTypes.Warning}
              size={WarningSize.Large}
              label={intl.formatMessage({ id: 'ColorPickerWarning' })}
              link="https://docs.getmati.com/#web-sdk-overview"
              linkLabel="Documentation"
            />
          </BoxBordered>
        ),
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
      {
        id: 'customDocument',
        title: 'CustomDocument',
        icon: <FiFilePlus />,
        body: <CustomDocumentConfiguration />,
      },
      {
        id: 'eSignature',
        title: 'Product.configuration.eSignature',
        icon: <FiEdit3 />,
        body: <ESignatureConfiguration />,
      },
    ]);
  }, [currentFlowModel, updateConfiguration, tags, intl]);

  return (
    <Box p={2}>
      <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="stretch">
        {/* menu */}
        <Grid item xs={false} md={5}>
          <Grid container spacing={1} direction="column">
            {flowSteps.map((item) => (
              <Grid item key={item.id}>
                <ButtonCollapsible
                  className={classnames({ active: item.id === active })}
                  fullWidth
                  variant="contained"
                  disableElevation
                  size="large"
                  startIcon={item.icon}
                  onClick={() => setActive(item.id)}
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
          {flowSteps.find((item) => item.id === active) && flowSteps.find((item) => item.id === active).body}
        </Grid>
      </Grid>
    </Box>
  );
}
