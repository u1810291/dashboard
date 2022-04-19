import React from 'react';
import { useSelector } from 'react-redux';
import { ICustomField } from 'models/CustomField.model';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { SupportedLocales } from 'models/Intl.model';
import { useStyles } from './CustomFieldModalPreview.styles';
import { selectCustomFieldListFields } from '../../state/CustomField.selectors';
import { generatePreviewModeURL } from '../../models/CustomField.model';

export function CustomFieldModalPreview() {
  const classes = useStyles();

  const listFields = useSelector<any, ICustomField[]>(selectCustomFieldListFields);
  const currentLocale = useSelector<any, SupportedLocales>(selectLanguage);

  const previewUrl = generatePreviewModeURL(listFields, currentLocale);

  return (
    <iframe
      src={previewUrl}
      title="Custom Field Preview"
      frameBorder="0"
      height="100%"
      className={classes.previewIframe}
    />
  );
}
