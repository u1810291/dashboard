import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useOtherProductAdding } from 'apps/Product/hooks/OtherProductAdding.hook';
import { ProductTypes } from 'models/Product.model';
import { useDispatch } from 'react-redux';
import { flowBuilderProductAdd } from 'apps/flowBuilder/store/FlowBuilder.action';
import { GovCheck, GovCheckStepTypes, GovCheckTypesForPattern } from 'apps/GovCheck';
import remove from 'lodash/remove';
import { DocumentStepTypes } from 'models/Step.model';
import { useFormatMessage } from 'apps/intl';
import { FacematchSourceSelect, IFacematchSourceSelectMenuItem } from './FacematchSourceSelect';
import { FacematchGovCheckSettings } from '../FacematchGovCheckSettings/FacematchGovCheckSettings';
import { IFacematchSourceDocumentOptions, IFacematchSourceGovCheckOptions, FacematchSourceTypes, IFacematchSource } from '../../models/Facematch.model';

export function FacematchSource({ availableSources, sources, index, onChange, documentTypes, productsInGraph }: {
  availableSources: FacematchSourceTypes[];
  sources: Record<number, IFacematchSource>;
  index: number;
  onChange: (index: number, source: Partial<IFacematchSource>, govCheckValue?: unknown) => void;
  documentTypes: string[][];
  productsInGraph: {
    isBiometricStepActive: boolean;
    isDocumentStepActive: boolean;
    isGovCheckStepActive: boolean;
  };
}) {
  const formatMessage = useFormatMessage();
  const createAddOtherProductModalOverlay = useOtherProductAdding();
  const dispatch = useDispatch();

  const [filteredSources, setFilteredSources] = useState<IFacematchSourceSelectMenuItem[]>([]);

  const currentSourceType = useMemo<FacematchSourceTypes>(() => sources[index]?.type, [index, sources]);
  const currentDocumentType = useMemo<number>(() => (sources[index]?.options as IFacematchSourceDocumentOptions)?.verificationStepIndex, [index, sources]);
  const currentGovCheckList = useMemo<string[]>(() => (sources[index]?.options as IFacematchSourceGovCheckOptions)?.govCheckIds, [index, sources]);

  const getGovCheckValue = (govCheck: GovCheck, checked: boolean): Record<string, GovCheckStepTypes | boolean> => {
    if (govCheck.id === DocumentStepTypes.BrazilianCpf) {
      return { [govCheck.id]: checked ? govCheck.option?.stepTypeAlias : GovCheckTypesForPattern[govCheck.id].none };
    }

    if (govCheck?.stepTypeAlias) {
      const value = checked ? govCheck.stepTypeAlias : GovCheckTypesForPattern[govCheck.id].none;
      return { [govCheck.id]: value || checked };
    }
    if (govCheck.option) {
      return { [govCheck.id]: checked, [govCheck.option.id]: checked && govCheck.option.value };
    }

    return { [govCheck.id]: checked };
  };

  const handleChangeGovCheck = useCallback((item: GovCheck) => () => {
    let checked = false;
    const currentGovChecks = currentGovCheckList;

    if (!currentGovChecks.includes(item.id)) {
      currentGovChecks.push(item.id);
      checked = true;
    } else {
      remove(currentGovChecks, (check) => check === item.id);
    }

    const govCheckValue = getGovCheckValue(item, checked);

    onChange(index, { options: { govCheckIds: currentGovChecks } }, govCheckValue);
  }, [currentGovCheckList, index, onChange]);

  const handleChangeDocumentType = useCallback((event) => {
    onChange(index, { options: { verificationStepIndex: event.target.value } });
  }, [index, onChange]);

  const optionComponent = useMemo(() => {
    switch (currentSourceType) {
      case FacematchSourceTypes.Document: {
        return (
          <>
            <Box mb={0.5} fontWeight="bold" color="common.black90">{formatMessage('Facematch.settings.verificationSteps.title')}</Box>
            <FacematchSourceSelect
              onChange={handleChangeDocumentType}
              menuItems={documentTypes.map((types, i) => ({
                value: i,
                title: formatMessage('Facematch.settings.verificationStepsItem.title', {
                  messageValues: {
                    stepIndex: i + 1,
                    types: types.map((type) => formatMessage(`flow.documentTypeStep.${type}`)).join(' or '),
                  },
                }),
              }))}
              value={currentDocumentType}
              displayEmpty={false}
            />
          </>
        );
      }
      case FacematchSourceTypes.GovermentCheck: {
        return (
          <FacematchGovCheckSettings onChange={handleChangeGovCheck} checkedFacematchGovChecks={currentGovCheckList} />
        );
      }
      default: {
        return undefined;
      }
    }
  }, [currentDocumentType, currentGovCheckList, currentSourceType, documentTypes, formatMessage, handleChangeDocumentType, handleChangeGovCheck]);

  const checkProductsInGraph = useCallback((sourceType: FacematchSourceTypes): boolean => {
    const { isDocumentStepActive, isBiometricStepActive, isGovCheckStepActive } = productsInGraph;
    switch (sourceType) {
      case FacematchSourceTypes.Document:
        return isDocumentStepActive;
      case FacematchSourceTypes.Biometrics:
        return isBiometricStepActive;
      case FacematchSourceTypes.GovermentCheck:
        return isGovCheckStepActive;
      default:
        return true;
    }
  }, [productsInGraph]);

  const askAddProductInGraph = useCallback((sourceType: FacematchSourceTypes) => {
    const onChangeProductsinGraph = (productType: ProductTypes) => {
      dispatch(flowBuilderProductAdd(productType));
      onChange(index, { type: sourceType });
    };
    switch (sourceType) {
      case FacematchSourceTypes.Document: {
        createAddOtherProductModalOverlay(
          ProductTypes.DocumentVerification,
          <Box component="span">
            {formatMessage('Facematch.settings.description.addDocumentProduct',
              {
                messageValues: {
                  settings: (
                    <Box component="span" color="common.green">
                      {formatMessage('Facematch.settings.description.facematch')}
                    </Box>
                  ),
                },
              })}
          </Box>,
          onChangeProductsinGraph,
        );
        break;
      }
      case FacematchSourceTypes.Biometrics: {
        createAddOtherProductModalOverlay(
          ProductTypes.BiometricVerification,
          <Box component="span">
            {formatMessage('Facematch.settings.description.addBiometricProduct',
              {
                messageValues: {
                  settings: (
                    <Box component="span" color="common.green">
                      {formatMessage('Facematch.settings.description.facematch')}
                    </Box>
                  ),
                },
              })}
          </Box>,
          onChangeProductsinGraph,
        );
        break;
      }
      case FacematchSourceTypes.GovermentCheck: {
        createAddOtherProductModalOverlay(
          ProductTypes.GovernmentCheck,
          <Box component="span">
            {formatMessage('Facematch.settings.description.addGovCheckProduct',
              {
                messageValues: {
                  settings: (
                    <Box component="span" color="common.green">
                      {formatMessage('Facematch.settings.description.facematch')}
                    </Box>
                  ),
                },
              })}
          </Box>,
          onChangeProductsinGraph,
        );
        break;
      }
      default:
        break;
    }
  }, [createAddOtherProductModalOverlay, dispatch, formatMessage, index, onChange]);

  const handleChangeSourceType = useCallback((event) => {
    const sourceType = event.target.value;
    if (!checkProductsInGraph(sourceType)) {
      askAddProductInGraph(sourceType);
      return;
    }
    onChange(index, { type: sourceType });
  }, [askAddProductInGraph, checkProductsInGraph, index, onChange]);

  useEffect(() => {
    const sourcesInAnotherInputs = Object.entries(sources).filter(([sourceIndex]) => Number(sourceIndex) !== index).map(([, source]) => source.type);

    const res = availableSources.filter((availableSource) => !sourcesInAnotherInputs.includes(availableSource)).map((source) => ({ value: source, title: formatMessage(`Facematch.source.${source}.title`) }));

    setFilteredSources(res);
  }, [availableSources, sources, index, formatMessage]);

  return (
    <Box>
      <FacematchSourceSelect key="sourceType" onChange={handleChangeSourceType} menuItems={filteredSources} value={currentSourceType || ''} />
      {optionComponent}
    </Box>
  );
}
