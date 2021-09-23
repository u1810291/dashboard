import { Box, Button, Switch } from '@material-ui/core';
import { AgeThresholdSettings } from 'apps/AgeCheck/components/AgeThresholdSettings/AgeThresholdSettings';
import { CountryRestrictionSettings } from 'apps/countries/components/CountryRestrictionSettings/CountryRestrictionSettings';
import { DocumentStepSettings } from 'apps/documents/components/DocumentStepSettings/DocumentStepSettings';
import { FaceMatchingThreshold } from 'apps/facematch';
import { flowBuilderProductAdd } from 'apps/flowBuilder/store/FlowBuilder.action';
import { useOtherProductAdding } from 'apps/Product/hooks/OtherProductAdding.hook';
import { useSettingsBuffer } from 'apps/flowBuilder/hooks/settingsBuffer.hook';
import { selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { appPalette } from 'apps/theme';
import { BoxBordered, Warning } from 'apps/ui';
import { ExtendedDescription } from 'apps/ui/components/ExtendedDescription/ExtendedDescription';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { DocumentTypes } from 'models/Document.model';
import { ProductSettingsProps, ProductTypes } from 'models/Product.model';
import { selectCanUseProofOfOwnership } from 'apps/ProofOfOwnership';
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AGE_CHECK_DEFAULT_THRESHOLD } from 'apps/AgeCheck/models/AgeCheck.model';
import { DocumentVerificationSettingTypes } from '../../models/DocumentVerification.model';
import { useStyles } from './DocumentVerificationSettings.styles';

