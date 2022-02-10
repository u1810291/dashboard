import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { FiTrash2 } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { TextFieldInput } from '../CustomFieldModalConfigureAtomic/CustomFieldModalConfigureAtomic.styles';
import { updateCustomFieldEditedFieldSelectOptions } from '../../state/CustomField.actions';
import { EMPTY_OPTION, MIN_SELECT_OPTIONS, SelectOptions } from '../../models/CustomField.model';
import { selectCustomFieldSelectedCustomFieldSelectOptions } from '../../state/CustomField.selectors';
import { useStyles } from './CustomFieldSelectionOptions.style';

export function CustomFieldSelectionOptions() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectOptions = useSelector<any, SelectOptions[]>(selectCustomFieldSelectedCustomFieldSelectOptions);

  const handleSelectOptionChange = (index: number) => ({ target: { value, name } }) => {
    const clone = cloneDeep(selectOptions);
    clone[index][name] = value;
    dispatch(updateCustomFieldEditedFieldSelectOptions(clone));
  };

  const handleSelectOptionAdd = () => {
    dispatch(updateCustomFieldEditedFieldSelectOptions([...selectOptions, { ...EMPTY_OPTION }]));
  };

  const handleSelectOptionRemove = (index: number) => () => {
    const clone = cloneDeep(selectOptions);
    clone.splice(index, 1);
    dispatch(updateCustomFieldEditedFieldSelectOptions(clone));
  };

  return (
    <Grid item container spacing={1} direction="column">
      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="subtitle2">
            {formatMessage('CustomField.settings.selectionOptions')}
          </Typography>
        </Grid>
      </Grid>
      {
        selectOptions.map((option, index) => (
          <Grid key={index} item container spacing={1} justify="space-between">
            <Grid item xs={7}>
              <TextFieldInput
                fullWidth
                value={option.label}
                type="text"
                name="label"
                onChange={handleSelectOptionChange(index)}
                placeholder={formatMessage('CustomField.settings.selectionOptions.placeholder')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextFieldInput
                fullWidth
                value={option.value}
                type="text"
                name="value"
                onChange={handleSelectOptionChange(index)}
                placeholder={formatMessage('CustomField.settings.selectionOptions.value.placeholder')}
              />
            </Grid>
            <Grid item xs={1} container justify="center" alignItems="center">
              {selectOptions.length > MIN_SELECT_OPTIONS && (
                <FiTrash2 onClick={handleSelectOptionRemove(index)} className={classes.remove} />)}
              {selectOptions.length === MIN_SELECT_OPTIONS && (<FiTrash2 className={classes.disabledRemove} />)}
            </Grid>
          </Grid>
        ))
      }
      <Grid item>
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={handleSelectOptionAdd}
        >
          {formatMessage('CustomField.settings.selectionOptions.addBtn')}
        </Button>
      </Grid>
    </Grid>
  );
}
