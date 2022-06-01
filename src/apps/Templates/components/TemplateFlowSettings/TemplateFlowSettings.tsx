import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { flowNameValidator } from 'pages/WorkflowList/validators/FlowName.validator';
import { overlayCloseAll } from 'apps/overlay';
import { ProductCheckListAll } from 'apps/Product';
import { useDeleteButtonHook, Warning, notification } from 'apps/ui';
import classNames from 'classnames';
import { toIsoPeriod } from 'lib/date';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantFlowsModel } from 'state/merchant';
import { round } from 'lib/round';
import { Loadable } from 'models/Loadable.model';
import { useFormatMessage } from 'apps/intl';
import { IFlow } from 'models/Flow.model';
import { ITemplate, selectCurrentTemplateModelValue } from 'apps/Templates';
import { FlowSettingsModel, FlowSettingsSwitches, validatePolicyInterval } from 'apps/WorkflowBuilder';
import { selectFlowBuilderChangeableFlow, selectFlowBuilderProductsInGraph } from 'apps/flowBuilder';
import { selectCurrentTemplatePolicyInterval, selectCurrentTemplateNom151Check } from '../../store/Templates.selectors';
import { templateBuilderSaveAndPublishSettings, blockTemplate } from '../../store/Templates.actions';
import { TemplateFlowInfo } from '../TemplateFlowInfo/TemplateFlowInfo';
import { useStyles } from './TemplateFlowSettings.styles';

export function TemplateFlowSettings({ onClose }: {
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const { name: flowName } = useSelector<any, IFlow>(selectFlowBuilderChangeableFlow);
  const merchantFlowsModel = useSelector<any, Loadable<IFlow[]>>(selectMerchantFlowsModel);
  const currentTemplateModelValue = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);
  const productsInGraph = useSelector(selectFlowBuilderProductsInGraph);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false);
  const [policyIntervalError, setPolicyIntervalError] = useState<string | null>(null);
  const [newFlowName, setNewFlowName] = useState<string>('');
  const [policyInterval, setPolicyInterval] = useState<string>(useSelector(selectCurrentTemplatePolicyInterval));
  const [isGDPRChecked, setIsGDPRChecked] = useState<boolean>(!!useSelector(selectCurrentTemplatePolicyInterval));
  const [digitalSignature, setDigitalSignature] = useState<DigitalSignatureProvider>(useSelector(selectCurrentTemplateNom151Check));
  const [isInit, setIsInit] = useState<boolean>(true);
  const [oldSettings, setOldSettings] = useState<FlowSettingsModel>(null);

  const validator = useCallback((text: string) => {
    const duplicate = merchantFlowsModel.value.find((item) => item.name === text.trim());
    return flowNameValidator({ hasDuplicate: !!duplicate, name: text });
  }, [merchantFlowsModel.value]);

  const handleDeleteFlow = useCallback(async () => {
    await dispatch(overlayCloseAll());
    await dispatch(blockTemplate(currentTemplateModelValue._id));
  }, [dispatch, currentTemplateModelValue._id]);

  const { handleDelete } = useDeleteButtonHook(handleDeleteFlow, {
    redirectUrl: Routes.templates.root,
    header: 'Templates.block.title',
    confirm: 'Templates.block.subtitle',
  });

  const handleValidatePolicyInterval = useCallback(({ target: { value } }) => {
    setPolicyIntervalError(validatePolicyInterval(parseInt(value, 10)));
  }, []);

  const handleChangePolicyInterval = useCallback(({ target: { value } }) => {
    setPolicyInterval(value);
  }, []);

  const handleGDPRSwitcher = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsGDPRChecked(isChecked);
    if (!isChecked) {
      setPolicyInterval(null);
      setPolicyIntervalError(null);
    }
  }, []);

  const handleDigitalSignatureSwitcher = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
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
    try {
      await dispatch(templateBuilderSaveAndPublishSettings(payload));
      notification.success(formatMessage('FlowBuilder.notification.saved'));
      setIsSaveButtonLoading(false);
      onClose();
    } catch (error) {
      notification.error(formatMessage('Error.common'));
      setIsSaveButtonLoading(false);
      onClose();
    }
    setIsSaveButtonLoading(false);
    onClose();
  }, [dispatch, policyInterval, policyIntervalError, digitalSignature, newFlowName, onClose, formatMessage]);

  const handleSubmit = useCallback((name: string) => {
    setNewFlowName(name);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditable(false);
  }, []);

  const showUnsavedChange = useMemo<boolean>(() => {
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
          {formatMessage('FlowBuilder.settings.title.template')}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        {currentTemplateModelValue._id && (
          <Box mb={3}>
            <Box color="common.black90" mb={0.5}>{currentTemplateModelValue._id}</Box>
            <Box color="common.black75">{formatMessage('FlowBuilder.settings.title.templateId')}</Box>
          </Box>
        )}
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
            {`${formatMessage('FlowBuilder.settings.title.outputChecks')}:`}
          </Box>
          <ProductCheckListAll productList={productsInGraph} />
        </Box>
      </Grid>
      <Grid container item xs={12} className={classes.buttonsWrapper}>
        {currentTemplateModelValue._id && (
          <Button variant="outlined" className={classNames(classes.button, classes.buttonCancel)} onClick={handleDelete}>
            <FiTrash2 fontSize={17} />
            <Box ml={1}>
              {formatMessage('Templates.block.title')}
            </Box>
          </Button>
        )}
        {showUnsavedChange && (
          <Warning label={formatMessage('FlowBuilder.settings.button.warning')} />
        )}
        <Button disabled={isSaveButtonLoading} className={classNames(classes.button, classes.buttonSave)} onClick={handleSaveAndPublish}>
          {isSaveButtonLoading ? <CircularProgress color="inherit" size={17} /> : formatMessage('FlowBuilder.settings.button.save')}
        </Button>
      </Grid>
    </Grid>
  );
}
