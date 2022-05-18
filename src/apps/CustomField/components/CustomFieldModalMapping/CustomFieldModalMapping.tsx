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
import { ICustomField, IMapping } from 'models/CustomField.model';
import { CustomFieldModalFooter } from '../CustomFieldModalFooter/CustomFieldModalFooter';
import { updateCustomFieldEditedField, updateCustomFieldEditedFieldMapping, updateCustomFieldModalStep } from '../../state/CustomField.actions';
import { CONFIG_BY_KEY, CustomFieldModalTypes, EMPTY_MAPPING, getNotSelectedMapping, MappingCountryTypes, MappingValueKey } from '../../models/CustomField.model';
import { SelectUI } from './CustomFieldModalMapping.styles';
import { selectCustomFieldCountriesForMapping, selectCustomFieldEditedCustomField, selectCustomFieldFlattenListFields, selectCustomFieldSelectedCustomFieldMapping } from '../../state/CustomField.selectors';

export function CustomFieldModalMapping() {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const allCountriesModel = useCountriesLoad();

  const selectedFieldMapping = useSelector<any, IMapping>(selectCustomFieldSelectedCustomFieldMapping);
  const selectedCustomField = useSelector<any, ICustomField>(selectCustomFieldEditedCustomField);
  const countriesList = useSelector<any, Country[]>(selectCustomFieldCountriesForMapping);
  const listFlattenFields = useSelector<any, ICustomField[]>(selectCustomFieldFlattenListFields);

  const [newMapping, setNewMapping] = useState<IMapping>(selectedFieldMapping || EMPTY_MAPPING);
  const [mapping] = useState<IMapping>(selectedFieldMapping || EMPTY_MAPPING);

  const isValid: boolean = Boolean(!newMapping?.country && !newMapping?.key) || Boolean(newMapping?.country && newMapping?.key);
  const documentOptionsList = useMemo<MappingValueKey[]>(() => getNotSelectedMapping(listFlattenFields, newMapping, mapping), [mapping, listFlattenFields, newMapping]);

  const handleAtomicFieldMappingParamsChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setNewMapping({
      ...newMapping,
      [name]: value,
    });
  };

  const handleAtomicFieldMappingCountryChange = ({ target: { value } }) => {
    const clone = cloneDeep(newMapping);
    clone.country = value;
    setNewMapping(clone);
  };

  const handleAtomicFieldMappingParamsClear = useCallback(() => {
    setNewMapping(cloneDeep(EMPTY_MAPPING));
  }, []);

  const handleShouldFilterChange = () => {
    setNewMapping({
      ...newMapping,
      shouldFilter: !newMapping.shouldFilter,
    });
  };

  const handleDone = useCallback(() => {
    if (CONFIG_BY_KEY[newMapping?.key]?.type || CONFIG_BY_KEY[newMapping?.key]?.regex) {
      const clone = cloneDeep(selectedCustomField);
      clone.atomicFieldParams = { ...clone.atomicFieldParams, ...CONFIG_BY_KEY[newMapping.key] };
      dispatch(updateCustomFieldEditedField(clone));
    }
    dispatch(updateCustomFieldEditedFieldMapping(newMapping));
    dispatch(updateCustomFieldModalStep(CustomFieldModalTypes.ConfigureField));
  }, [dispatch, newMapping, selectedCustomField]);

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
            value={newMapping?.country}
          >
            <MenuItem value={MappingCountryTypes.Global}>
              {formatMessage('Global')}
            </MenuItem>
            {countriesList.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {formatMessage(`Countries.${country.code}`)}
              </MenuItem>
            ))}
          </SelectUI>
        </Grid>
        {newMapping.country !== MappingCountryTypes.Global && (
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="body1">
                {formatMessage('CustomField.settings.fieldDisplayIfSelectingCountry')}
              </Typography>
            </Grid>
            <Grid item>
              <Switch
                disabled={!newMapping?.country}
                color="primary"
                size="small"
                name="shouldFilter"
                checked={newMapping.shouldFilter}
                onChange={handleShouldFilterChange}
              />
            </Grid>
          </Grid>
        )}
        <Grid item>
          <Typography variant="subtitle2">
            {formatMessage('CustomField.settings.fieldSpecificDocument')}
          </Typography>
          <SelectUI
            name="key"
            onChange={handleAtomicFieldMappingParamsChange}
            value={newMapping.key}
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
            {formatMessage('CustomField.settings.clearMapping')}
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