export function DocumentVerificationSettings({ settings, onUpdate }: ProductSettingsProps<DocumentVerificationSettingTypes>) {
  const intl = useIntl();
  const classes = useStyles();
  const [isCountryRestrictionEnabled, setIsCountryRestrictionEnabled] = useState(false);
  const checkCountryRestriction = useCallback(() => setIsCountryRestrictionEnabled(settings[DocumentVerificationSettingTypes.CountryRestriction]?.value?.length > 0), [settings]);
  const [bufferedSettings, updateBufferedSettings] = useSettingsBuffer<DocumentVerificationSettingTypes>(settings, checkCountryRestriction);
  const createAddOtherProductModalOverlay = useOtherProductAdding();
  const dispatch = useDispatch();

  const canUseProofOfOwnership = useSelector(selectCanUseProofOfOwnership);

  useEffect(() => {
    // TODO: @richvoronov проработать логику этой операции в useSettingsBuffer и checkCountryRestriction
    if (settings[DocumentVerificationSettingTypes.CountryRestriction]?.value?.length > 0) {
      setIsCountryRestrictionEnabled(true);
    }
  }, [settings]);

  const productsInGraphModel = useSelector(selectFlowBuilderProductsInGraphModel);
  const isCantUsePoo = useMemo(() => {
    const steps = settings[DocumentVerificationSettingTypes.DocumentSteps]?.value || [];
    return productsInGraphModel.value?.some((product) => [ProductTypes.AmlCheck, ProductTypes.GovernmentCheck].includes(product)) && steps?.length > 0 && steps[0]?.every((step) => step === DocumentTypes?.ProofOfResidency);
  }, [productsInGraphModel, settings]);

  const handleClick = useCallback((settingId: DocumentVerificationSettingTypes) => () => {
    const newSettings = cloneDeep(settings);
    if (settingId === DocumentVerificationSettingTypes.AgeThreshold) {
      newSettings[settingId].value = settings[settingId].value ? undefined : (bufferedSettings[settingId] ?? AGE_CHECK_DEFAULT_THRESHOLD);
    }
    if (settingId === DocumentVerificationSettingTypes.CountryRestriction) {
      setIsCountryRestrictionEnabled((prevState) => !prevState);
      newSettings[settingId].value = settings[settingId].value?.length > 0 ? [] : bufferedSettings[settingId];
    }
    if ([
      DocumentVerificationSettingTypes.GrayscaleImage,
      DocumentVerificationSettingTypes.DenyUploadRequirement,
      DocumentVerificationSettingTypes.SimilarImages,
      DocumentVerificationSettingTypes.ProofOfOwnership,
      DocumentVerificationSettingTypes.DuplicateUserDetection,
    ].includes(settingId)) {
      newSettings[settingId].value = !newSettings[settingId].value;
    }

    onUpdate(newSettings);
  }, [onUpdate, settings, bufferedSettings]);

  const handleUpdate = useCallback((settingId: DocumentVerificationSettingTypes) => (newValue: any) => {
    const newSettings = cloneDeep(settings);
    newSettings[settingId].value = newValue;
    updateBufferedSettings(settingId, newValue);

    onUpdate(newSettings);
  }, [onUpdate, settings, updateBufferedSettings]);

  const handleAdd = useCallback((productType) => {
    dispatch(flowBuilderProductAdd(productType));
  }, [dispatch]);

  const handleAddBiometricVerification = useCallback(() => {
    createAddOtherProductModalOverlay(
      ProductTypes.BiometricVerification,
      <Box component="span">
        {intl.formatMessage(
          { id: 'DocumentVerification.settings.description.addBiometricProduct' },
          {
            settings: (
              <Box component="span" color="common.green">
                {intl.formatMessage({ id: 'DocumentVerification.settings.description.facematchAndPoo' })}
              </Box>
            ),
          },
        )}
      </Box>,
      handleAdd,
    );
  }, [createAddOtherProductModalOverlay, intl, handleAdd]);

  return (
    <Box>
      { /* Document Steps */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.DocumentSteps}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.DocumentSteps}` })}
          className={classes.setting}
        >
          {isCantUsePoo && (
            <BoxBordered borderColor={appPalette.yellow} my={2}>
              <Warning label={intl.formatMessage({ id: 'DocumentVerification.settings.warning.cantUsePoo' })} />
            </BoxBordered>
          )}
          <DocumentStepSettings steps={settings[DocumentVerificationSettingTypes.DocumentSteps]?.value} onUpdate={handleUpdate(DocumentVerificationSettingTypes.DocumentSteps)} />
        </ExtendedDescription>
      </Box>

      { /* Deny Upload */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.DenyUploadRequirement}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.DenyUploadRequirement}` })}
          isDisabled={settings[DocumentVerificationSettingTypes.DenyUploadRequirement]?.isDisabled}
          postfix={(
            <Switch
              checked={settings[DocumentVerificationSettingTypes.DenyUploadRequirement]?.value}
              disabled={settings[DocumentVerificationSettingTypes.DenyUploadRequirement]?.isDisabled}
              onClick={handleClick(DocumentVerificationSettingTypes.DenyUploadRequirement)}
              color="primary"
            />
          )}
        />
      </Box>

      { /* Age threshold */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.AgeThreshold}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.AgeThreshold}` })}
          isDisabled={settings[DocumentVerificationSettingTypes.AgeThreshold]?.isDisabled}
          postfix={(
            <Switch
              checked={!!settings[DocumentVerificationSettingTypes.AgeThreshold]?.value}
              disabled={settings[DocumentVerificationSettingTypes.AgeThreshold]?.isDisabled}
              onClick={handleClick(DocumentVerificationSettingTypes.AgeThreshold)}
              color="primary"
            />
          )}
          className={classes.setting}
        >
          {settings[DocumentVerificationSettingTypes.AgeThreshold]?.value && !settings[DocumentVerificationSettingTypes.AgeThreshold]?.isDisabled && (
          <AgeThresholdSettings
            ageThreshold={settings[DocumentVerificationSettingTypes.AgeThreshold]?.value}
            onUpdate={handleUpdate(DocumentVerificationSettingTypes.AgeThreshold)}
          />
          )}
        </ExtendedDescription>
      </Box>

      { /* Grayscale image */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.GrayscaleImage}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.GrayscaleImage}` })}
          isDisabled={settings[DocumentVerificationSettingTypes.SimilarImages]?.isDisabled}
          postfix={(
            <Switch
              checked={settings[DocumentVerificationSettingTypes.GrayscaleImage]?.value}
              disabled={settings[DocumentVerificationSettingTypes.GrayscaleImage]?.isDisabled}
              onClick={handleClick(DocumentVerificationSettingTypes.GrayscaleImage)}
              color="primary"
            />
          )}
        />
      </Box>

      { /* Similar side image */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.SimilarImages}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.SimilarImages}` })}
          isDisabled={settings[DocumentVerificationSettingTypes.SimilarImages]?.isDisabled}
          postfix={(
            <Switch
              checked={settings[DocumentVerificationSettingTypes.SimilarImages]?.value}
              disabled={settings[DocumentVerificationSettingTypes.SimilarImages]?.isDisabled}
              onClick={handleClick(DocumentVerificationSettingTypes.SimilarImages)}
              color="primary"
            />
          )}
        />
      </Box>

      { /* Duplicate user detection */ }
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.DuplicateUserDetection}` })}
          text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.DuplicateUserDetection}` })}
          isDisabled={settings[DocumentVerificationSettingTypes.DuplicateUserDetection]?.isDisabled}
          postfix={(
            <Switch
              checked={!!settings[DocumentVerificationSettingTypes.DuplicateUserDetection]?.value}
              disabled={settings[DocumentVerificationSettingTypes.DuplicateUserDetection]?.isDisabled}
              onClick={handleClick(DocumentVerificationSettingTypes.DuplicateUserDetection)}
              color="primary"
            />
          )}
          className={classes.setting}
        />
      </Box>

      { /* Country Restriction */ }
      <Box mb={4}>
        <BoxBordered>
          <Box px={1}>
            <ExtendedDescription
              title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.CountryRestriction}` })}
              text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.CountryRestriction}` })}
              isDisabled={settings[DocumentVerificationSettingTypes.CountryRestriction]?.isDisabled}
              postfix={(
                <Switch
                  checked={isCountryRestrictionEnabled}
                  disabled={settings[DocumentVerificationSettingTypes.CountryRestriction]?.isDisabled}
                  onClick={handleClick(DocumentVerificationSettingTypes.CountryRestriction)}
                  color="primary"
                />
              )}
              badge={<Box>{intl.formatMessage({ id: 'FlowBuilder.integration.sdkOnly' })}</Box>}
            >
              {isCountryRestrictionEnabled && !settings[DocumentVerificationSettingTypes.CountryRestriction]?.isDisabled && (
                <CountryRestrictionSettings
                  countries={settings[DocumentVerificationSettingTypes.CountryRestriction]?.value}
                  onUpdate={handleUpdate(DocumentVerificationSettingTypes.CountryRestriction)}
                />
              )}
            </ExtendedDescription>
          </Box>
        </BoxBordered>
      </Box>

      {!settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isRequireOtherProduct && !settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isRequireOtherProduct ? (
        <>
          { /* Face match */ }
          {!settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isRequireOtherProduct && (
            <Box mb={4}>
              <ExtendedDescription
                title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.FacematchThreshold}` })}
                text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.FacematchThreshold}` })}
                isDisabled={settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isDisabled}
              >
                <FaceMatchingThreshold
                  facematchThreshold={settings[DocumentVerificationSettingTypes.FacematchThreshold]?.value}
                  onUpdate={handleUpdate(DocumentVerificationSettingTypes.FacematchThreshold)}
                />
              </ExtendedDescription>
            </Box>
          )}

          { /* Proof of Ownership */ }
          {canUseProofOfOwnership && !settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isRequireOtherProduct && (
            <ExtendedDescription
              title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.ProofOfOwnership}` })}
              text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.ProofOfOwnership}` })}
              isDisabled={settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isDisabled || settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isCantBeUsedWithOtherSetting}
              postfix={(
                <Switch
                  checked={settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.value}
                  disabled={settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isDisabled || settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isCantBeUsedWithOtherSetting}
                  onClick={handleClick(DocumentVerificationSettingTypes.ProofOfOwnership)}
                  color="primary"
                />
              )}
            >
              {settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isCantBeUsedWithOtherSetting
              && (
              <BoxBordered borderColor={appPalette.yellow} mt={2}>
                <Warning label={intl.formatMessage({ id: 'DocumentVerification.settings.warning.voiceAndPoo' })} />
              </BoxBordered>
              )}
            </ExtendedDescription>
          )}
        </>
      )
        : (
          <BoxBordered className={classNames(classes.biometric, { [classes.disabled]: settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isDisabled })} borderColor={appPalette.lightblue}>
            <Box mb={2}>
              <ExtendedDescription
                title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.FacematchThreshold}` })}
                text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.FacematchThreshold}` })}
                isDisabled={settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isDisabled}
                className={classes.setting}
              />
            </Box>
            <Box mb={2}>
              <ExtendedDescription
                title={intl.formatMessage({ id: `DocumentVerification.settings.title.${DocumentVerificationSettingTypes.ProofOfOwnership}` })}
                text={intl.formatMessage({ id: `DocumentVerification.settings.description.${DocumentVerificationSettingTypes.ProofOfOwnership}` })}
                isDisabled={settings[DocumentVerificationSettingTypes.ProofOfOwnership]?.isDisabled}
                className={classes.setting}
              />
            </Box>
            <Button onClick={handleAddBiometricVerification} disabled={settings[DocumentVerificationSettingTypes.FacematchThreshold]?.isDisabled} className={classes.button} fullWidth variant="contained" color="primary">
              {intl.formatMessage({ id: 'DocumentVerification.settings.button.addBiometricProduct' })}
            </Button>
          </BoxBordered>
        )}
    </Box>
  );
}
