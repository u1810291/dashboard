import { Switch } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useState } from 'react';
import { DocumentVerificationConfig, DocumentVerificationSettingTypes } from '../../models/DocumentVerification.model';

export type DocumentVerificationSettingsProps = ProductSettingsProps<DocumentVerificationConfig>;

export function DocumentVerificationSettings2({ product, settings, onUpdate }: DocumentVerificationSettingsProps) {
  const [documentSteps, setDocumentSteps] = useState(settings.settings.documentSteps.value);
  const [denyUploadRequirement, setDenyUploadRequirement] = useState(settings.settings.denyUploadRequirement.value);
  const handleClick = useCallback((type: DocumentVerificationSettingTypes) => () => {
    const newConfig = cloneDeep(settings);
    if (type === DocumentVerificationSettingTypes.DocumentSteps) {
      const newValue = settings.settings.documentSteps.value.length > 0 ? [] : [['passport']];
      newConfig.settings.documentSteps.value = newValue;
      setDocumentSteps(newValue);
    } else {
      newConfig.settings.denyUploadRequirement.value = !settings.settings.denyUploadRequirement.value;
      setDenyUploadRequirement(!settings.settings.denyUploadRequirement.value);
    }
    // @ts-ignore
    onUpdate(newConfig);
  }, [onUpdate, settings]);

  return (
    <div>
      <div>{product.getTitle()}</div>
      documentSteps
      <Switch
        name="documentSteps"
        color="primary"
        size="small"
        checked={documentSteps?.length > 0}
        onChange={handleClick(DocumentVerificationSettingTypes.DocumentSteps)}
      />
      denyUploadRequirement
      <Switch
        name="denyUploadRequirement"
        color="primary"
        size="small"
        disabled={settings.settings.denyUploadRequirement.isDisabled}
        checked={denyUploadRequirement}
        onChange={handleClick(DocumentVerificationSettingTypes.DenyUploadRequirement)}
      />
    </div>
  );
}
