import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import cloneDeep from 'lodash/cloneDeep';
import { useCountriesLoad } from 'apps/countries';
import { PageLoader } from 'apps/layout';
import { useFormatMessage } from 'apps/intl';
import { Country } from 'models/Country.model';
import { CustomFieldModalFooter } from '../CustomFieldModalFooter/CustomFieldModalFooter';
import { updateCustomFieldEditedField, updateCustomFieldEditedFieldMapping, updateCustomFieldModalStep } from '../../state/CustomField.actions';
import { CONFIG_BY_KEY, CustomField, CustomFieldModalTypes, EMPTY_MAPPING, getNotSelectedMapping, Mapping, MappingValueKey } from '../../models/CustomField.model';
import { SelectUI } from './CustomFieldModalMapping.styles';
import { selectCustomFieldCountriesForMapping, selectCustomFieldEditedCustomField, selectCustomFieldFlattenListFields, selectCustomFieldSelectedCustomFieldMapping } from '../../state/CustomField.selectors';

export function CustomFieldModalMapping() {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const allCountriesModel = useCountriesLoad();

  const selectedFieldMapping = useSelector<any, Mapping>(selectCustomFieldSelectedCustomFieldMapping);
  const selectedCustomField = useSelector<any, CustomField>(selectCustomFieldEditedCustomField);
  const countriesList = useSelector<any, Country[]>(selectCustomFieldCountriesForMapping);
  const listFlattenFields = useSelector<any, CustomField[]>(selectCustomFieldFlattenListFields);

  const [mapping, setMapping] = useState<Mapping>(selectedFieldMapping || EMPTY_MAPPING);
  const [oldMapping] = useState<Mapping>(selectedFieldMapping || EMPTY_MAPPING);

  const isValid: boolean = Boolean(!mapping?.country && !mapping?.key) || Boolean(mapping?.country && mapping?.key);
  const documentOptionsList = useMemo<MappingValueKey[]>(() => getNotSelectedMapping(listFlattenFields, mapping, oldMapping), [oldMapping, listFlattenFields, mapping]);

  const handleAtomicFieldMappingParamsChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setMapping({
      ...mapping,
      [name]: value,
    });
  };

  const handleAtomicFieldMappingCountryChange = ({ target: { value } }) => {
    const clone = cloneDeep(mapping);
    clone.country = value;
    setMapping(clone);
  };

  const handleAtomicFieldMappingParamsClear = useCallback(() => {
    setMapping(cloneDeep(EMPTY_MAPPING));
  }, []);

  const handleShouldFilterChange = () => {
    setMapping({
      ...mapping,
      shouldFilter: !mapping.shouldFilter,
    });
  };

  const handleDone = useCallback(() => {
    if (CONFIG_BY_KEY[mapping?.key]?.type || CONFIG_BY_KEY[mapping?.key]?.regex) {
      const clone = cloneDeep(selectedCustomField);
      clone.atomicFieldParams = { ...clone.atomicFieldParams, ...CONFIG_BY_KEY[mapping.key] };
      dispatch(updateCustomFieldEditedField(clone));
    }
    dispatch(updateCustomFieldEditedFieldMapping(mapping));
    dispatch(updateCustomFieldModalStep(CustomFieldModalTypes.ConfigureField));
  }, [dispatch, mapping, selectedCustomField]);

  const backToConfigureField = useCallback(() => dispatch(updateCustomFieldModalStep(CustomFieldModalTypes.ConfigureField)),
    [dispatch]);

  if (!allCountriesModel.isLoaded) {
    return <PageLoader />;
  }

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h3">
            {formatMessage('CustomField.settings.modal.mappingFieldToDocument.title')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {formatMessage('CustomField.settings.modal.mappingFieldToDocument.subtitle')}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">
            {formatMessage('CustomField.settings.fieldSpecificCountry')}
          </Typography>
          <SelectUI
            name="country"
            onChange={handleAtomicFieldMappingCountryChange}
            value={mapping?.country}
          >
            {countriesList.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {formatMessage(`Countries.${country.code}`)}
              </MenuItem>
            ))}
          </SelectUI>
        </Grid>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="body1">
              {formatMessage('CustomField.settings.fieldDisplayIfSelectingCountry')}
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              disabled={!mapping?.country}
              color="primary"
              size="small"
              name="shouldFilter"
              checked={mapping.shouldFilter}
              onChange={handleShouldFilterChange}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {formatMessage('CustomField.settings.fieldSpecificDocument')}
          </Typography>
          <SelectUI
            name="key"
            onChange={handleAtomicFieldMappingParamsChange}
            value={mapping.key}
          >
            {documentOptionsList.map((option) => (
              <MenuItem key={option} value={option}>
                {formatMessage(`CustomField.settings.fieldSpecificDocument.${option}`)}
              </MenuItem>
            ))}
          </SelectUI>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            size="large"
            onClick={handleAtomicFieldMappingParamsClear}
          >
            Clear mapping
          </Button>
        </Grid>

      </Grid>
      <CustomFieldModalFooter
        backTitle="Back"
        onBack={backToConfigureField}
        forwardTitle="Done"
        onForward={handleDone}
        canMoveForward={isValid}
      />
    </>
  );
}
