import { Box, Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraph } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { flowNameValidator } from 'apps/FlowList/validators/FlowName.validator';
import { overlayCloseAll } from 'apps/overlay';
import { ProductCheckListAll } from 'apps/Product';
import { useDeleteButtonHook, Warning } from 'apps/ui';
import classNames from 'classnames';
import { toIsoPeriod } from 'lib/date';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantFlowsModel, selectNom151Check, selectPolicyInterval } from 'state/merchant/merchant.selectors';
import { round } from 'lib/round';
import { FlowSettingsModel, validatePolicyInterval } from '../../models/FlowBuilder.model';
import { flowBuilderDelete, flowBuilderSaveAndPublishSettings } from '../../store/FlowBuilder.action';
import { FlowInfo } from '../FlowInfo/FlowInfo';
import { FlowSettingsSwitches } from '../FlowSettingsSwitches/FlowSettingsSwitches';
import { useStyles } from './FlowSettings.styles';

export function FlowSettings({ onClose, isTemplate = false }: {
  onClose: () => void;
  isTemplate?: boolean;
}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const { id: flowId, name: flowName } = useSelector(selectFlowBuilderChangeableFlow);
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false);
  const [policyIntervalError, setPolicyIntervalError] = useState<string | null>(null);
  const [newFlowName, setNewFlowName] = useState<string>('');
  const [policyInterval, setPolicyInterval] = useState<string>(useSelector(selectPolicyInterval));
  const [isGDPRChecked, setIsGDPRChecked] = useState<boolean>(!!useSelector(selectPolicyInterval));
  const [digitalSignature, setDigitalSignature] = useState<DigitalSignatureProvider>(useSelector(selectNom151Check));
  const [isInit, setIsInit] = useState<boolean>(true);
  const [oldSettings, setOldSettings] = useState<FlowSettingsModel>(null);

  const validator = useCallback((text: string) => {
    const duplicate = merchantFlowsModel.value.find((item) => item.name === text.trim());
    return flowNameValidator({ hasDuplicate: !!duplicate, name: text });
  }, [merchantFlowsModel.value]);

  const handleDeleteFlow = useCallback(async () => {
    await dispatch(overlayCloseAll());
    await dispatch(flowBuilderDelete());
  }, [dispatch]);

  const { handleDelete } = useDeleteButtonHook(handleDeleteFlow, {
    redirectUrl: Routes.flow.root,
    header: 'VerificationFlow.modal.delete.title',
    confirm: 'VerificationFlow.modal.delete.subtitle',
  });

  const handleValidatePolicyInterval = useCallback(({ target: { value } }) => {
    setPolicyIntervalError(validatePolicyInterval(parseInt(value, 10)));
  }, []);

  const handleChangePolicyInterval = useCallback(({ target: { value } }) => {
    setPolicyInterval(value);
  }, []);

  const handleGDPRSwitcher = useCallback((e) => {
    const isChecked = e.target.checked;
    setIsGDPRChecked(isChecked);
    if (!isChecked) {
      setPolicyInterval(null);
      setPolicyIntervalError(null);
    }
  }, []);

  const handleDigitalSignatureSwitcher = useCallback((e) => {
    const isChecked = e.target.checked;
    setDigitalSignature(isChecked ? DigitalSignatureProvider.NOM151 : DigitalSignatureProvider.NONE);
  }, []);

  const handleSaveAndPublish = useCallback(async () => {
    if (policyIntervalError) {
      return;
    }
    const roundedValue = round(parseInt(policyInterval, 10), 0);
    const payload = {
      policyInterval: roundedValue ? toIsoPeriod(roundedValue) : null,
      digitalSignature,
      name: newFlowName,
    };
    setIsSaveButtonLoading(true);
    await dispatch(flowBuilderSaveAndPublishSettings(payload));
    setIsSaveButtonLoading(false);
    onClose();
  }, [dispatch, policyInterval, policyIntervalError, digitalSignature, newFlowName, onClose]);

  const handleSubmit = useCallback((name) => {
    setNewFlowName(name);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditable(false);
  }, []);

  const showUnsavedChange = useMemo(() => {
    if (!oldSettings) {
      return false;
    }
    return policyInterval !== oldSettings.policyInterval || digitalSignature !== oldSettings.digitalSignature || newFlowName !== oldSettings.flowName;
  }, [newFlowName, policyInterval, digitalSignature, oldSettings]);

  useEffect(() => {
    setNewFlowName(flowName);
  }, [flowName]);

  useEffect(() => {
    if (isInit) {
      setOldSettings({
        policyInterval,
        digitalSignature,
        flowName,
      });
      setIsInit(false);
    }
  }, [isInit, policyInterval, digitalSignature, flowName]);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Box color="common.black90" fontWeight="bold">
          {intl.formatMessage({ id: 'FlowBuilder.settings.title.settings' })}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box mb={3}>
          <FlowInfo
            canEdit={!isTemplate}
            isEditable={isEditable}
            newFlowName={newFlowName}
            setIsEditable={setIsEditable}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            validator={validator}
            isTemplate={isTemplate}
          />
        </Box>
        {
          !isTemplate && (
            <Box mb={3}>
              <Box color="common.black90" mb={0.5}>{flowId}</Box>
              <Box color="common.black75">{intl.formatMessage({ id: 'FlowBuilder.settings.title.flowId' })}</Box>
            </Box>
          )
        }
        <FlowSettingsSwitches
          policyInterval={policyInterval}
          policyIntervalError={policyIntervalError}
          onValidatePolicyInterval={handleValidatePolicyInterval}
          onChangePolicyInterval={handleChangePolicyInterval}
          gdprChecked={isGDPRChecked}
          digitalSignatureChecked={digitalSignature === DigitalSignatureProvider.NOM151}
          onGDPRSwitcher={handleGDPRSwitcher}
          onDigitalSignatureSwitcher={handleDigitalSignatureSwitcher}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box p={2} className={classes.wrapper}>
          <Box mb={2} color="common.black90" fontWeight="bold">
            {`${intl.formatMessage({ id: 'FlowBuilder.settings.title.outputChecks' })}:`}
          </Box>
          <ProductCheckListAll productList={productsInGraph} />
        </Box>
      </Grid>
      <Grid container item xs={12} className={classes.buttonsWrapper}>
        {
          !isTemplate && (
            <Button variant="outlined" className={classNames(classes.button, classes.buttonCancel)} onClick={handleDelete}>
              <FiTrash2 fontSize={17} />
              <Box ml={1}>
                {intl.formatMessage({ id: 'FlowBuilder.settings.button.delete' })}
              </Box>
            </Button>
          )
        }
        {showUnsavedChange && (
          <Warning label={intl.formatMessage({ id: 'FlowBuilder.settings.button.warning' })} />
        )}
        <Button className={classNames(classes.button, classes.buttonSave)} onClick={handleSaveAndPublish}>
          {isSaveButtonLoading ? <CircularProgress color="inherit" size={17} /> : intl.formatMessage({ id: 'FlowBuilder.settings.button.save' })}
        </Button>
      </Grid>
    </Grid>
  );
}
