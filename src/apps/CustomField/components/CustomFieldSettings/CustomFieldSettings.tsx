import { MerchantTags } from 'models/Merchant.model';
import { useSelector } from 'react-redux';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { CustomFieldProductSettingsProps } from '../../models/CustomField.model';
import { ExtendedDescription, Warning } from '../../../ui';
import { CustomFieldContainer } from '../CustomFieldContainer/CustomFieldContainer';

export function CustomFieldSettings({ settings, onUpdate }: CustomFieldProductSettingsProps) {
  const formatMessage = useFormatMessage();
  const merchantTags: MerchantTags[] = useSelector(selectMerchantTags);
  const isProductEnabled = merchantTags.includes(MerchantTags.CanUseCustomField);

  return (
    <Box>
      {!isProductEnabled
        && (
          <Box mb={2}>
            <Warning
              label={formatMessage('CustomDocuments.settings.customDocumentNotAvailable')}
              linkLabel={formatMessage('CustomDocuments.settings.helpEmail')}
              isLabelColored={false}
              bordered
            />
          </Box>
        )}
      <Box>
        <ExtendedDescription
          isDisabled={!isProductEnabled}
          title={formatMessage('CustomField.card.check.title')}
          text={formatMessage('CustomField.card.check.subTitle')}
        />
      </Box>
      <CustomFieldContainer onUpdate={onUpdate} settings={settings} />
    </Box>
  );
}
