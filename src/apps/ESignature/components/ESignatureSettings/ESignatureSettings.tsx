import { Box, Button, RadioGroup, Switch, Radio, FormControlLabel, Link } from '@material-ui/core';
import { ESignatureCheckSettingsEnum, ESignatureRadioOptionsEnum, IESignatureTemplate } from 'models/ESignature.model';
import { selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { ProductCard } from 'apps/Product';
import { useOtherProductAdding } from 'apps/Product/hooks/OtherProductAdding.hook';
import { ExtendedDescription, WarningSize, WarningTypes, Warning } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps, ProductTypes } from 'models/Product.model';
import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import * as api from 'lib/client/e-signature';
import { flowBuilderProductAdd } from 'apps/flowBuilder/store/FlowBuilder.action';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './ESignatureSettings.style';
import { DocumentsList } from '../DocumentList/DocumentsList';

export function ESignatureSettings({ settings, onUpdate }: ProductSettingsProps<ESignatureCheckSettingsEnum>) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const createAddOtherProductModalOverlay = useOtherProductAdding();
  const productsInGraph = (useSelector(selectFlowBuilderProductsInGraphModel)).value;
  const [isDocLoading, setDocLoading] = useState<boolean>(false);

  const merchantTags: MerchantTags[] = useSelector(selectMerchantTags);
  const isProductEnabled = merchantTags.includes(MerchantTags.CanUseESignature);

  const handleUpdateSettings = useCallback((field: ESignatureCheckSettingsEnum, value: any) => {
    const newSettings = cloneDeep(settings);
    newSettings[field].value = value;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  const handleSwitch = useCallback((field: ESignatureCheckSettingsEnum) => (e) => {
    handleUpdateSettings(field, e.target.checked);
  }, [handleUpdateSettings]);

  const handleRadioButton = useCallback((field: ESignatureCheckSettingsEnum, value: ESignatureRadioOptionsEnum) => () => {
    handleUpdateSettings(field, value);
  }, [handleUpdateSettings]);

  const handleFileInput = useCallback((files: IESignatureTemplate[], order: string[]) => {
    const newSettings = cloneDeep(settings);
    newSettings[ESignatureCheckSettingsEnum.Terms].value = files;
    newSettings[ESignatureCheckSettingsEnum.TermsOrder].value = order;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleAdd = useCallback((products: ProductTypes[]) => {
    products.forEach((product) => dispatch(flowBuilderProductAdd(product)));
    handleUpdateSettings(ESignatureCheckSettingsEnum.SignatureMethod, ESignatureRadioOptionsEnum.FaceAndDocumentSignature);
  }, [dispatch, handleUpdateSettings]);

  const handleFaceAndDocuments = useCallback(() => {
    const hasDocumentVerification = productsInGraph?.includes(ProductTypes.DocumentVerification);
    const hasBiometricVerification = productsInGraph?.includes(ProductTypes.BiometricVerification);

    if (hasDocumentVerification && hasBiometricVerification) {
      handleUpdateSettings(ESignatureCheckSettingsEnum.SignatureMethod, ESignatureRadioOptionsEnum.FaceAndDocumentSignature);
      return;
    }
    if (hasDocumentVerification && !hasBiometricVerification) {
      createAddOtherProductModalOverlay(
        ProductTypes.BiometricVerification,
        null,
        () => handleAdd([ProductTypes.BiometricVerification]),
      );
      return;
    }
    if (hasBiometricVerification && !hasDocumentVerification) {
      createAddOtherProductModalOverlay(
        ProductTypes.DocumentVerification,
        null,
        () => handleAdd([ProductTypes.DocumentVerification]),
      );
      return;
    }
    createAddOtherProductModalOverlay(
      ProductTypes.DocumentVerification,
      <Box mt={2}>
        <ProductCard id={ProductTypes.BiometricVerification} isExpandable={false} defaultExpanded />
      </Box>,
      () => handleAdd([ProductTypes.DocumentVerification, ProductTypes.BiometricVerification]),
    );
  }, [createAddOtherProductModalOverlay, productsInGraph, handleAdd, handleUpdateSettings]);

  const fileUploadRef = useRef(null);
  const onFileUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setDocLoading(true);
      const file = e.target.files[0];
      const form = new FormData();
      form.append('template-document', file);

      const { data } = await api.storeTemplate(form);
      handleFileInput([...settings?.terms.value, data], [...settings?.termsOrder.value, data.id]);
    } catch (error) {
      console.error(error);
    } finally {
      setDocLoading(false);
    }
  }, [handleFileInput, settings]);

  const onTermDelete = useCallback((id: string) => {
    handleFileInput(settings?.terms.value.filter((term) => term.id !== id), settings?.termsOrder.value.filter((termId) => termId !== id));
  }, [handleFileInput, settings]);

  const onTermReorder = useCallback((reorderedIds: string[]) => {
    handleFileInput(settings?.terms.value, reorderedIds);
  }, [handleFileInput, settings]);

  return (
    <Box>
      {!isProductEnabled && (
        <Box mb={2}>
          <Warning
            type={WarningTypes.Warning}
            size={WarningSize.Normal}
            label={intl.formatMessage({ id: 'ESignature.disabled' }, {
              email: <Link color="primary" href="mailto:sales@metamap.com" rel="noopener">sales@metamap.com</Link>,
            })}
            bordered
          />
        </Box>
      )}
      <Box>
        <ExtendedDescription
          title={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.ESignatureEnabled}.title` })}
          text={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.ESignatureEnabled}.description` })}
          isDisabled={!isProductEnabled}
          postfix={(
            <Switch
              checked={settings?.eSignatureEnabled.value}
              color="primary"
              onClick={handleSwitch(ESignatureCheckSettingsEnum.ESignatureEnabled)}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.title` })}
          text={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.description` })}
          isDisabled={!isProductEnabled}
        />
        <Box mt={2} className={classNames(classes.root, { [classes.rootDisabled]: !isProductEnabled })}>
          <RadioGroup value={settings?.signatureMethod.value}>
            <FormControlLabel
              control={<Radio color="primary" />}
              value={ESignatureRadioOptionsEnum.NameTyping}
              disabled={!isProductEnabled}
              onClick={handleRadioButton(ESignatureCheckSettingsEnum.SignatureMethod, ESignatureRadioOptionsEnum.NameTyping)}
              label={(
                <Box mt={0.5}>
                  <Box color="common.black90" fontWeight="bold">
                    {intl.formatMessage({
                      id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.NameTyping}.label`,
                    })}
                  </Box>
                  <Box color="common.black75">
                    {intl.formatMessage({
                      id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.NameTyping}.description`,
                    })}
                  </Box>
                </Box>
              )}
            />
            <Box mt={4}>
              <FormControlLabel
                control={<Radio color="primary" />}
                value={ESignatureRadioOptionsEnum.UploadDocumentAndTypeName}
                disabled={!isProductEnabled}
                onClick={handleRadioButton(ESignatureCheckSettingsEnum.SignatureMethod, ESignatureRadioOptionsEnum.UploadDocumentAndTypeName)}
                label={(
                  <Box mt={0.5}>
                    <Box color="common.black90" fontWeight="bold">{intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.UploadDocumentAndTypeName}.label` })}</Box>
                    <Box color="common.black75">{intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.UploadDocumentAndTypeName}.description` })}</Box>
                  </Box>
                )}
              />
            </Box>
            <Box mt={4}>
              <FormControlLabel
                control={<Radio color="primary" />}
                value={ESignatureRadioOptionsEnum.FaceAndDocumentSignature}
                disabled={!isProductEnabled}
                onClick={handleFaceAndDocuments}
                label={(
                  <Box mt={0.5}>
                    <Box color="common.black90" fontWeight="bold">{intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.FaceAndDocumentSignature}.label` })}</Box>
                    <Box color="common.black75">{intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.SignatureMethod}.radio.${ESignatureRadioOptionsEnum.FaceAndDocumentSignature}.description` })}</Box>
                  </Box>
                )}
              />
            </Box>
          </RadioGroup>
        </Box>
      </Box>

      <Box mt={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.Terms}.title` })}
          text={intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.Terms}.description` })}
          isDisabled={!isProductEnabled}
        />
        <Box mt={2}>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="contained"
            size="large"
            onClick={() => fileUploadRef.current?.click()}
            startIcon={isDocLoading ? <CircularProgress color="inherit" size="1rem" thickness={7} /> : <FiUpload />}
            disabled={isDocLoading || !isProductEnabled}
          >
            {intl.formatMessage({ id: `ESignature.settings.${ESignatureCheckSettingsEnum.Terms}.upload` })}
          </Button>
          <input
            className={classes.uploadInput}
            type="file"
            onChange={onFileUpload}
            multiple={false}
            accept="application/pdf"
            ref={fileUploadRef}
          />
        </Box>
        {isProductEnabled && (
          <Box mt={2}>
            <DocumentsList
              documents={{ order: settings?.termsOrder.value, list: settings?.terms.value }}
              onChangeOrder={onTermReorder}
              onDocumentDelete={onTermDelete}
              isLoading={isDocLoading}
            />
          </Box>
        )}
      </Box>

    </Box>
  );
}
