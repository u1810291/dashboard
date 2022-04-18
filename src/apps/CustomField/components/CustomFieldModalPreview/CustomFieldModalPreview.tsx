import React from 'react';
import { useSelector } from 'react-redux';
import { ICustomField } from 'models/CustomField.model';
import { useStyles } from './CustomFieldModalPreview.styles';
import { selectCustomFieldListFields } from '../../state/CustomField.selectors';

export function CustomFieldModalPreview() {
  const classes = useStyles();

  const listFields = useSelector<any, ICustomField[]>(selectCustomFieldListFields);

  const previewUrl = new URL(`${process.env.REACT_APP_PRODUCT_REGISTRY_URL}/custom-input-product/`);
  previewUrl.searchParams.append('isPreviewMode', 'true');
  previewUrl.searchParams.append('fields', JSON.stringify(listFields));

  return (
    <iframe
      src={previewUrl.href}
      title="Custom Field Preview"
      frameBorder="0"
      height="100%"
      className={classes.previewIframe}
    />
  );
}
