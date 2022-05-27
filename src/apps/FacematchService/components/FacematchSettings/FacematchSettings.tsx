import React, { useCallback, useState, useEffect } from 'react';
import { ProductSettingsProps } from 'models/Product.model';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { ExtendedDescription, BoxBordered } from 'apps/ui';
import cloneDeep from 'lodash/cloneDeep';
import { useDebounce } from 'lib/debounce.hook';
import { ONLY_NUMBERS_REG_EXP } from 'lib/validations';
import { useFormatMessage } from 'apps/intl';
import isNil from 'lodash/isNil';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FacematchCheckSettingsTypes, FacematchSourceTypes, IFacematchSource, FACEMATCH_SOURCES_COUNT } from '../../models/Facematch.model';
import { TextFieldInputScore, useStyles } from './FacematchSetting.styles';
import { FacematchSource } from '../FacematchSourceSelect/FacematchSource';

const RECOMMENDED_THRESHOLD_PERCENT = 70;

export function FacematchSettings({ settings, onUpdate }: ProductSettingsProps<FacematchCheckSettingsTypes>) {
  const formatMessage = useFormatMessage();
  const debounced = useDebounce();
  const classes = useStyles();
  const [rejectThreshold, setRejectThreshold] = useState<number>(settings[FacematchCheckSettingsTypes.RejectThreshold].value);
  const [approveThreshold, setApproveThreshold] = useState<number>(settings[FacematchCheckSettingsTypes.ApproveThreshold].value);
  // TODO: @anatoliy.turkin why is it not an array!? fix me
  const [sources, setSources] = useState<Record<number, IFacematchSource>>({});
  const [error, setError] = useState<string | null>(null);

  const availableSources = Object.values(FacematchSourceTypes);

  useEffect(() => {
    const obj = Object.fromEntries(
      Object.entries(settings[FacematchCheckSettingsTypes.Sources].value).map(([key, source]) => [key, source]),
    ) as Record<number, IFacematchSource>;
    setSources(obj);
  }, [settings]);

  const handleUpdate = useCallback((settingId: FacematchCheckSettingsTypes, value: unknown) => {
    const newSettings = cloneDeep(settings);
    newSettings[settingId].value = value;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const handleMultipleUpdate = useCallback((setts: { settingId: FacematchCheckSettingsTypes; value: unknown }[]) => {
    const newSettings = cloneDeep(settings);
    setts.forEach(({ settingId, value }) => {
      newSettings[settingId].value = value;
    });
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  const getThresholdValue = (value: string): number => {
    const result: string = value ? value.replace(ONLY_NUMBERS_REG_EXP, '') : '';
    const num = Number(result);
    if (num > 100) {
      return 100;
    }

    return num;
  };

  const handleRejectThresholdChange = useCallback(({ target: { value } }) => {
    const result = getThresholdValue(value);
    setRejectThreshold(result);
    debounced(() => handleUpdate(FacematchCheckSettingsTypes.RejectThreshold, result));
  }, [handleUpdate, debounced]);

  const handleApproveThresholdChange = useCallback(({ target: { value } }) => {
    const result = getThresholdValue(value);
    setApproveThreshold(result);
    debounced(() => handleUpdate(FacematchCheckSettingsTypes.ApproveThreshold, result));
  }, [handleUpdate, debounced]);

  const handleValidation = useCallback(() => {
    const isValid = rejectThreshold < approveThreshold;
    if (!isValid) {
      setError(formatMessage('Facematch.issues.rejectLessThanApprove.description'));
      return;
    }
    setError(null);
  }, [rejectThreshold, approveThreshold, formatMessage]);

  const handleSourceChange = useCallback((index: number, source: Partial<IFacematchSource>, govCheckValue?: unknown) => {
    const newSources = cloneDeep(sources);

    newSources[index] = {
      ...newSources[index],
      ...source,
    };

    if (source.type) {
      switch (source.type) {
        case FacematchSourceTypes.Document: {
          newSources[index].options = {
            verificationStepIndex: 0,
          };
          break;
        }
        case FacematchSourceTypes.GovermentCheck: {
          newSources[index].options = {
            govCheckIds: [],
          };
          break;
        }
        default:
          delete newSources[index].options;
          break;
      }
    }

    const newSettings = [];
    newSettings.push({ settingId: FacematchCheckSettingsTypes.Sources, value: Object.values(newSources) });

    if (govCheckValue && isNil(govCheckValue[VerificationPatternTypes.NigerianLegal])) {
      newSettings.push({ settingId: FacematchCheckSettingsTypes.CountriesGovChecks, value: govCheckValue });
    }

    handleMultipleUpdate(newSettings);
  }, [handleMultipleUpdate, sources]);

  return (
    <Box>
      <Box>
        {[...Array(FACEMATCH_SOURCES_COUNT)].map((_key, index) => (
          <Box key={index}>
            <Box mb={0.5} mt={1} fontWeight="bold" color="common.black90">{formatMessage('Facematch.settings.source.title', { messageValues: { index: index + 1 } })}</Box>
            <FacematchSource
              index={index}
              availableSources={availableSources}
              sources={sources}
              onChange={handleSourceChange}
              documentTypes={settings[FacematchCheckSettingsTypes.DocumentTypes].value}
              productsInGraph={settings[FacematchCheckSettingsTypes.ProductsInGraph].value}
            />
          </Box>
        ))}
      </Box>
      <Box mt={3}><Divider className={classes.divider} /></Box>
      <Box mt={2}>
        <ExtendedDescription
          title={formatMessage(`Facematch.settings.${FacematchCheckSettingsTypes.FacematchSettings}.title`)}
          text={formatMessage(`Facematch.settings.${FacematchCheckSettingsTypes.FacematchSettings}.description`)}
        />
        <Box mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={9}><Box mb={0.5} fontWeight="bold" color="common.black90">{formatMessage('Facematch.settings.rejectThreshold.title')}</Box></Grid>
            <Grid item xs={3}>
              <TextFieldInputScore
                value={rejectThreshold}
                onChange={handleRejectThresholdChange}
                onBlur={handleValidation}
                error={!!error}
              />
            </Grid>
            <Grid item xs={9}><Box mb={0.5} fontWeight="bold" color="common.black90">{formatMessage('Facematch.settings.approveThreshold.title')}</Box></Grid>
            <Grid item xs={3}>
              <TextFieldInputScore
                value={approveThreshold}
                onChange={handleApproveThresholdChange}
                onBlur={handleValidation}
                error={!!error}
              />
            </Grid>
            <Grid item xs={12}>
              {error && <Box mb={0.5} fontWeight="bold" color="common.red">{error}</Box>}
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <BoxBordered px={1.7} py={1.7}>
            <Box>
              <ExtendedDescription
                title={formatMessage('Facematch.settings.scoreDescription.title')}
              />
            </Box>
            <Box mt={2}>
              <ExtendedDescription
                title={formatMessage('Facematch.settings.scoreDescription.recommended.title')}
                titleColor="common.black75"
                text={formatMessage('Facematch.settings.scoreDescription.recommended.text', { messageValues: { percent: RECOMMENDED_THRESHOLD_PERCENT } })}
                postfix={`${RECOMMENDED_THRESHOLD_PERCENT}%`}
                postfixColor="common.green"
                postfixFontWeight="bold"
              />
            </Box>
            <Box mt={2}>
              <ExtendedDescription
                title={formatMessage('Facematch.settings.scoreDescription.low.title')}
                titleColor="common.black75"
                text={formatMessage('Facematch.settings.scoreDescription.low.text')}
                postfix="40-70%"
                postfixColor="common.black75"
                postfixFontWeight="bold"
              />
            </Box>
            <Box mt={2}>
              <ExtendedDescription
                title={formatMessage('Facematch.settings.scoreDescription.high.title')}
                titleColor="common.black75"
                text={formatMessage('Facematch.settings.scoreDescription.high.text')}
                postfix="70-100%"
                postfixColor="common.black75"
                postfixFontWeight="bold"
              />
            </Box>
          </BoxBordered>
        </Box>
      </Box>
    </Box>
  );
}
