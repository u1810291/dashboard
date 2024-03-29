import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { ICustomField } from 'models/CustomField.model';
import { useStyles } from './CustomFieldActions.styles';
import { CustomFieldModalTypes, HandleOpenModal } from '../../models/CustomField.model';
import { selectCustomFieldListFields } from '../../state/CustomField.selectors';

export function CustomFieldActions({ handleOpenModal }: {handleOpenModal: HandleOpenModal}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const merchantTags = useSelector<any, MerchantTags[]>(selectMerchantTags);
  const listFields = useSelector<any, ICustomField[]>(selectCustomFieldListFields);
  const isCustomDocumentAvailable = merchantTags.includes(MerchantTags.CanUseCustomField);

  return (
    <Box>
      <Button
        fullWidth
        className={classes.actionsButton}
        disabled={!isCustomDocumentAvailable}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpenModal(CustomFieldModalTypes.ConfigureField)}
      >
        {formatMessage('CustomField.settings.CustomFieldList.addField')}
      </Button>
      <Button
        fullWidth
        className={classes.actionsButton}
        disabled={!isCustomDocumentAvailable}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpenModal(CustomFieldModalTypes.ConfigureGroup)}
      >
        {formatMessage('CustomField.settings.CustomFieldList.addGroup')}
      </Button>
      <Button
        fullWidth
        className={classes.actionsButton}
        disabled={!isCustomDocumentAvailable}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpenModal(CustomFieldModalTypes.ConfigureSelection)}
      >
        {formatMessage('CustomField.settings.CustomFieldList.addSelection')}
      </Button>
      {!!listFields.length && (
        <Button
          fullWidth
          className={classes.actionsButton}
          disabled={!isCustomDocumentAvailable}
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleOpenModal(CustomFieldModalTypes.PreviewCustomField)}
        >
          {formatMessage('CustomField.settings.CustomFieldList.preview')}
        </Button>
      )}
    </Box>
  );
}
