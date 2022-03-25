import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { overlayCloseAll } from 'apps/overlay';
import { ProductCheckListAll } from 'apps/Product';
import { useDeleteButtonHook } from 'apps/ui';
import classNames from 'classnames';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { round } from 'lib/round';
import { flowNameValidator } from 'pages/WorkflowList/validators/FlowName.validator';
import { GDPRSettings, GDPRUnitTypes } from 'models/GDPR.model';
import { IWorkflow } from 'models/Workflow.model';
import { toIsoPeriod } from 'lib/date';
import { useFormatMessage } from 'apps/intl';
import { ProductTypes } from 'models/Product.model';
import { Loadable } from 'models/Loadable.model';
import { IFlow } from 'models/Flow.model';
import { selectWorkflowBuilderChangeableFlow, selectWorkflowBuilderProductsInGraph, selectWorkflowPolicyInterval } from '../../store/WorkflowBuilder.selectors';
import { validatePolicyInterval } from '../../models/WorkflowBuilder.model';
import { workflowBuilderChangeableFlowUpdate, workflowBuilderDelete } from '../../store/WorkflowBuilder.action';
import { FlowInfo } from '../FlowInfo/FlowInfo';
import { FlowSettingsSwitches } from '../FlowSettingsSwitches/FlowSettingsSwitches';
import { useStyles } from './FlowSettings.styles';

export function FlowSettings() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const { id: flowId, name: flowName, workflowSetting: { digitalSignature, gdprSetting: { interval } } } = useSelector<any, IWorkflow>(selectWorkflowBuilderChangeableFlow);
  const merchantFlowsModel = useSelector<any, Loadable<IFlow[]>>(selectMerchantFlowsModel);
  const productsInGraph = useSelector<any, ProductTypes[]>(selectWorkflowBuilderProductsInGraph);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const policyIntervalFromStore = useSelector<any, GDPRSettings>(selectWorkflowPolicyInterval);
  const [policyIntervalError, setPolicyIntervalError] = useState<string | null>(null);
  const [policyInterval, setPolicyInterval] = useState<string>(toIsoPeriod(policyIntervalFromStore.interval));
  const [isGDPRChecked, setIsGDPRChecked] = useState<boolean>(!!policyIntervalFromStore?.interval);

  const validator = useCallback((text: string) => {
    const duplicate = merchantFlowsModel.value.find((item) => item.name === text.trim());
    return flowNameValidator({ hasDuplicate: !!duplicate, name: text });
  }, [merchantFlowsModel.value]);

  const handleDeleteFlow = useCallback(async () => {
    await dispatch(overlayCloseAll());
    await dispatch(workflowBuilderDelete());
  }, [dispatch]);

  const { handleDelete } = useDeleteButtonHook(handleDeleteFlow, {
    redirectUrl: Routes.flow.root,
    header: 'VerificationFlow.modal.delete.title',
    confirm: 'VerificationFlow.modal.delete.subtitle',
  });

  const handleValidatePolicyInterval = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPolicyIntervalError(validatePolicyInterval(parseInt(value, 10)));
  }, []);

  const handleChangePolicyInterval = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPolicyInterval(value);
    if (policyIntervalError) {
      return;
    }
    const roundedValue = round(parseInt(value, 10), 0);
    dispatch(workflowBuilderChangeableFlowUpdate(
      {
        workflowSetting:
          {
            gdprSetting:
              {
                interval: roundedValue?.toString() || null,
                unit: GDPRUnitTypes.Day,
              },
          },
        // TODO @vladislav.snimshchikov: resolve types problem in the next iteration of workflowbuilder
      } as Partial<IWorkflow>,
    ));
  }, [dispatch, policyIntervalError]);

  const handleGDPRSwitcher = useCallback((e) => {
    const isChecked = e.target.checked;
    setIsGDPRChecked(isChecked);
    dispatch(workflowBuilderChangeableFlowUpdate({
      workflowSetting: {
        gdprSetting: {
          interval: null,
          unit: GDPRUnitTypes.Day,
        },
      },
      // TODO @vladislav.snimshchikov: resolve types problem in the next iteration of workflowbuilder
    } as Partial<IWorkflow>));
    if (!isChecked) {
      setPolicyIntervalError(null);
    }
  }, [dispatch]);

  const handleDigitalSignatureSwitcher = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    // TODO @vladislav.snimshchikov: resolve types problem in the next iteration of workflowbuilder
    dispatch(workflowBuilderChangeableFlowUpdate({ workflowSetting: { digitalSignature: isChecked ? DigitalSignatureProvider.NOM151 : DigitalSignatureProvider.NONE } } as Partial<IWorkflow>));
  }, [dispatch]);

  const handleSubmit = useCallback((name: string) => {
    dispatch(workflowBuilderChangeableFlowUpdate({ name }));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    setIsEditable(false);
  }, []);

  useEffect(() => {
    setIsGDPRChecked(!!interval);
    setPolicyInterval(interval);
  }, [interval]);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Box color="common.black90" fontWeight="bold">
          {formatMessage('FlowBuilder.settings.title.settings')}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box mb={3}>
          <FlowInfo
            canEdit
            isEditable={isEditable}
            newFlowName={flowName}
            setIsEditable={setIsEditable}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            validator={validator}
          />
        </Box>
        <Box mb={3}>
          <Box color="common.black90" mb={0.5}>{flowId}</Box>
          <Box color="common.black75">{formatMessage('FlowBuilder.settings.title.flowId')}</Box>
        </Box>
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
        <Button variant="outlined" className={classNames(classes.button, classes.buttonCancel)} onClick={handleDelete}>
          <FiTrash2 fontSize={17} />
          <Box ml={1}>
            {formatMessage('FlowBuilder.settings.button.delete')}
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
}
