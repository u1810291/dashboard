import { Box } from '@material-ui/core';
import { CustomDocumentSettingsTypes } from 'apps/customDocument/models/customDocument.model';
import { DocumentStepSettings } from 'apps/documents/components/DocumentStepSettings/DocumentStepSettings';
import { ExtendedDescription, Warning } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { DocumentTypes } from 'models/Document.model';
import { MerchantTags } from 'models/Merchant.model';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { CustonDocumentList } from '../CustonDocumentList/CustonDocumentList';

export function CustomDocumentsSettings({ settings, onUpdate }: ProductSettingsProps<CustomDocumentSettingsTypes>) {
  const intl = useIntl();
  const merchantTags: MerchantTags[] = useSelector(selectMerchantTags);
  const isProductEnabled = merchantTags.includes(MerchantTags.CanUseCustomDocument);
  const [steps, setSteps] = useState<(DocumentTypes | string)[][]>([]);

  useEffect(() => {
    setSteps(settings.neededSteps.value);
  }, [settings, setSteps]);

  const handleUpdateSteps = useCallback((newSteps: (DocumentTypes | string)[][]) => {
    const newSettings = cloneDeep(settings);
    newSettings.neededSteps.value = newSteps;
    onUpdate(newSettings);
  }, [settings, onUpdate]);

  return (
    <Box>
      {!isProductEnabled
        && (
        <Box mb={2}>
          <Warning
            label={intl.formatMessage({ id: 'CustomDocuments.settings.customDocumentNotAvailable' })}
            linkLabel={intl.formatMessage({ id: 'CustomDocuments.settings.helpEmail' })}
            isLabelColored={false}
            bordered
          />
        </Box>
        )}
      {isProductEnabled && (
        <Box mb={2}>
          <DocumentStepSettings custom steps={steps} onUpdate={handleUpdateSteps} />
        </Box>
      )}
      <Box>
        <ExtendedDescription
          isDisabled={!isProductEnabled}
          title={intl.formatMessage({ id: 'CustomDocuments.settings.upload.title' })}
          text={intl.formatMessage({ id: 'CustomDocuments.settings.upload.description' })}
        />
      </Box>
      <CustonDocumentList />
    </Box>
  );
}
